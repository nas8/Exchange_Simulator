import { useState } from 'react';

import Decimal from 'decimal.js';
import Select from 'react-select';
import { OrderSide, Instrument } from '../../Enums';
import WSConnector from '../../WSClient';
import { StyledTicker, ButtonsWrapper, ControlWrapper } from './Ticker.styled';

const options = [
  { value: 'CNH/RUB', label: 'CNH/RUB' },
  { value: 'EUR/RUB', label: 'EUR/RUB' },
  { value: 'EUR/USD', label: 'EUR/USD' },
  { value: 'TRY/RUB', label: 'TRY/RUB' },
  { value: 'BYN/RUB', label: 'BYN/RUB' },
];

type SelectOption = {
  value: string | number;
  label: string;
};

interface TickerProps {
  webSocket: WSConnector | null;
}

export const Ticker: React.FC<TickerProps> = ({ webSocket }) => {
  const [instrument, setInstrument] = useState<string | null>(null);
  const [amount, setAmount] = useState('');

  const handleChange = (option: SelectOption | null) => {
    if (option) {
      setInstrument(option?.label);
    }
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    if (value) {
      setAmount(event.target.value);
      return;
    }

    setAmount('');
  };

  const handleSellClick = (ws: WSConnector | null) => {
    const side = 'Sell';
    const decimalAmount = amount ? new Decimal(amount) : null;
    const price = new Decimal(8);

    if (ws && decimalAmount && instrument) {
      ws.placeOrder(instrument, side, decimalAmount, price);
    }
  };

  const handleBuyClick = (ws: WSConnector | null) => {
    const side = 'Buy';
    const decimalAmount = amount ? new Decimal(amount) : null;
    const price = new Decimal(8);

    if (ws && decimalAmount && instrument) {
      ws.placeOrder(instrument, side, decimalAmount, price);
    }
  };

  return (
    <div>
      <p>Ticker</p>
      <StyledTicker>
        <Select isSearchable options={options} onChange={(option) => handleChange(option)} />
        <input
          value={amount}
          placeholder="amount"
          onChange={(event) => handleAmountChange(event)}
        />
        <ButtonsWrapper>
          <ControlWrapper>
            8.55
            <button onClick={() => handleSellClick(webSocket)}>SELL</button>
          </ControlWrapper>
          <ControlWrapper>
            7.55
            <button onClick={() => handleBuyClick(webSocket)}>BUY</button>
          </ControlWrapper>
        </ButtonsWrapper>
      </StyledTicker>
    </div>
  );
};
