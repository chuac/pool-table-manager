import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableStateChanged } from '../models/table-state-changed.enum';

@Injectable({
  providedIn: 'root'
})
export class SwitchboardService {
    tableStateChanged$: Observable<TableStateChanged>;

    private tableStateChangedSubject = new BehaviorSubject<TableStateChanged>(null);

  constructor() {
      this.tableStateChanged$ = this.tableStateChangedSubject.asObservable();
  }

  addTableStateChanged(tableStateChanged: TableStateChanged){
    this.tableStateChangedSubject.next(tableStateChanged)
  }
}
