const SerialPort = require('serialport');
const ByteLength = require('@serialport/parser-byte-length')
const Readline = require('@serialport/parser-readline');

// define the serial port
const port = new SerialPort('COM4', { // check device manager for COM number
    baudRate: 9600
});
console.log('Program listening');

// read data from serial port normally
port.on('data', (data) => console.log('Data:', data.toString()));

// serial port parser
// const parser = port.pipe(new Readline());
// read data from serial port, using the parser
// parser.on('data', (data) => console.log(data));

// const parser = port.pipe(new ByteLength({length: 4}))
// parser.on('data', (data) => console.log(data.toString()));