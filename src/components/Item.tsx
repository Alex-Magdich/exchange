import React from 'react';
import { Button, Card, Checkbox, Dropdown, Input, InputNumber } from 'antd';
import { CloseOutlined, DeleteOutlined, DollarOutlined, DownOutlined, EllipsisOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import SelectCurrency from './SelectCurrency';
import { TItem } from '../types';
import { currencyList, getExchangeValue } from '../helpers';

type TProps = {
    item: TItem;
    onRemove: (id: number) => void;
    onChangeItem: (item: TItem) => void;
    onSelect: (id: number, checked: boolean) => void;
    ids: Array<number>;
};

const Item: React.FC<TProps> = ({ item, onRemove, onChangeItem, onSelect, ids }) => {
    const exchangeCurrencyList = currencyList.filter(currency => currency !== item.currency);
    const [exchangeCurrency, setExchangeCurrency] = React.useState(exchangeCurrencyList[0]);
    const [isOpen, setIsOpen] = React.useState(false);
    const { id, price, currency } = item;
    const [isChecked, setIsChecked] = React.useState(ids.includes(id));

    const handleChangeExchangeCurrency = (value: string) => setExchangeCurrency(value);

    const handleRemove = () => onRemove(id);

    const handleChangePrice = (value: number | null) => onChangeItem({ ...item, price: value || 0 });

    const handleChangeCurrency = (value: string) => onChangeItem({ ...item, currency: value });

    const handleToggleIsOpen = () => setIsOpen(!isOpen);

    const items: MenuProps['items'] = [
        {
            key: '1',
            onClick: handleToggleIsOpen,
            icon: <DollarOutlined/>,
            label: 'Конвертувати',
        },
        {
            key: '2',
            onClick: handleRemove,
            icon: <DeleteOutlined/>,
            label: 'Видалити',
            danger: true,
        },
    ];

    const exchangeValue = getExchangeValue(price, currency, exchangeCurrency);

    const handleCheckboxChange = (e: CheckboxChangeEvent) => {
        const checked = e.target.checked;
        setIsChecked(checked);
        onSelect(id, checked);
    };

    return (
        <div className="item">
            <div className="item-top">
                <Checkbox checked={isChecked} onChange={handleCheckboxChange}/>
                <InputNumber min={0} onChange={handleChangePrice} value={price}/>
                <SelectCurrency onChange={handleChangeCurrency} value={currency}/>
                <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
                    <Button><EllipsisOutlined/></Button>
                </Dropdown>
            </div>
            {isOpen && (
                <div className="item-bottom">
                    <div className="icon"><DownOutlined/></div>
                    <Card>
                        <div className="close" onClick={handleToggleIsOpen}><CloseOutlined/></div>
                        <div className="exchange-item-result">
                            <SelectCurrency
                                data={exchangeCurrencyList}
                                onChange={handleChangeExchangeCurrency}
                                value={exchangeCurrency}
                            />
                            <Input readOnly style={{ width: '120px' }} title={exchangeValue} value={exchangeValue}/>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default Item;
