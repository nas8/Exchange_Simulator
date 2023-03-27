import { useEffect, useState, useRef } from 'react';
import './App.css';
import { BidList } from './components/BidList/BidList';
import { Ticker } from './components/Ticker/Ticker';
import WSConnector from './WSClient';

interface Data {
  id: number | string;
  creation_time: string;
  change_time: string;
  status: string;
  side: string;
  price: number | string;
  amount: number;
  instrument: string;
}

export interface ClientMessage {
  messageType: ClientMessageType;
}

enum ClientMessageType {
  DataRequested = 'DataRequested',
  BidData = 'BidDataRequest',
}

function App() {
  const [data, setData] = useState<Data[]>([]);
  const webSocket = useRef<WSConnector | null>(null);

  const connectionState = webSocket.current?.connection?.readyState;

  const handleConnection = (socket: any) => {
    const requestData: ClientMessage = {
      messageType: ClientMessageType.DataRequested,
    };
    socket.send(requestData);
  };

  const handleIncomingMessage = (message: MessageEvent) => {
    const messageData = JSON.parse(message.data);

    if (messageData.messageType === 'data') {
      setData((currentMessages) => {
        return [messageData.message, ...currentMessages];
      });
    }

    if (messageData.messageType === 'newOrder') {
      setData((currentMessages) => {
        return [messageData.message, ...currentMessages];
      });
    }

    if (messageData.messageType === 'updateOrder') {
      setData((currentMessages) => {
        return currentMessages.map((message) => {
          if (message.id === messageData.message.id) {
            return messageData.message;
          }
          return message;
        });
      });
    }
  };

  useEffect(() => {
    const socket = new WSConnector();
    socket.connect();

    setData([]);

    socket.on('open', () => {
      handleConnection(socket);
    });

    socket.on('message', (message: MessageEvent) => {
      handleIncomingMessage(message);
    });

    webSocket.current = socket;

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      {connectionState === 0 && <span style={{ fontSize: '20px' }}>Loading...</span>}
      {connectionState === 1 && <BidList data={data} />}
      <Ticker webSocket={webSocket.current} />
    </div>
  );
}

export default App;
