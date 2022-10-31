import React from 'react'
import Exchanges, { IExchange } from '../../../../Store/Exchanges';
import translate from '../../../../Store/Translations';
import './Exchange.css';
import { useDispatch } from 'react-redux';
import { refreshMarket } from '../../../../Store/reducer/market';
import { selectExchange } from '../../../../Store/reducer/game';

const Exchange = () => {

    const dispatch = useDispatch();

    const collapseExchange = () => {
        document.getElementById('babybear')?.classList.remove('show');
        document.getElementById('babybear')?.classList.add('collapse');
    }

    document.addEventListener('click', (ev: any) => {
        let isShown = document.getElementById('babybear')?.classList.contains('show');
        if (ev.currentTarget.id !== 'babybear' && isShown) {
            collapseExchange();
        }
    })

    const changeExchange = (exchange: IExchange) => {
        dispatch(refreshMarket(exchange));
        dispatch(selectExchange({ exchange }));

        collapseExchange();
    }

    const generateListOfExchanges = () => {
        return Exchanges.map((exchange, i) => {
            return (
                <a
                    onClick={() => { changeExchange(exchange) }}
                    key={i}
                    className="w-100"
                    data-bs-dismiss="offcanvas"
                    data-dex={i}
                >
                    {translate('dex-' + exchange.name)}
                </a>
            )
        })
    }

    return (
        <div className='w-100 nav-exchanges d-flex flex-wrap'>
            {generateListOfExchanges()}
        </div>
    );
}

export default Exchange;

