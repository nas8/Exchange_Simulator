import { useState } from 'react';

import Decimal from 'decimal.js';
import Select from 'react-select';
import WSConnector from '../../WSClient';
import { StyledTicker, ButtonsWrapper, ControlWrapper, StyledInput } from './Ticker.styled';

const options = [
  { value: 'eur_usd', label: 'EUR/USD' },
  { value: 'chn_rub', label: 'CNH/RUB' },
  { value: 'eur_rub', label: 'EUR/RUB' },
  { value: 'try_rub', label: 'TRY/RUB' },
  { value: 'byn_rub', label: 'BYN/RUB' },
];

const prices = {
  eur_usd: 1.08,
  chn_rub: 11.26,
  eur_rub: 83.33,
  try_rub: 4.06,
  byn_rub: 30.59,
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
  const [price, setPrice] = useState(prices[instrument.value as keyof typeof prices]);

  const handleChange = (option: SelectOption | null) => {
    if (option) {
      const priceCode = option.value;

      setInstrument(option);
      setPrice(prices[priceCode as keyof typeof prices]);
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
    const decimalPrice = new Decimal((price * Number(amount)).toFixed(2));

    if (ws && decimalAmount && instrument) {
      ws.placeOrder(instrument.label, side, decimalAmount, decimalPrice);
    }
  };

  const handleBuyClick = (ws: WSConnector | null) => {
    const side = 'Buy';
    const decimalAmount = amount > 0 ? new Decimal(amount) : null;
    const decimalPrice = new Decimal((price * Number(amount)).toFixed(2));

    if (ws && decimalAmount && instrument) {
      ws.placeOrder(instrument.label, side, decimalAmount, decimalPrice);
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
            {(price * Number(amount)).toFixed(2)}
            <button style={{ width: '50px' }} onClick={() => handleSellClick(webSocket)}>
              SELL
            </button>
          </ControlWrapper>
          <ControlWrapper>
            {(price * Number(amount)).toFixed(2)}
            <button style={{ width: '50px' }} onClick={() => handleBuyClick(webSocket)}>
              BUY
            </button>
          </ControlWrapper>
        </ButtonsWrapper>
      </StyledTicker>
    </div>
  );
};
