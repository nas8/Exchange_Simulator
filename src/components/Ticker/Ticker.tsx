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
  const handleChange = (option: SelectOption | null) => {
    console.log(option);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target);
  };

  const handleSellClick = (ws: WSConnector | null) => {
    const side = 'Sell';
    const amount = new Decimal(100);
    const price = new Decimal(8);

    if (ws) {
      ws.placeOrder('CNH/RUB', side, amount, price);
    }
  };

  const handleBuyClick = (ws: WSConnector | null) => {
    if (ws) {
      ws.send('Buy');
    }
  };

  return (
    <div>
      <p>Ticker</p>
      <StyledTicker>
        <Select
          isClearable
          isSearchable
          options={options}
          onChange={(option) => handleChange(option)}
        />
        <input placeholder="amount" onChange={(event) => handleAmountChange(event)} />
        <ButtonsWrapper>
          <ControlWrapper>
            {/* 8.55 */}
            <button onClick={() => handleSellClick(webSocket)}>SELL</button>
          </ControlWrapper>
          <ControlWrapper>
            {/* 7.55 */}
            <button onClick={() => handleBuyClick(webSocket)}>BUY</button>
          </ControlWrapper>
        </ButtonsWrapper>
      </StyledTicker>
    </div>
  );
};
