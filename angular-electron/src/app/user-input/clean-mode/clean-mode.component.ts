import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../models/dialog-data';

@Component({
	selector: 'clean-mode',
	templateUrl: './clean-mode.component.html',
	styleUrls: ['./clean-mode.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CleanModeComponent {

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		public dialogRef: MatDialogRef<CleanModeComponent>,
	) { }

	closeDialog() {
		this.dialogRef.close();
	}
}
