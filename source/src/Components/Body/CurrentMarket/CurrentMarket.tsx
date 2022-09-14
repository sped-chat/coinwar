import React from 'react'
import { RootState } from '../../../Store';
import CoinValue from './CoinValue/CoinValue';
import './CurrentMarket.css';
import { useSelector } from 'react-redux'

function CurrentMarket() {

    const { market } = useSelector(
        (root: RootState) => root.market
    );

    const generateCoins = () => {
        return market.map((coin, i) => {
            return (
                <CoinValue
                    key={i + 1}
                    coin={coin}
                    isUSD={false}
                />
            )
        })
    }

    let usdCoin = {
        name: 'usd',
        value: 1
    }

    // console.log("Coins1", coins)

    return (
        <div id="market" className="coins w-100">
            <CoinValue
                key={-1}
                coin={usdCoin}
                isUSD={true}
            />
            {generateCoins()}
        </div>
    );
}

export default CurrentMarket;