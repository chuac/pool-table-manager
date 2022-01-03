import { BehaviorSubject, combineLatest, interval, map, Observable, share } from 'rxjs';
import { Injectable } from '@angular/core';
import { Table } from '../models/table.model';
import { subMinutes } from 'date-fns';

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

	constructor() {
		this.tables$ = combineLatest([this.tablesSubject.asObservable(), this.clock$])
			.pipe(
				map(([tables, _]) => tables)
			);

		this.initAndAddDummyDataToTables();
	}

	private initAndAddDummyDataToTables(): void {
		const tables = this.tablesSubject.value;

		for (let i = 0; i < this.numberOfTables; i++) {
			let timeStarted: Date = null;
			const switchedOn = Math.random() > 0.5 ? true : false;

			if (switchedOn) {
				const minutesStartedAgo = Math.floor(Math.random() * 240);
				timeStarted = subMinutes(new Date().setSeconds(0), minutesStartedAgo); // purposely ignoring seconds
			}

			tables.push({
				switchedOn,
				timeStarted,
			});
		}

		this.tablesSubject.next(tables);
	}
}
