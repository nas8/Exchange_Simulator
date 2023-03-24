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
    this.connection = new WebSocket('ws://127.0.0.1:9000');
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

  placeOrder = (instrument: string, side: string, amount: Decimal, price: Decimal) => {
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

  on = (eventName: string, callback: any) => {
    if (this.connection) {
      this.connection.addEventListener(eventName, callback);
    }
  };
}
