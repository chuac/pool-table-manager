import { TableService } from './../shared/services/table.service';
import { ElectronService } from './../core/services/electron/electron.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SerialPort } from 'electron';
import { PortInfo } from 'serialport';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	tables$ = this.tableService.tables$;

	constructor(
		private router: Router,
		private electronService: ElectronService,
		private tableService: TableService,
	) { }

	ngOnInit(): void {
		console.log('HomeComponent INIT');



	}

}
