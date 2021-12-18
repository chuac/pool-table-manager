import { ElectronService } from './../core/services/electron/electron.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SerialPort } from 'electron';
import { PortInfo } from 'serialport';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private electronService: ElectronService,
  ) { }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
    this.electronService.serialPort.list().then(ports => {
      ports.forEach(port => {
        console.log(port);
      });

      const desiredPort = ports.filter((port) => {
        return port.locationId && port.serialNumber;
      });

      if (desiredPort.length === 1) {
        const port = new this.electronService.serialPort(
          desiredPort[0].path, { baudRate: 9600 }
        );

        port.on('data', (data) =>
          console.log('Data:', Buffer.from(data, 'hex').toString('hex'))
        );
      } else {
        console.log('MORE THAN ONE "ELIGIBLE" COM PORT WAS FOUND');
      }
    });


  }

}
