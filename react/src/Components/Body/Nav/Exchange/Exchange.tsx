import React from 'react'
import Exchanges, { IExchange } from '../../../../Store/Exchanges';
import translate from '../../../../Store/Translations';
import './Exchange.css';
import { useDispatch } from 'react-redux';
import { refreshMarket } from '../../../../Store/reducer/market';
import { selectExchange } from '../../../../Store/reducer/game';

const Exchange = () => {

    const dispatch = useDispatch();

    const changeExchange = (exchange: IExchange) => {
        dispatch(refreshMarket(exchange));
        dispatch(selectExchange({ exchange }));

    }

    const generateListOfExchanges = () => {
        return Exchanges.map((exchange, i) => {
            return (
                <a
                    onClick={() => { changeExchange(exchange) }}
                    key={i}
                    className="trans"
                    data-bs-dismiss="offcanvas"
                    data-dex={i}
                >
                    {translate('dex-' + exchange.name)}
                </a>
            )
        })
    }

    return (
        <div className='exchanges text-center'>
            {generateListOfExchanges()}
        </div>
    );
}

export default Exchange;

