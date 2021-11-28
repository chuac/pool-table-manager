// import { Buffer } from 'buffer';
const Buffer = require('buffer').Buffer;
const SerialPort = require('serialport');
const ByteLength = require('@serialport/parser-byte-length');
const Readline = require('@serialport/parser-readline');

// define the serial port
<<<<<<< HEAD
const port = new SerialPort('COM7', { // check device manager for COM number
    baudRate: 9600
=======
const port = new SerialPort('COM1', {
  // check device manager for COM number
  baudRate: 9600,
>>>>>>> 63b4fda (Test)
});
console.log('Program listening');

// read data from serial port normally
port.on('data', (data) => console.log('Data:', Buffer.from(data, 'hex').toString('hex')));
// port.on('data', (data) => console.log('Data:', data));
// port.on('data', (data) => console.log('Data:', Buffer.from(data, 'hex').toString('utf8')));

// serial port parser
// const parser = port.pipe(new Readline());
// read data from serial port, using the parser
// parser.on('data', (data) => console.log(data));

<<<<<<< HEAD
// const parser = port.pipe(new ByteLength({length: 8}))
// parser.on('data', (data) => console.log(data.toString()));
// export enum CoolEnumName {

//     ONE_ON = 41,
//     ONE_OFF = 01,
// }

// console.log(CoolEnumName.ONE_ON);
=======
// const parser = port.pipe(new ByteLength({length: 4}))
// parser.on('data', (data) => console.log(data.toString()));
>>>>>>> 63b4fda (Test)
