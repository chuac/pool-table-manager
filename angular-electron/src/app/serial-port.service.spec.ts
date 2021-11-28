/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SerialPortService } from './serial-port.service';

describe('Service: SerialPort', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SerialPortService]
    });
  });

  it('should ...', inject([SerialPortService], (service: SerialPortService) => {
    expect(service).toBeTruthy();
  }));
});
