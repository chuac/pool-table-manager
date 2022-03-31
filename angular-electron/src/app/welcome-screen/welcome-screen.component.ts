import { Component, OnInit } from '@angular/core';
import { TableService } from '../shared/services/table.service';

@Component({
	selector: 'app-welcome-screen',
	templateUrl: './welcome-screen.component.html',
	styleUrls: ['./welcome-screen.component.scss']
})
export class WelcomeScreenComponent implements OnInit {
	clock$ = this.tableService.clock$;

	constructor(
		private readonly tableService: TableService,
	) {

	}

	ngOnInit(): void {
	}


}
