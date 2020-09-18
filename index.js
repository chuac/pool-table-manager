const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

// define the serial port
const port = new SerialPort('COM4', { // check device manager for COM number
    baudRate: 9600
});


// read data from serial port normally
// port.on('data', (data) => console.log('Data:', data));

// serial port parser
const parser = port.pipe(new Readline());

// read data from serial port, using the parser
parser.on('data', (line) => console.log(line));