const WebSocket = require('ws');

const bids = [
  {
    creation_time: '12.12.2000',
    change_time: '12.12.2000',
    status: 'Active',
    side: 'Buy',
    price: 8,
    amount: 500000,
    instrument: 'CNH/RUB',
  },
  {
    creation_time: '12.12.2000',
    change_time: '12.12.2000',
    status: 'Active',
    side: 'Buy',
    price: 8,
    amount: 500000,
    instrument: 'CNH/RUB',
  },
  {
    creation_time: '12.12.2000',
    change_time: '12.12.2000',
    status: 'Active',
    side: 'Buy',
    price: 8,
    amount: 500000,
    instrument: 'CNH/RUB',
  },
  {
    creation_time: '12.12.2000',
    change_time: '12.12.2000',
    status: 'Active',
    side: 'Buy',
    price: 8,
    amount: 500000,
    instrument: 'CNH/RUB',
  },
  {
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

webSocketServer.on('connection', onConnect);

function onConnect(socket) {
  socket.on('message', (bid) => {
    const messageData = JSON.parse(bid.toString());

    if (messageData.messageType === 'DataRequested') {
      bids.forEach((bid, index) => {
        const formattedMessage = { id: index + 1, ...bid };
        socket.send(JSON.stringify(formattedMessage));
      });
    }

    if (messageData.messageType === 3) {
      const newBid = {
        id: bids.length,
        creation_time: new Date(),
        change_time: 'not changed',
        status: 'Active',
        ...messageData.message,
      };

      bids.push(newBid);

      socket.send(JSON.stringify(newBid));
    }
  });
}

console.log('Сервер запущен на 9000 порту');
