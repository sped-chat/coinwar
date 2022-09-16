import { ICoinValue } from "../Store/reducer/market";
import { IWalletState } from "../Store/reducer/wallet";

export function calculateMaxBuy(coin: ICoinValue, wallet: IWalletState) {
    return Math.min(available_space(wallet), Math.floor(wallet.cash / coin.value));
}

function available_space(wallet: IWalletState) {
    var available_space = wallet.total_space;

    for (var i in wallet.assets) {
        available_space -= wallet.assets[i];
    }

    return available_space;
}

export function can_buy(coin: ICoinValue, quantity: number, wallet: IWalletState) {
    return available_space(wallet) >= quantity && wallet.cash >= coin.value * quantity;
}

export function can_sell(coin: ICoinValue, quantity: number, wallet: IWalletState) {
    return wallet.assets[coin.name] >= quantity;
}