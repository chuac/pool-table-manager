import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { TimeToCostPipe } from './pipes/time-to-cost.pipe';
import { HoursAndMinutesDifferencePipe } from './pipes/hours-and-minutes-difference.pipe';
import { EarliestStartDateForCustomerPipe } from './pipes/earliest-start-date-for-customer.pipe';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
	],
	declarations: [
		TimeToCostPipe,
		HoursAndMinutesDifferencePipe,
		EarliestStartDateForCustomerPipe,
		WebviewDirective,
	],
	exports: [
		TimeToCostPipe,
		HoursAndMinutesDifferencePipe,
		EarliestStartDateForCustomerPipe,
		WebviewDirective,
		FormsModule,
	],
})
export class SharedModule { }
