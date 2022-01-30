import { TableService } from './../shared/services/table.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableState } from '../shared/models/table-state.enum';
import { SwitchboardService } from '../shared/services/switchboard.service';
import { UserInputService } from '../user-input/user-input.service';
import { CustomerService } from '../shared/services/customer.service';
import { tap } from 'rxjs/operators';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
	clock$ = this.tableService.clock$;
	tables$ = this.tableService.tables$;
	tableStateChanged$ = this.switchboardService.tableStateChanged$;
	cleanMode$ = this.userInputService.cleanMode$;

	showSwitchboard = false;

	tableState = TableState;

	constructor(
		private readonly tableService: TableService,
		private readonly switchboardService: SwitchboardService,
		private readonly userInputService: UserInputService,
		private readonly customerService: CustomerService,
	) { }

	ngOnInit(): void {
		console.log('HomeComponent INIT');

		this.customerService.customers$
			.pipe(
				tap((customers) => {
					console.log(customers); // TODO: Just to peek into Customers to debug. Remove whenever
				})
			)
			.subscribe();
	}
}
