import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { TimeToCostPipe } from './pipes/time-to-cost.pipe';
import { HoursAndMinutesDifferencePipe } from './pipes/hours-and-minutes-difference.pipe';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
	],
	declarations: [
		TimeToCostPipe,
		HoursAndMinutesDifferencePipe,
		PageNotFoundComponent,
		WebviewDirective,
	],
	exports: [
		TimeToCostPipe,
		HoursAndMinutesDifferencePipe,
		WebviewDirective,
		FormsModule,
	],
})
export class SharedModule { }
