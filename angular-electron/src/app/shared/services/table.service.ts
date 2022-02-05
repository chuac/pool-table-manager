import { BehaviorSubject, combineLatest, interval, map, Observable, share } from 'rxjs';
import { Injectable } from '@angular/core';
import { Table } from '../models/table.model';
import { setSeconds } from 'date-fns';
import { TableState } from '../models/table-state.enum';
import { SwitchboardService } from './switchboard.service';
import { TableStateChanged } from '../models/table-state-changed.enum';
import { UserInputService } from '../../user-input/user-input.service';
import { CustomerService } from './customer.service';

@Injectable({
	providedIn: 'root'
})
export class TableService {
	clock$ = interval(1000)
		.pipe(
			map(() => { return new Date(); }),
			share(),
		); // TODO: Move this to a ClockService?
	tables$: Observable<Array<Table>>;
	private tablesSubject = new BehaviorSubject<Array<Table>>([]);

	private numberOfTables = 27; // TODO: Make this configurable
	private tableToTransferFrom: number;

	constructor(
		private readonly switchboardService: SwitchboardService,
		private readonly userInputService: UserInputService,
		private readonly customerService: CustomerService,
	) {
		this.tables$ = combineLatest(
			[
				this.tablesSubject.asObservable(),
				this.switchboardService.tableStateChanged$
			]
		)
			.pipe(
				map(([tables, tableStateChanged]) => {
					if (this.userInputService.transferTableMode) {
						return this.processTableTransfer(tables, tableStateChanged);
					} else {
						return this.processTableChanged(tables, tableStateChanged);
					}

				})
			);

		this.addTables();
	}

	private processTableTransfer(tables: Array<Table>, tableStateChanged: TableStateChanged): Array<Table> {
		const hexCodeIndex = Object.values(TableStateChanged).indexOf(tableStateChanged);

		const tableNumberIndex = Math.ceil((hexCodeIndex + 1) / 2) - 1;

		// Check whether table is on or off, depending on its index in TableStateChanged enum
		const tableState = (hexCodeIndex + 2) % 2 === 0 ? TableState.On : TableState.Off;

		if (tableState === TableState.Off) {
			if (!this.tableToTransferFrom) {
				this.tableToTransferFrom = tableNumberIndex + 1;

				// We could actually turn off the table here, not doing for now
			} else {
				// TODO: Alert user that they have to turn off a table in the 1st step, to transfer successfully
				console.log('Alert user that they have to turn off a table in the 1st step, to transfer successfully');
			}
		} else if (tableState === TableState.On) {
			if (this.tableToTransferFrom) {
				const dateNow = setSeconds(new Date(), 0);

				// In the customer: end current session, and start a new one
				this.customerService.startOrUpdateSession(this.tableToTransferFrom, tableNumberIndex + 1, dateNow);

				// Swap the tables
				tables[this.tableToTransferFrom - 1].state = TableState.Off;
				tables[this.tableToTransferFrom - 1].timeStarted = null;

				tables[tableNumberIndex].state = TableState.On;
				tables[tableNumberIndex].timeStarted = dateNow;

				// Reset our helper property
				this.tableToTransferFrom = null;
			} else {
				// TODO: Alert user that they have to turn on a table in the 2nd step, to transfer successfully
				console.log('Alert user that they have to turn on a table in the 2nd step, to transfer successfully');
			}
		}

		return tables;
	}

	private processTableChanged(tables: Array<Table>, tableStateChanged: TableStateChanged): Array<Table> {
		if (!tableStateChanged) {
			return tables;
		}

		const hexCodeIndex = Object.values(TableStateChanged).indexOf(tableStateChanged);

		const tableNumberIndex = Math.ceil((hexCodeIndex + 1) / 2) - 1;

		// Check whether table is on or off, depending on its index in TableStateChanged enum
		let tableState = (hexCodeIndex + 2) % 2 === 0 ? TableState.On : TableState.Off;

		if (tableState === TableState.Off && this.userInputService.transferTableMode) {
			const tableToTransfer = tables[tableNumberIndex];
			tableToTransfer.state = TableState.Transfer;

			return tables;
		}

		if (tableState === TableState.On && this.userInputService.transferTableMode) {
			const oldTable = tables.filter((tab) => { return tab.state === TableState.Transfer; });
			console.log(oldTable[0].timeStarted);

			const newTable = tables[tableNumberIndex];
			newTable.state = TableState.On;
			newTable.timeStarted = oldTable[0].timeStarted;

			return tables;
		}

		// Check if in clean mode or not
		if (tableState === TableState.On && this.userInputService.cleanMode) {
			tableState = TableState.Clean;
		} else {
			// Create or update a Customer
			this.customerService.startOrUpdateSession(null, tableNumberIndex + 1, setSeconds(new Date(), 0));
		}

		const table = tables[tableNumberIndex];
		table.state = tableState;
		table.timeStarted = setSeconds(new Date(), 0);

		return tables;
	}




	private addTables(): void {
		const tables = this.tablesSubject.value;

		for (let i = 0; i < this.numberOfTables; i++) {
			const timeStarted: Date = null;
			const tableState = TableState.Off;

			tables.push({
				timeStarted,
				state: tableState,
			});

			this.tablesSubject.next(tables);
		}
	}
}
