import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AllCoins from '../AllCoins';
import { IExchange } from '../Exchanges';

export interface ICoinValue {
    name: string,
    value: number
}

const initialState: {
    market: ICoinValue[]
} = { market: [] };

function rand(min_rand: number, max_rand: number) {
    return min_rand + (Math.random() * 10000 % (max_rand - min_rand));
}

function shuffle(array: any[]) {
    var shuffled = [], index;
    for (var i = 0; i < array.length; i++) {
        while ((index = Math.round(rand(0, array.length))) in shuffled);
        shuffled[index] = array[i];
    }
    return shuffled;
}

export const marketSlice = createSlice({
    name: 'market',
    initialState: initialState,
    reducers: {
        refreshMarket: (state, data: PayloadAction<IExchange>) => {
            let available_coins: boolean[] = [];
            let prices: number[] = [];
            var number_of_coins = Math.floor(rand(data.payload.min_coins, data.payload.max_coins));
            for (let i = 0; i < number_of_coins; i++) {
                available_coins[i] = true;
            }
            for (let i = number_of_coins; i < AllCoins.length; i++) {
                available_coins[i] = false;
            }
            available_coins = shuffle(available_coins);
            for (var coin in AllCoins) {
                if (available_coins[parseInt(coin)]) {
                    var minimum_price = AllCoins[coin].minimum_price;
                    var maximum_price = AllCoins[coin].maximum_price;

                    prices[coin] = Math.round(rand(minimum_price, maximum_price));
                }
            }

            let coinValues: ICoinValue[] = [];

            available_coins.forEach((isAvailable, i) => {
                if (isAvailable && AllCoins[i]) {
                    coinValues.push({
                        name: AllCoins[i].name,
                        value: prices[i]
                    })
                }
            })

            state.market = coinValues;
        }
    }
})

export const { refreshMarket } = marketSlice.actions;

export default marketSlice.reducer