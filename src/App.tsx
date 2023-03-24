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

  const handleConnection = (socket: any) => {
    const requestLogsMessage: ClientMessage = {
      messageType: ClientMessageType.DataRequested,
    };
    socket.send(requestLogsMessage);
  };

  const handleIncomingMessage = (message: MessageEvent) => {
    const messageData = JSON.parse(message.data);

    setData((currentMessages) => {
      return [messageData, ...currentMessages];
    });
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
      <BidList data={data} />
      <Ticker webSocket={webSocket.current} />
    </div>
  );
}

export default App;
