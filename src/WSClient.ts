import { ClientMessage } from './Models/ClientMessages';
import { ClientMessageType, Instrument, OrderSide, ServerMessageType } from './Enums';
import Decimal from 'decimal.js';
import { ServerEnvelope } from './Models/ServerMessages';

export default class WSConnector {
  connection: WebSocket | undefined;

  constructor() {
    this.connection = undefined;
  }

  connect = () => {
    this.connection = new WebSocket('ws://127.0.0.1:9000'); // ws://127.0.0.1:9000/ws/
    this.connection.onclose = () => {
      this.connection = undefined;
    };

    this.connection.onerror = () => {
      console.log('Error');
    };

    this.connection.onopen = () => {
      console.log('Connection open');
    };

    this.connection.onmessage = (event) => {
      // console.log(event.data);
      const message: ServerEnvelope = event.data; // JSON.parse(event.data)
      switch (message.messageType) {
        case ServerMessageType.success:
          break;
        case ServerMessageType.error:
          break;
        case ServerMessageType.executionReport:
          break;
        case ServerMessageType.marketDataUpdate:
          break;
      }
    };
  };

  disconnect = () => {
    this.connection?.close();
  };

  send = (message: ClientMessage) => {
    this.connection?.send(JSON.stringify(message));
  };

  subscribeMarketData = (instrument: Instrument) => {
    this.send({
      messageType: ClientMessageType.subscribeMarketData,
      message: {
        instrument,
      },
    });
  };

  unsubscribeMarketData = (subscriptionId: string) => {
    this.send({
      messageType: ClientMessageType.unsubscribeMarketData,
      message: {
        subscriptionId,
      },
    });
  };

  placeOrder = (instrument: Instrument, side: OrderSide, amount: Decimal, price: Decimal) => {
    this.send({
      messageType: ClientMessageType.placeOrder,
      message: {
        instrument,
        side,
        amount,
        price,
      },
    });
  };
}
