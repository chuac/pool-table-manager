import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { TimeToCostPipe } from './pipes/time-to-cost.pipe';
import { HoursAndMinutesAgoPipe } from './pipes/hours-and-minutes-ago.pipe';

@NgModule({
	imports: [
		CommonModule,
		TranslateModule,
		FormsModule,
	],
	declarations: [
		TimeToCostPipe,
		HoursAndMinutesAgoPipe,
		PageNotFoundComponent,
		WebviewDirective,
	],
	exports: [
		TimeToCostPipe,
		HoursAndMinutesAgoPipe,
		TranslateModule,
		WebviewDirective,
		FormsModule,
	],
})
export class SharedModule { }
