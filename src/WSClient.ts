import { ClientMessage } from './Models/ClientMessages';
import { ClientMessageType, Instrument } from './Enums';
import Decimal from 'decimal.js';

export default class WSConnector {
  connection: WebSocket | undefined;

  constructor() {
    this.connection = undefined;
  }

  connect = () => {
    this.connection = new WebSocket('ws://exchange-simulator.onrender.com');
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

  clearAddedBids = () => {
    this.send({
      messageType: 'clearData',
    });
  };

  on = (eventName: string, callback: any) => {
    if (this.connection) {
      this.connection.addEventListener(eventName, callback);
    }
  };
}
