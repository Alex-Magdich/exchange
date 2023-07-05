import React from 'react';
import { Select } from 'antd';
import { currencyList } from '../helpers';

type TProps = {
    value: string;
    onChange: (value: string) => void;
    data?: Array<string>;
};

const SelectCurrency: React.FC<TProps> = ({ value, onChange, data = currencyList }) => {
    const options = data.map(item => ({
        value: item, label: item,
    }));

    return (
        <Select
            onChange={onChange}
            options={options}
            style={{ width: 100 }}
            value={value}
        />
    );
};

export default SelectCurrency;
