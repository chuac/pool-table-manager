import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Table } from '../models/table.model';
import { subMinutes } from 'date-fns';

@Injectable({
	providedIn: 'root'
})
export class TableService {
	tables$: Observable<Array<Table>>;

	private tablesSubject = new BehaviorSubject<Array<Table>>([]);

	constructor() {
		this.tables$ = this.tablesSubject.asObservable();

		this.addDummyDataToTables();
	}

	private addDummyDataToTables(): void {
		const array: Array<Table> = [];

		array.push({
			timeStarted: null,
			switchedOn: false,
		});

		array.push({
			timeStarted: subMinutes(new Date(), 25),
			switchedOn: true,
		});

		this.tablesSubject.next(array);
	}
}
