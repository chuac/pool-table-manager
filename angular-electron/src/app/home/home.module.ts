import { DateFnsModule } from 'ngx-date-fns';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { SwitchboardComponent } from '../switchboard/switchboard.component';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		HomeRoutingModule,
		DateFnsModule,
	],
	declarations: [
		HomeComponent,
        SwitchboardComponent
	],
})
export class HomeModule { }
