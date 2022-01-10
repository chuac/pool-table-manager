import { BehaviorSubject, combineLatest, interval, map, Observable, share } from 'rxjs';
import { Injectable } from '@angular/core';
import { Table } from '../models/table.model';
import { setSeconds } from 'date-fns';
import { TableState } from '../models/table-state.enum';
import { SwitchboardService } from './switchboard.service';
import { TableStateChanged } from '../models/table-state-changed.enum';

@Injectable({
    providedIn: 'root'
})
export class TableService {
    clock$ = interval(1000)
        .pipe(
            map(() => new Date()),
            share(),
        ); // TODO: Move this to a ClockService?
    tables$: Observable<Array<Table>>;
    private tablesSubject = new BehaviorSubject<Array<Table>>([]);

    private numberOfTables = 27; // TODO: Make this configurable

    constructor(
        private readonly switchboardService: SwitchboardService
    ) {
        this.tables$ = combineLatest([this.tablesSubject.asObservable(), this.switchboardService.tableStateChanged$])
            .pipe(
                map(([tables, tableStateChanged]) => {
                    this.processTableChanged(tables, tableStateChanged);

                    return tables;
                })
            );

        this.addTables();

        // this.initAndAddDummyDataToTables();
    }


    private processTableChanged(tables: Array<Table>, tableStateChanged: TableStateChanged): Array<Table> {
        if (!tableStateChanged) {
            return tables;
        }

        const hexCodeIndex = Object.values(TableStateChanged).indexOf(tableStateChanged);

        const tableNumberIndex = Math.ceil((hexCodeIndex + 1) / 2) - 1;

        // Check whether table is on or off, depending on its index in TableStateChanged enum
        const tableState = (hexCodeIndex + 2) % 2 === 0 ? TableState.On : TableState.Off;

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
        };
    }


    // private initAndAddDummyDataToTables(): void {
    // 	const tables = this.tablesSubject.value;

    // 	for (let i = 0; i < this.numberOfTables; i++) {
    // 		let timeStarted: Date = null;
    // 		let tableState = Math.random() > 0.5 ? TableState.On : TableState.Off;

    // 		// Small chance for a randomly generated table to be in Clean mode
    // 		tableState = Math.random() > 0.85 ? TableState.Clean : tableState;

    // 		if (tableState !== TableState.Off) {
    // 			const minutesStartedAgo = Math.floor(Math.random() * 240);
    // 			timeStarted = subMinutes(new Date().setSeconds(0), minutesStartedAgo); // purposely ignoring seconds
    // 		}

    // 		tables.push({
    // 			state: tableState,
    // 			timeStarted,
    // 		});
    // 	}

    // 	this.tablesSubject.next(tables);
    // }
}