import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable } from 'rxjs';
import { TableStateChanged } from '../models/table-state-changed.enum';

@Injectable({
	providedIn: 'root'
})
export class SwitchboardService {
	tableStateChanged$: Observable<TableStateChanged>;

	private tableStateChangedSubject = new BehaviorSubject<TableStateChanged>('' as TableStateChanged);

	constructor() {
		this.tableStateChanged$ = this.tableStateChangedSubject.asObservable().pipe(
			distinctUntilChanged()
		);
	}

	addTableStateChanged(tableStateChanged: TableStateChanged) {
		this.tableStateChangedSubject.next(tableStateChanged);
	}
}
