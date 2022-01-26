import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { CleanModeComponent } from './clean-mode/clean-mode.component';

@Injectable({
	providedIn: 'root'
})
export class UserInputService {
	cleanMode = false;
	cleanMode$: Observable<boolean>;

	transferTableMode = false;
	transferTableMode$: Observable<boolean>;

	private cleanModeSubject = new BehaviorSubject<boolean>(false);
	private transferTableModeSubject = new BehaviorSubject<boolean>(false);

	constructor(
		private dialog: MatDialog,
	) {
		this.cleanMode$ = this.cleanModeSubject.asObservable();
	}

	processKeyEvent(key: string) {
		switch (key.toLowerCase()) {
			case 'c':
				this.toggleCleanMode();
				break;
			case 'f':
				this.switchToTransferTableMode();
				break;
		}
	}

	toggleCleanMode() {
		this.dialog.closeAll();

		this.cleanMode = !this.cleanMode;
		this.cleanModeSubject.next(this.cleanMode);

		if (this.cleanMode) {
			this.openCleanModeDialog();
		}
	}

	switchToTransferTableMode() {
		this.transferTableMode = !this.transferTableMode;
		this.transferTableModeSubject.next(this.transferTableMode);
		console.log(this.transferTableMode);
	}

	private openCleanModeDialog() {
		this.dialog.open(CleanModeComponent, {
			width: '400px',
			height: '400px',
			disableClose: true,
			data: {
				title: 'Clean mode is on!'
			},
			panelClass: ['example-class'],
		});
	}
}
