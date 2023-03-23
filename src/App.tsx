import { useEffect, useState } from 'react';
import './App.css';
import { BidList } from './components/BidList/BidList';
import { Ticker } from './components/Ticker/Ticker';

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
  type: ClientMessageType;
}

enum ClientMessageType {
  DataRequested = 'DataRequested',
}

function App() {
  const [data, setData] = useState<Data[]>([]);

  const handleConnection = (webSocket: WebSocket) => {
    const requestData: ClientMessage = {
      type: ClientMessageType.DataRequested,
    };

    webSocket.send(JSON.stringify(requestData));
  };

  const handleIncomingMessage = (message: MessageEvent) => {
    const messageData = JSON.parse(message.data);

    setData((currentMessages) => {
      return [...currentMessages, messageData];
    });
  };

  useEffect(() => {
    const webSocket = new WebSocket('ws://127.0.0.1:9000');

    setData([]);

    webSocket.addEventListener('open', () => {
      handleConnection(webSocket);
    });

    webSocket.addEventListener('message', (message) => {
      handleIncomingMessage(message);
    });

    return () => {
      webSocket.close();
    };
  }, []);

  return (
    <div className="App">
      <div>
        <BidList data={data} />
      </div>
      <div>
        <Ticker />
      </div>
    </div>
  );
}

export default App;
