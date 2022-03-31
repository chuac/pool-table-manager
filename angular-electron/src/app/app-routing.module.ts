import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeRoutingModule } from './home/home-routing.module';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path: 'welcome',
		component: WelcomeScreenComponent,
		//pathMatch: 'full'
	},
	{
		path: '**',
		redirectTo: ''
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
		HomeRoutingModule,
	],
	exports: [
		RouterModule,
	],
})
export class AppRoutingModule { }
