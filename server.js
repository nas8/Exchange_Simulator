const WebSocket = require('ws');

let bids = [
  {
    creation_time: '26.03.2023 14:15:11',
    change_time: '26.03.2023 14:15:11',
    status: 'Filled',
    side: 'Buy',
    price: 8,
    amount: 500000,
    instrument: 'CNH/RUB',
  },
  {
    creation_time: '26.03.2023 14:15:11',
    change_time: '26.03.2023 14:15:11',
    status: 'Rejected',
    side: 'Buy',
    price: 8,
    amount: 500000,
    instrument: 'CNH/RUB',
  },
  {
    creation_time: '26.03.2023 14:15:11',
    change_time: '26.03.2023 14:15:11',
    status: 'Filled',
    side: 'Buy',
    price: 8,
    amount: 500000,
    instrument: 'CNH/RUB',
  },
  {
    creation_time: '26.03.2023 14:15:11',
    change_time: '26.03.2023 14:15:11',
    status: 'Filled',
    side: 'Buy',
    price: 8,
    amount: 500000,
    instrument: 'CNH/RUB',
  },
  {
    creation_time: '26.03.2023 14:15:11',
    change_time: '26.03.2023 14:15:11',
    status: 'Cancelled',
    side: 'Buy',
    price: 8,
    amount: 500000,
    instrument: 'CNH/RUB',
  },
];

const bidsPending = [];

const webSocketServer = new WebSocket.Server({
  port: 9000,
});

const generateStatus = () => {
  const statuses = ['Filled', 'Rejected', 'Cancelled'];

  const min = 0;
  const max = statuses.length - 1;
  const randomStatus = Math.floor(Math.random() * (max - min + 1) + min);

  return statuses[randomStatus];
};

webSocketServer.on('connection', onConnect);

function onConnect(socket) {
  socket.on('message', (bid) => {
    const messageData = JSON.parse(bid.toString());

    const currentDate = new Date().toLocaleDateString('ru-RU');
    const currentTime = new Date().toLocaleTimeString('ru-RU');

    if (messageData.messageType === 'DataRequested') {
      bids.forEach((bid, index) => {
        const formattedMessage = {
          messageType: 'data',
          message: { id: index + 1, ...bid },
        };

        socket.send(JSON.stringify(formattedMessage));
      });
    }

    if (messageData.messageType === 3) {
      const newBid = {
        id: bids.length + 1,
        creation_time: `${currentDate} ${currentTime}`,
        change_time: `${currentDate} ${currentTime}`,
        status: 'Active',
        ...messageData.message,
      };

      const formattedMessage = {
        messageType: 'newOrder',
        message: { ...newBid },
      };

      bids.push(newBid);
      bidsPending.push(newBid);

      socket.send(JSON.stringify(formattedMessage));
    }

    if (bidsPending.length > 0) {
      setTimeout(() => {
        const currentDate = new Date().toLocaleDateString('ru-RU');
        const currentTime = new Date().toLocaleTimeString('ru-RU');

        const updatedBid = {
          ...bidsPending[0],
          status: generateStatus(),
          change_time: `${currentDate} ${currentTime}`,
        };

        const formattedMessage = {
          messageType: 'updateOrder',
          message: { ...updatedBid },
        };

        bidsPending.shift();

        const updatedBids = bids.map((bid) => {
          if (bid.id === updatedBid.id) {
            return updatedBid;
          }
          return bid;
        });

        bids = [...updatedBids];

        socket.send(JSON.stringify(formattedMessage));
      }, 3000);
    }
  });
}

console.log('Сервер запущен на 9000 порту');
