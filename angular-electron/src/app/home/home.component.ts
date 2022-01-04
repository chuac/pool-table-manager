import { TableService } from './../shared/services/table.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableState } from '../shared/models/table-state.enum';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
	clock$ = this.tableService.clock$;
	tables$ = this.tableService.tables$;

	tableState = TableState;

	constructor(
		private tableService: TableService,
	) { }

	ngOnInit(): void {
		console.log('HomeComponent INIT');
	}
}
