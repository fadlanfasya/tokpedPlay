const socket = io();  // Establishes a connection to the server

// Sending an event to the server
socket.emit('chat message', 'Hello, server!');

// Receiving an event from the server
socket.on('chat message', (message) => {
    console.log('Received message from server:', message);
});

socket.on('serverEvent', (data) => {
    console.log('Received event from server:', data);
});
