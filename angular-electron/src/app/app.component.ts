import { Component, HostListener } from '@angular/core';
import { ElectronService } from './core/services';
import { APP_CONFIG } from '../environments/environment';
import { UserInputService } from './user-input/user-input.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(
		private electronService: ElectronService,
		private readonly userInputService: UserInputService
	) {
		console.log('APP_CONFIG', APP_CONFIG);

		if (electronService.isElectron) {
			console.log(process.env);
			console.log('Run in electron');
			console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
			console.log('NodeJS childProcess', this.electronService.childProcess);
		} else {
			console.log('Run in browser');
		}
	}

	@HostListener('window:keyup', ['$event'])
	keyEvent(event: KeyboardEvent) {
		console.log(event);
		this.userInputService.processKeyEvent(event.key);
	}
}
