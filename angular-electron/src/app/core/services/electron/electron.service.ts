import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as ElectronStore from 'electron-store';
import * as SerialPort from 'serialport';
import { Schema } from 'electron-store';
import { SettingsDb } from '../../../database/models/settings-db.model';

@Injectable({
	providedIn: 'root'
})
export class ElectronService {
	ipcRenderer: typeof ipcRenderer;
	webFrame: typeof webFrame;
	childProcess: typeof childProcess;
	fs: typeof fs;
	electronStore: typeof ElectronStore;
	settingsDb: ElectronStore;
	serialPort: typeof SerialPort;

	constructor() {
		// Conditional imports
		if (this.isElectron) {
			this.ipcRenderer = window.require('electron').ipcRenderer;
			this.webFrame = window.require('electron').webFrame;

			this.childProcess = window.require('child_process');
			this.fs = window.require('fs');

			this.electronStore = window.require('electron-store');
			this.setupDatabases();

			this.serialPort = window.require('serialport');

			this.serialPort.list().then(ports => {
				ports.forEach(port => {
					console.log(port); // TODO: Remove
				});

				const desiredPort = ports.filter((port) => {
					return port.locationId && port.serialNumber; // TODO: Investigate a more robust way
				});

				if (desiredPort.length === 1) {
					const port = new this.serialPort(
						desiredPort[0].path, { baudRate: 9600 }
					);

					port.on('data', (data) => { return console.log('Data:', Buffer.from(data, 'hex').toString('hex')); }
					);
				} else {
					console.log('MORE THAN ONE "ELIGIBLE" COM PORT WAS FOUND');
				}
			});

			// Notes :
			// * A NodeJS's dependency imported with 'window.require' MUST BE present in `dependencies` of both `app/package.json`
			// and `package.json (root folder)` in order to make it work here in Electron's Renderer process (src folder)
			// because it will loaded at runtime by Electron.
			// * A NodeJS's dependency imported with TS module import (ex: import { Dropbox } from 'dropbox') CAN only be present
			// in `dependencies` of `package.json (root folder)` because it is loaded during build phase and does not need to be
			// in the final bundle. Reminder : only if not used in Electron's Main process (app folder)

			// If you want to use a NodeJS 3rd party deps in Renderer process,
			// ipcRenderer.invoke can serve many common use cases.
			// https://www.electronjs.org/docs/latest/api/ipc-renderer#ipcrendererinvokechannel-args
		}
	}

	get isElectron(): boolean {
		return !!(window && window.process && window.process.type);
	}

	private setupDatabases(): void {
		const settingsDbSchema: Schema<SettingsDb> = {
			port: {
				type: 'object',
				properties: {
					path: {
						type: 'string',
					}
				}
			}
		};

		this.settingsDb = new this.electronStore({
			name: 'settings',
			schema: settingsDbSchema as Record<string, unknown>,
		});
	}
}
