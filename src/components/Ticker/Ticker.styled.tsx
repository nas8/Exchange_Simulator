import styled from 'styled-components';

export const StyledTicker = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
  max-height: 500px;
  gap: 10px;
  padding: 10px;
  border: solid 1px black;
  border-radius: 10px;
  box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.4);
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;
export const ControlWrapper = styled.div`
  display: flex;
  max-width: 70px;
  overflow: hidden;
  flex-direction: column;

  align-items: center;

  gap: 10px;
`;

export const SellButton = styled.button`
  width: 60px;
  height: 25px;
  background-color: rgb(255, 102, 102, 0.5);
  border-radius: 5px;
  transition: background-color 0.2s linear;

  cursor: pointer;

  :hover {
    background-color: #eb6d6d;
  }
`;

export const BuyButton = styled.button`
  width: 60px;
  height: 25px;
  background-color: rgb(159, 255, 128, 0.5);
  border-radius: 5px;
  transition: background-color 0.2s linear;

  cursor: pointer;

  :hover {
    background-color: #56da65;
  }
`;
