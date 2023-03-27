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

    if (messageData.messageType === 'clearData') {
      setData([...messageData.message]);
    }

    if (!messageData.message) {
      setData([]);
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

  const renderBidList = (connectionStatus: number | undefined) => {
    if (connectionStatus === undefined || connectionStatus === 2 || connectionStatus === 3) {
      return <span style={{ fontSize: '20px' }}>No connection...</span>;
    }

    if (connectionStatus === 0) {
      return <span style={{ fontSize: '20px' }}>Loading...</span>;
    }

    return <BidList data={data}></BidList>;
  };

  return (
    <div className="App">
      <div style={{ display: 'column', alignItems: 'center' }}>
        {renderBidList(connectionState)}
      </div>
      <Ticker webSocket={webSocket.current} />
    </div>
  );
}

export default App;
