import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { HomeRoutingModule } from './home/home-routing.module';
import { HomeComponent } from './home/home.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'welcome',
		pathMatch: 'full'
	},
	{
		path: 'welcome',
		component: WelcomeScreenComponent,
		pathMatch: 'full'
	},
	{
		path: 'main',
		component: HomeComponent,
		pathMatch: 'full'
	},
	{
		path: '**',
		redirectTo: 'welcome'
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
		//HomeRoutingModule,
	],
	exports: [
		RouterModule,
	],
})
export class AppRoutingModule { }
