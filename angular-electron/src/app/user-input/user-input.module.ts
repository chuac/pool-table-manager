import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { CleanModeComponent } from './clean-mode/clean-mode.component';

@NgModule({
	imports: [
		CommonModule,
		MatDialogModule,
	],
	declarations: [
		CleanModeComponent,
	],
})
export class UserInputModule { }
