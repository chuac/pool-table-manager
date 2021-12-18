// import { Injectable } from '@angular/core';
// import * as SerialPort from 'serialport';

// import { ipcRenderer, webFrame } from 'electron';
// import * as childProcess from 'child_process';
// import * as fs from 'fs';
// import { ElectronService } from './core/services';


// declare global {
//   interface Window {
//     require: any;
//     process: any;
//   }
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class SerialPortService {

//   serialPort: SerialPort;

//   ipcRenderer: typeof ipcRenderer;
//   webFrame: typeof webFrame;
//   // remote: typeof remote;
//   childProcess: typeof childProcess;
//   fs: typeof fs;

//   constructor(
//     private electronService: ElectronService
//   ) {
//     // Conditional imports

//     if (this.isElectron()) {
//       this.serialPort = window.require('serialport');

//       this.ipcRenderer = window.require('electron').ipcRenderer;
//       this.webFrame = window.require('electron').webFrame;
//       // this.remote = window.require('electron').remote;

//       this.childProcess = window.require('child_process');
//       this.fs = window.require('fs');
//     }
//   }

//   isElectron = () => {
//     return window && window.process && window.process.type;
//   };

// }
