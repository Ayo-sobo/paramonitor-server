const net = require('net');

// Configuration
const HOST = '192.168.137.1'; 
const PORT = 8080;           
const HEX_COMMAND = '0C0000559EFFC0A88901901F5EFD'; 

let isConnected = false; 

const server = net.createServer((socket) => {
    console.log('Device connected:', socket.remoteAddress + ':' + socket.remotePort);
    isConnected = true; 

    const buffer = Buffer.from(HEX_COMMAND, 'hex');
    socket.write(buffer);
    console.log('Sent to device:', HEX_COMMAND);

    socket.on('data', (data) => {
        console.log('Received from device (Hex):', data.toString('hex'));
        console.log('Received from device (String):', data.toString());
    });

    socket.on('close', () => {
        console.log('Device disconnected');
        isConnected = false; 
    });

    socket.on('error', (err) => {
        console.error('Socket error:', err.message);
    });
});


server.listen(PORT, HOST, () => {
    console.log(`Server listening on ${HOST}:${PORT}`);
});


server.on('error', (err) => {
    console.error('Server error:', err.message);
});
