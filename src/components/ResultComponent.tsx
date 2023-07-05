import React from 'react';
import { Card } from 'antd';
import SelectCurrency from './SelectCurrency';
import { TItem } from '../types';
import { calculateTotalPrice, currencyList } from '../helpers';

type TProps = {
    ids: Array<number>;
    data: Array<TItem>;
};

const ResultComponent: React.FC<TProps> = ({ ids, data }) => {
    const [totalCurrency, setTotalCurrency] = React.useState(currencyList[0]);
    const handleChangeTotalCurrency = (value: string) => setTotalCurrency(value);

    return (
        <Card className="result">
            <p>Конвертувати обрані рахунки у </p>
            <SelectCurrency onChange={handleChangeTotalCurrency} value={totalCurrency}/>
            <p>{calculateTotalPrice(ids, totalCurrency, data)}</p>
        </Card>
    );
};

export default ResultComponent;
