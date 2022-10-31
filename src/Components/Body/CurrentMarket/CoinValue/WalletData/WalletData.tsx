import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../Store';
import { wallet_borrow, wallet_repay } from '../../../../../Store/reducer/wallet';
import translate from '../../../../../Store/Translations';
import './WalletData.css';

const WalletData = () => {

    const { debt, assets } = useSelector(
        (root: RootState) => root.wallet
    )

    const [transactionValue, setTransactionValue] = useState(0);

    const dispatch = useDispatch();

    const coinValues = Object.values(assets);
    let displayCoins = false;

    if (coinValues.length) {
        displayCoins = coinValues.reduce((a, b) => a + b) !== 0;
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
                <button data-bs-toggle="collapse" data-bs-target="#pawn-shop-collapse">
                    <div className="defi">
                        <span>DEFI LOAN: </span>
                        <sup>﹩</sup><span className="debt">- {debt}</span>

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