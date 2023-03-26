import { useState } from 'react';

import Decimal from 'decimal.js';
import Select from 'react-select';
import WSConnector from '../../WSClient';
import { StyledTicker, ButtonsWrapper, ControlWrapper, StyledInput } from './Ticker.styled';

const options = [
  { value: 'EUR/USD', label: 'EUR/USD' },
  { value: 'CNH/RUB', label: 'CNH/RUB' },
  { value: 'EUR/RUB', label: 'EUR/RUB' },
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
  const [instrument, setInstrument] = useState<string>('EUR/USD');
  const [amount, setAmount] = useState<string | number>(1);

  const handleChange = (option: SelectOption | null) => {
    if (option) {
      setInstrument(option?.label);
    }
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    if (!isNaN(value)) {
      setAmount(event.target.value);
      return;
    }
  };

  const handleSellClick = (ws: WSConnector | null) => {
    const side = 'Sell';
    const decimalAmount = amount > 0 ? new Decimal(amount) : null;
    const price = new Decimal(8);

    if (ws && decimalAmount && instrument) {
      ws.placeOrder(instrument, side, decimalAmount, price);
    }
  };

  const handleBuyClick = (ws: WSConnector | null) => {
    const side = 'Buy';
    const decimalAmount = amount > 0 ? new Decimal(amount) : null;
    const price = new Decimal(8);

    if (ws && decimalAmount && instrument) {
      ws.placeOrder(instrument, side, decimalAmount, price);
    }
  };

  return (
    <div>
      <p>Ticker</p>
      <StyledTicker>
        <Select
          defaultValue={options[0]}
          isSearchable
          options={options}
          onChange={(option) => handleChange(option)}
        />
        <StyledInput
          style={{ borderRadius: '5px', height: '30px' }}
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
