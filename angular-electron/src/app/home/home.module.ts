import { DateFnsModule } from 'ngx-date-fns';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SwitchboardComponent } from '../switchboard/switchboard.component';
import { SharedModule } from '../shared/shared.module';
import { TransactionModule } from '../transaction/transaction.module';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		TransactionModule,
		//HomeRoutingModule,
		DateFnsModule,
	],
	declarations: [
		HomeComponent,
		SwitchboardComponent
	],
})
export class HomeModule { }
