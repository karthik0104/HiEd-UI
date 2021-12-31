import io from "socket.io-client";

//const socket = io.connect('http://localhost:5344/');
const socket = io.connect('http://localhost:5344/', { rememberTransport: false, transports: ['websocket'] });
//const socket = io.connect(null, {host: 'localhost', port: 5344, rememberTransport: false, transports: ['websocket']});

export { socket };