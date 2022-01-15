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
	cleanMode$: Observable<boolean>;

	cleanModeSubject = new BehaviorSubject<boolean>(false);

	constructor() { }

	processKeyEvent(key: string) {
		switch (key.toLowerCase()) {
			case 'c': this.toggleCleanMode();
		}
	}

	toggleCleanMode() {
		const currentCleanMode = this.cleanModeSubject.value;

		this.cleanModeSubject.next(!currentCleanMode);

		console.log(this.cleanModeSubject.value);

	}
}
