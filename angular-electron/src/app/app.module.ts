import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { DateFnsConfigurationService } from 'ngx-date-fns';
import { enAU } from 'date-fns/locale';

import { AppRoutingModule } from './app-routing.module';

import { HomeModule } from './home/home.module';
import { TransactionModule } from './transaction/transaction.module';

import { AppComponent } from './app.component';
import { BaseDialogComponent } from './base-dialog/base-dialog.component';

const australianDateConfig = new DateFnsConfigurationService();
australianDateConfig.setLocale(enAU);

@NgModule({
	declarations: [AppComponent, BaseDialogComponent],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		CoreModule,
		SharedModule,
		HomeModule,
		TransactionModule,
		AppRoutingModule,
	],
	providers: [
		{ provide: DateFnsConfigurationService, useValue: australianDateConfig },
	],
	bootstrap: [
		AppComponent,
	],
})
export class AppModule { }
