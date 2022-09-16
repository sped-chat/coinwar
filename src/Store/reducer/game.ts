import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Exchanges, { IExchange } from '../Exchanges';
import { refreshMarket } from './market';

export interface IGameState {
    year: number,
    end: number,
    bank_deposit: number,
    stone_level: number,
    currentExchage: IExchange
}

const initialState: IGameState = {
    year: 2022,
    end: 9999,
    bank_deposit: 100000,
    stone_level: 0,
    currentExchage: Exchanges[0]
};

export const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        selectExchange: (state, data: PayloadAction<{ exchange: IExchange, init?: boolean }>) => {
            if (!data.payload.init) {
                state.year += 1;
            } else {
                state.year = 2022
            }

            state.currentExchage = data.payload.exchange;

            refreshMarket(state.currentExchage);
        }
    }
})

export const { selectExchange } = gameSlice.actions

export default gameSlice.reducer