/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
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

	constructor() {
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
		this.cleanMode = !this.cleanMode;
		this.cleanModeSubject.next(this.cleanMode);
	}

	switchToTransferTableMode() {
		this.transferTableMode = !this.transferTableMode;
		this.transferTableModeSubject.next(this.transferTableMode);
		console.log(this.transferTableMode);
	}
}
