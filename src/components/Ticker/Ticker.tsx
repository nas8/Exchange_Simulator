import { useState } from 'react';

import Decimal from 'decimal.js';
import Select from 'react-select';
import WSConnector from '../../WSClient';
import {
  StyledTicker,
  ButtonsWrapper,
  ControlWrapper,
  SellButton,
  BuyButton,
} from './Ticker.styled';

const options = [
  { value: 'eur_usd', label: 'EUR/USD' },
  { value: 'chn_rub', label: 'CNH/RUB' },
  { value: 'eur_rub', label: 'EUR/RUB' },
  { value: 'try_rub', label: 'TRY/RUB' },
  { value: 'byn_rub', label: 'BYN/RUB' },
];

const prices = {
  buy: {
    eur_usd: 1.08,
    chn_rub: 11.26,
    eur_rub: 83.33,
    try_rub: 4.06,
    byn_rub: 30.59,
  },
  sell: {
    eur_usd: 0.89,
    chn_rub: 10.26,
    eur_rub: 78.26,
    try_rub: 3.28,
    byn_rub: 27.16,
  },
};

type SelectOption = {
  value: string | number;
  label: string;
};

interface TickerProps {
  webSocket: WSConnector | null;
}

export const Ticker: React.FC<TickerProps> = ({ webSocket }) => {
  const [instrument, setInstrument] = useState<SelectOption>(options[0]);
  const [amount, setAmount] = useState<string | number>(1);
  const [buyPrice, setBuyPrice] = useState(prices.buy[instrument.value as keyof typeof prices.buy]);
  const [sellPrice, setSellPrice] = useState(
    prices.sell[instrument.value as keyof typeof prices.sell],
  );

  const handleChange = (option: SelectOption | null) => {
    if (option) {
      const priceCode = option.value;

      setInstrument(option);
      setBuyPrice(prices.buy[priceCode as keyof typeof prices.buy]);
      setSellPrice(prices.sell[priceCode as keyof typeof prices.sell]);
    }
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value)) {
      setAmount(event.target.value);
    }
  };

  const handleSellClick = (ws: WSConnector | null) => {
    const side = 'Sell';
    const decimalAmount = amount > 0 ? new Decimal(amount) : null;
    const decimalPrice = new Decimal((sellPrice * Number(amount)).toFixed(2));

    if (ws && decimalAmount && instrument) {
      ws.placeOrder(instrument.label, side, decimalAmount, decimalPrice);
    }
  };

  const handleBuyClick = (ws: WSConnector | null) => {
    const side = 'Buy';
    const decimalAmount = amount > 0 ? new Decimal(amount) : null;
    const decimalPrice = new Decimal((buyPrice * Number(amount)).toFixed(2));

    if (ws && decimalAmount && instrument) {
      ws.placeOrder(instrument.label, side, decimalAmount, decimalPrice);
    }
  };

  const renderNotification = (amount: number | string) => {
    if (!amount || amount === '0') {
      return (
        <span style={{ fontSize: '13px', color: 'red' }}>Amount field can't be empty or null</span>
      );
    }
  };

  const handleClearClick = (ws: WSConnector | null) => {
    if (ws) {
      ws.clearAddedBids();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
      <StyledTicker>
        <Select
          defaultValue={options[0]}
          isSearchable
          options={options}
          onChange={(option) => handleChange(option)}
        />
        <input
          style={{ borderRadius: '5px', height: '30px' }}
          value={amount}
          placeholder="amount"
          onChange={(event) => handleAmountChange(event)}
        />
        <ButtonsWrapper>
          <ControlWrapper>
            <span style={{ fontSize: '20px', alignSelf: 'flex-start' }}>
              {(sellPrice * Number(amount)).toFixed(2)}
            </span>
            <SellButton style={{ width: '50px' }} onClick={() => handleSellClick(webSocket)}>
              SELL
            </SellButton>
          </ControlWrapper>
          <ControlWrapper>
            <span style={{ fontSize: '20px', alignSelf: 'flex-start' }}>
              {(buyPrice * Number(amount)).toFixed(2)}
            </span>
            <BuyButton style={{ width: '50px' }} onClick={() => handleBuyClick(webSocket)}>
              BUY
            </BuyButton>
          </ControlWrapper>
        </ButtonsWrapper>
      </StyledTicker>
      {renderNotification(amount)}
      <button
        style={{ borderRadius: '5px', cursor: 'pointer', height: '20px', marginTop: '10px' }}
        onClick={() => handleClearClick(webSocket)}>
        Clear bids
      </button>
    </div>
  );
};
