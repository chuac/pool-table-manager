import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingTransactionComponent } from './pending-transaction.component';
import { SharedModule } from '../shared/shared.module';
import { DateFnsModule } from 'ngx-date-fns';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		DateFnsModule,
	],
	declarations: [
		PendingTransactionComponent,
	],
	exports: [
		PendingTransactionComponent,
	],
})
export class TransactionModule { }
