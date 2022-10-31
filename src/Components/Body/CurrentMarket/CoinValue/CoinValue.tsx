import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Store';
import { ICoinValue } from '../../../../Store/reducer/market';
import translate from '../../../../Store/Translations';
import CoinTransaction from './CoinTransaction/CoinTransaction';
import './CoinValue.css';
import AllCoins from '../../../../Store/AllCoins';
import WalletData from './WalletData/WalletData';

interface ICoinValueParam {
    coin: ICoinValue,
    isUSD?: boolean
}

const CoinValue = ({ coin, isUSD }: ICoinValueParam) => {
    const { name, value } = coin;
    const formatter = Intl.NumberFormat('en', { notation: 'compact' })


    const coinAve = AllCoins.find(coin => coin.name === name);

    const { assets, cash } = useSelector(
        (root: RootState) => root.wallet
    )

    let coinAsset = assets[coin.name] || 0;
    const collapseId = 'transaction-' + coin.name;

    if (isUSD) {
        coinAsset = cash
    }

    return (
        <div className='accordion-item'>
            <div
                data-bs-target={'#' + collapseId}
                data-bs-toggle="collapse"
                className={"row coin-row collapsed " + (isUSD ? 'coin-header' : '')}
            >
                <div className="col">
                    <span>
                        <button data-bs-toggle="collapse"
                            data-bs-target={'#' + collapseId}>
                            <span>
                                {translate('dope-' + name)}
                                {
                                    coinAsset !== 0 && <span
                                        className="value-badge position-absolute rounded-pill translate-middle badge"
                                    >
                                        {formatter.format(coinAsset)}
                                    </span>
                                }
                            </span>
                        </button>
                    </span>
                </div>
                <div className="col xs-stats">
                    <button>
                        <span className="cash position-relative">
                            <sup className='position-absolute translate-middle' style={{
                                marginTop: '1.2vh',
                                marginLeft: '-0.6vh'
                            }}>﹩</sup>
                            {isUSD ? '1' : coinAve?.average}
                        </span>
                    </button>
                </div>
                <div className='col'>
                    <button>

                        <span className="cash position-relative">
                            <sup className='position-absolute translate-middle' style={{
                                marginTop: '1.2vh',
                                marginLeft: '-0.6vh'
                            }}>﹩</sup>
                            {value}
                        </span>
                    </button>
                </div>
            </div>
            <div
                data-bs-parent="#market"
                className="accordion-collapse coin-transaction collapse shadow-lg"
                id={collapseId}
            >
                {
                    !isUSD ?
                        <CoinTransaction
                            coin={coin}
                        />
                        :
                        <WalletData />
                }
            </div>
        </div>
    )
}

export default CoinValue;