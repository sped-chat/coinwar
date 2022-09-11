import marketReducer from './reducer/market';
import walletReducer from './reducer/wallet';
import gameReducer from './reducer/game';

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

const reducers = combineReducers({
    market: marketReducer,
    wallet: walletReducer,
    game: gameReducer
});

export const store = configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV !== 'production'
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
