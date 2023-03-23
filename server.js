const WebSocket = require('ws');

const messages = [
  {
    id: 1,
    creation_time: '12.12.2000',
    change_time: '12.12.2000',
    status: 'Active',
    side: 'Buy',
    price: 8,
    amount: 500000,
    instrument: 'CNH/RUB',
  },
  {
    id: 2,
    creation_time: '12.12.2000',
    change_time: '12.12.2000',
    status: 'Active',
    side: 'Buy',
    price: 8,
    amount: 500000,
    instrument: 'CNH/RUB',
  },
  {
    id: 3,
    creation_time: '12.12.2000',
    change_time: '12.12.2000',
    status: 'Active',
    side: 'Buy',
    price: 8,
    amount: 500000,
    instrument: 'CNH/RUB',
  },
  {
    id: 4,
    creation_time: '12.12.2000',
    change_time: '12.12.2000',
    status: 'Active',
    side: 'Buy',
    price: 8,
    amount: 500000,
    instrument: 'CNH/RUB',
  },
  {
    id: 5,
    creation_time: '12.12.2000',
    change_time: '12.12.2000',
    status: 'Active',
    side: 'Buy',
    price: 8,
    amount: 500000,
    instrument: 'CNH/RUB',
  },
];

const webSocketServer = new WebSocket.Server({
  port: 9000,
});

webSocketServer.on('connection', (socket) => {
  socket.on('message', (message) => {
    const messageData = JSON.parse(message.toString());
    if (messageData.type === 'DataRequested') {
      messages.forEach((message) => {
        socket.send(JSON.stringify(message));
      });
    }
  });
});

console.log('Сервер запущен на 9000 порту');
