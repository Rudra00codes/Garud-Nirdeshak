const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        console.log('Received message:', message);
        const data = JSON.parse(message);
        // Broadcast the message to all clients except the sender
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('Signaling server running on port 3000');
