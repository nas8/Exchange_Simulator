import './App.css';
import { BidList } from './components/BidList/BidList';
import { Ticker } from './components/Ticker/Ticker';

function App() {
  return (
    <div className="App">
      <div>
        <p>Bid list</p>
        <BidList />
      </div>
      <div>
        <p>Ticker</p>
        <Ticker />
      </div>
    </div>
  );
}

export default App;
