import { Injectable } from '@angular/core';
import { ElectronService } from '../../core/services';
import { TableState } from '../models/table-state.enum';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SerialPortService {
  tableStateChanged$: Observable<TableState>;

  private tableStateChangedSubject: BehaviorSubject<TableState> = new BehaviorSubject<TableState>(null);

  constructor(
    private electronService: ElectronService
  ) {
    this.tableStateChanged$ = this.tableStateChangedSubject.asObservable();

    if (this.electronService.isElectron) {
      // this.electronService.serialPort.list().then(ports => {
      //   ports.forEach(port => {
      //     console.log(port); // TODO: Remove
      //   });

      //   const desiredPort = ports.filter((port) => {
      //     return port.locationId && port.serialNumber; // TODO: Investigate a more robust way
      //   });

      //   if (desiredPort.length === 1) {
      //     const port = new this.electronService.serialPort(
      //       desiredPort[0].path, { baudRate: 9600 }
      //     );

      //     port.on('data', (data) =>
      //       console.log('Data:', Buffer.from(data, 'hex').toString('hex'))
      //     );
      //   } else {
      //     console.log('MORE THAN ONE "ELIGIBLE" COM PORT WAS FOUND');
      //   }
      // });
    }
  }
}
