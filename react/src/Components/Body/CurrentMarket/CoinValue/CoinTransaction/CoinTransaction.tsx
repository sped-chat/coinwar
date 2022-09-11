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

    const [buyValue, setBuyValue] = useState(0);
    const [sellValue, setSellValue] = useState(0);

    const { year } = useSelector(
        (root: RootState) => root.game
    );

    const dispatch = useDispatch();

    const currentYear = year;

    const maxBuy = () => {
        setBuyValue(calculateMaxBuy(coin, wallet));
    }

    const maxSell = () => {
        const currentAsset = wallet.assets[coin.name] || 0;
        setSellValue(currentAsset)
    }

    const buy = () => {
        dispatch(wallet_buy({
            coin: coin,
            quantity: buyValue
        }))

        setBuyValue(0);
        setSellValue(0);
    }

    const sell = () => {
        dispatch(wallet_sell({
            coin: coin,
            quantity: sellValue
        }))

        setBuyValue(0);
        setSellValue(0);
    }

    return (
        <>
            <div className="w-100 buy-sell-container">
                <input onChange={(ev) => { setBuyValue(parseInt(ev.currentTarget.value)) }} type="number" pattern="[0-9]*" value={buyValue} />
                <span>
                    <button onClick={buy} data-bs-target="" type="button" data-bs-toggle="collapse">
                        BUY
                    </button>
                    <button onClick={maxBuy} type="button">
                        MAX
                    </button>
                </span>
            </div>
            <div className="w-100 buy-sell-container">
                <input onChange={(ev) => { setSellValue(parseInt(ev.currentTarget.value)) }} type="number" pattern="[0-9]*" value={sellValue} />
                <span>
                    <button onClick={sell} data-bs-target="" type="button" data-bs-toggle="collapse">
                        SELL
                    </button>
                    <button onClick={maxSell} type="button">
                        MAX
                    </button>
                    <br />
                    <br />
                    <div>
                        <a data-bs-toggle="offcanvas" href="#prices" aria-controls="prices">
                            <span>{currentYear}</span>&nbsp;
                            MARKET AVERAGES
                        </a>
                    </div>
                    <br />
                </span>
            </div>
        </>
    );
}

export default CoinTransaction;