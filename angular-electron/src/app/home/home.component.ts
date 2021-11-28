import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SerialPortService } from '../serial-port.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
      private router: Router, 
      private serialPortService: SerialPortService,
      ) {   }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
    this.serialPortService.serialPort.list().then(ports=>{
        ports.forEach(port=>{
            console.log(port);
        })
    })

  }

}
