import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DateFnsModule } from 'ngx-date-fns';

import { WelcomeScreenComponent } from './welcome-screen.component';

@NgModule({
	imports: [
		CommonModule,
		DateFnsModule
	],
	exports: [],
	declarations: [WelcomeScreenComponent],
	providers: [],
})
export class WelcomeScreenModule { }
