import { TCurrencyPairs, TItem } from './types';
import { currencyPairs } from './constants';

export const getUniqueCryptoAbbreviations = (currenciesPairs: TCurrencyPairs) => {
    const pairs = Object.keys(currenciesPairs);

    return Array.from(
        new Set(pairs.flatMap(pair => pair.split('-'))),
    );
};

export const currencyList = getUniqueCryptoAbbreviations(currencyPairs);

export const getExchangeValue = (price: number, from: string, to: string) => {
    const pair = `${from}-${to}`;

    if (from === to) {
        return 'Валюти однакові, оберіть іншу цільову валюту';
    }

    return (price * currencyPairs[pair]).toFixed(4);
};

export const calculateTotalPrice = (itemIds: Array<number>, targetCurrency: string, data: Array<TItem>) => (
    itemIds.reduce((accumulator, itemId) => {
        const item = data.find(item => item.id === itemId)!;

        if (item.currency === targetCurrency) {
            return accumulator + item.price;
        }

        const currencyPair = currencyPairs[`${item.currency}-${targetCurrency}`];
        const convertedPrice = item.price * currencyPair;

        return accumulator + convertedPrice;
    }, 0).toFixed(4)
);
