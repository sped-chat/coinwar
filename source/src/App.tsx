import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import './App.css';
import Body from './Components/Body/Body';
import Footer from './Components/Footer/Footer';
import { useDispatch } from 'react-redux'
import Exchanges from './Store/Exchanges';
import { selectExchange } from './Store/reducer/game';
import { refreshMarket } from './Store/reducer/market';
import { useEffect } from 'react';
import OffCanvas from './Components/OffCanvas/OffCanvas';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshMarket(Exchanges[0]));
    dispatch(selectExchange({ exchange: Exchanges[0], init: true }));
  })


  return (
    <div className="container bg-323234 min-vh-100 position-relative">
      <OffCanvas />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
