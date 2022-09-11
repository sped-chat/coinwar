import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Store';
import { ICoinValue } from '../../../../Store/reducer/market';
import translate from '../../../../Store/Translations';
import CoinTransaction from './CoinTransaction/CoinTransaction';
import './CoinValue.css'

interface ICoinValueParam {
    coin: ICoinValue,
    isUSD?: boolean
}

const CoinValue = ({ coin, isUSD }: ICoinValueParam) => {
    const { name, value } = coin;

    const { assets, cash } = useSelector(
        (root: RootState) => root.wallet
    )

    let coinAsset = assets[coin.name] || 0;
    const collapseId = 'transaction-' + coin.name;

    if (isUSD) {
        coinAsset = cash
    }

    return (
        <>
            <div
                data-bs-target={'#' + collapseId}
                data-bs-toggle="collapse"
                className={"row coin-row " + (isUSD ? 'coin-header' : '')}
            >
                <div className="col">
                    <label>
                        <span>
                            <button id="depay-pay" className="depayland" data-bs-toggle="collapse"
                                data-bs-target={'#' + collapseId}>
                                <span>{translate('dope-' + name)}</span>
                            </button>
                        </span>
                    </label>
                </div>
                <div className="col xs-stats">
                    {isUSD && <sup>﹩</sup>}
                    <span className="cash">
                        {coinAsset}
                    </span>
                </div>
                <div className='col'>
                    <sup>﹩</sup>
                    {value}
                </div>
            </div>
            {
                !isUSD && <div className="collapse-transaction collapse shadow-lg" id={collapseId}>
                    <CoinTransaction
                        coin={coin}
                    />
                </div>
            }
        </>
    )
}

export default CoinValue;