import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../Store";
import { ICoinValue } from "../../../../../Store/reducer/market";
import { wallet_buy, wallet_sell } from "../../../../../Store/reducer/wallet";
import { calculateMaxBuy } from "../../../../../utils";
import './CoinTransaction.css';

interface ICoinTransactionProps {
    coin: ICoinValue
}

const CoinTransaction = ({ coin }: ICoinTransactionProps) => {

    const wallet = useSelector(
        (root: RootState) => root.wallet
    )

    const [value, setValue] = useState(0);

    const dispatch = useDispatch();

    const maxBuy = () => {
        setValue(calculateMaxBuy(coin, wallet));
    }

    const maxSell = () => {
        const currentAsset = wallet.assets[coin.name] || 0;
        setValue(currentAsset)
    }

    const buy = () => {
        dispatch(wallet_buy({
            coin: coin,
            quantity: value
        }))

        setValue(0);
    }

    const sell = () => {
        dispatch(wallet_sell({
            coin: coin,
            quantity: value
        }))

        setValue(0);
    }

    return (
        <>
            <div className="w-100 row ms-0 buy-sell-container py-3 p-2">
                <div className="col-6 d-flex">
                    <input
                        className="my-auto ms-auto"
                        onChange={(ev) => { setValue(parseInt(ev.currentTarget.value)) }}
                        type="number"
                        pattern="[0-9]*"
                        value={value}
                    />

                </div>
                <span className="col d-flex">
                    <div className="w-100 my-auto ms-4 text-start">
                        <div className="w-100">
                            <button onClick={buy} data-bs-target="" type="button" data-bs-toggle="collapse">
                                BUY
                            </button>
                            <button onClick={maxBuy} type="button">
                                MAX
                            </button>
                        </div>
                        <div className="w-100">
                            <button onClick={sell} data-bs-target="" type="button" data-bs-toggle="collapse">
                                SELL
                            </button>
                            <button onClick={maxSell} type="button">
                                MAX
                            </button>
                        </div>
                    </div>
                </span>
            </div>
        </>
    );
}

export default CoinTransaction;