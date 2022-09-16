import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Store';
import { ICoinValue } from '../../../../Store/reducer/market';
import translate from '../../../../Store/Translations';
import CoinTransaction from './CoinTransaction/CoinTransaction';
import './CoinValue.css';
import DePayWidgets from '@depay/widgets';

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

    const openDepay = () => {
        if (isUSD) {
            DePayWidgets.Payment({
                integration: '7430a68d-ca9d-4a6d-8be6-d40d0dd0463b',
                accept: [
                    {
                        blockchain: 'ethereum',
                        token: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
                        receiver: '0xa9af33023e47d4f6ac3dc222573d61514e067436'
                    }, {
                        blockchain: 'polygon',
                        token: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
                        receiver: '0xa9af33023e47d4f6ac3dc222573d61514e067436'
                    }, {
                        blockchain: 'ethereum',
                        token: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
                        receiver: '0xa9af33023e47d4f6ac3dc222573d61514e067436'
                    }, {
                        blockchain: 'polygon',
                        token: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
                        receiver: '0xa9af33023e47d4f6ac3dc222573d61514e067436'
                    }, {
                        blockchain: 'bsc',
                        token: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
                        receiver: '0xa9af33023e47d4f6ac3dc222573d61514e067436'
                    }, {
                        blockchain: 'ethereum',
                        token: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
                        receiver: '0xa9af33023e47d4f6ac3dc222573d61514e067436'
                    }, {
                        blockchain: 'polygon',
                        token: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
                        receiver: '0xa9af33023e47d4f6ac3dc222573d61514e067436'
                    }, {
                        blockchain: 'bsc',
                        token: '0x55d398326f99059fF775485246999027B3197955',
                        receiver: '0xa9af33023e47d4f6ac3dc222573d61514e067436'
                    }, {
                        blockchain: 'bsc',
                        token: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
                        receiver: '0xa9af33023e47d4f6ac3dc222573d61514e067436'
                    }, {
                        blockchain: 'polygon',
                        token: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
                        receiver: '0xa9af33023e47d4f6ac3dc222573d61514e067436'
                    }, {
                        blockchain: 'ethereum',
                        token: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
                        receiver: '0xa9af33023e47d4f6ac3dc222573d61514e067436'
                    }, {
                        blockchain: 'polygon',
                        token: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
                        receiver: '0xa9af33023e47d4f6ac3dc222573d61514e067436'
                    }
                ]
            })
        }
    }

    return (
        <>
            <div
                onClick={openDepay}
                data-bs-target={'#' + collapseId}
                data-bs-toggle="collapse"
                className={"row coin-row " + (isUSD ? 'coin-header' : '')}
            >
                <div className="col">
                    <span>
                        <button data-bs-toggle="collapse"
                            data-bs-target={'#' + collapseId}>
                            <span>{translate('dope-' + name)}</span>
                        </button>
                    </span>
                </div>
                <div className="col xs-stats">
                    <button>
                        {isUSD && <sup>﹩</sup>}
                        <span className="cash">
                            {coinAsset}
                        </span>
                    </button>
                </div>
                <div className='col'>
                    <button>
                        <sup>﹩</sup>
                        {value}
                    </button>
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