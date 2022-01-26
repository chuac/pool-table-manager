import { BehaviorSubject, combineLatest, interval, map, Observable, share } from 'rxjs';
import { Injectable } from '@angular/core';
import { Table } from '../models/table.model';
import { setSeconds } from 'date-fns';
import { TableState } from '../models/table-state.enum';
import { SwitchboardService } from './switchboard.service';
import { TableStateChanged } from '../models/table-state-changed.enum';
import { UserInputService } from '../../user-input/user-input.service';

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

	constructor(
		private readonly switchboardService: SwitchboardService,
		private readonly userInputService: UserInputService,
	) {
		this.tables$ = combineLatest([
			this.tablesSubject.asObservable(),
			this.switchboardService.tableStateChanged$
		])
			.pipe(
				map(([tables, tableStateChanged]) => {
					return this.processTableChanged(tables, tableStateChanged);
				})
			);

		this.addTables();
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
