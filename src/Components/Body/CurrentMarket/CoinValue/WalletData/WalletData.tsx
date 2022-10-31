import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../Store';
import { wallet_borrow, wallet_repay } from '../../../../../Store/reducer/wallet';
import DePayWidgets from '@depay/widgets';
import translate from '../../../../../Store/Translations';
import './WalletData.css';

const WalletData = () => {

    const { debt, assets, cash } = useSelector(
        (root: RootState) => root.wallet
    )

    const [transactionValue, setTransactionValue] = useState(0);

    const dispatch = useDispatch();

    const coinValues = Object.values(assets);
    let displayCoins = false;

    if (coinValues.length) {
        displayCoins = coinValues.reduce((a, b) => a + b) !== 0;
    }


    const openDepay = () => {
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

    const getAssets = () => {
        return Object.keys(assets).map(coinName => {
            const value = assets[coinName];
            return value !== 0 && (
                <div className='row'>
                    <div className="col-6 text-center">
                        {translate('dope-' + coinName)}
                    </div>
                    <div className="col-6 text-center">
                        {value}
                    </div>
                </div>
            )
        })
    }

    const borrow = () => {
        dispatch(wallet_borrow({
            quantity: transactionValue
        }));

        setTransactionValue(0);
    }

    const repay = () => {
        dispatch(wallet_repay({
            quantity: transactionValue
        }))

        setTransactionValue(0);
    }



    return (
        <div className="w-100 row ms-0 buy-sell-container py-3 p-2">
            <div id="deficollapse">
                <button onClick={openDepay}>
                    <div className="defi">
                        <span>USD : </span>
                        <sup>﹩</sup><span className="debt">{cash}</span>
                    </div>
                </button>
                <br />
                <button data-bs-toggle="collapse" data-bs-target="#pawn-shop-collapse">
                    <div className="defi">
                        <span>DEFI LOAN: </span>
                        <sup>﹩</sup><span className="debt">{debt * -1}</span>

                    </div>
                </button>
            </div>
            <div className="xs-stats collpase collapse" id="pawn-shop-collapse">
                <div>
                    <input
                        onChange={(ev) => { setTransactionValue(parseInt(ev.currentTarget.value)) }}
                        value={transactionValue}
                        type="number"
                        pattern="[0-9]*" />
                    <span>
                        <button onClick={borrow} className="land">BORROW</button>
                        <button onClick={repay} className="pay">REPAY</button>
                    </span>
                </div>
            </div>
            {
                displayCoins &&
                <div id="wallet" className='mx-auto w-75'>
                    <div className="row mt-2">
                        <div className="col wallet-header">
                            COIN
                        </div>
                        <div className="col wallet-header">
                            QUANTITY
                        </div>
                    </div>
                    {getAssets()}
                </div>
            }
        </div>
    );
}

export default WalletData;