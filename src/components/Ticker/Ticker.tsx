import Select from 'react-select';
import { StyledTicker, ButtonsWrapper, ControlWrapper } from './Ticker.styled';

const options = [
  { value: 'CNH/RUB', label: 'CNH/RUB' },
  { value: 'EUR/RUB', label: 'EUR/RUB' },
  { value: 'EUR/USD', label: 'EUR/USD' },
  { value: 'TRY/RUB', label: 'TRY/RUB' },
  { value: 'BYN/RUB', label: 'BYN/RUB' },
];

export const Ticker = () => {
  return (
    <StyledTicker>
      <Select isClearable isSearchable options={options} />
      <input placeholder="amount"></input>
      <ButtonsWrapper>
        <ControlWrapper>
          8.55
          <button>SELL</button>
        </ControlWrapper>
        <ControlWrapper>
          7.55
          <button>BUY</button>
        </ControlWrapper>
      </ButtonsWrapper>
    </StyledTicker>
  );
};
