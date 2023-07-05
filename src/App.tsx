import React from 'react';
import './App.scss';
import { Button, Card, InputNumber, List } from 'antd';
import { data } from './constants';
import Item from './components/Item';
import SelectCurrency from './components/SelectCurrency';
import { TItem } from './types';
import { currencyList } from './helpers';
import ResultComponent from './components/ResultComponent';
import Task1 from './components/Task1';

const App = () => {
    const defaultCurrency = currencyList[0];
    const [state, setState] = React.useState(data);
    const [inputValue, setInputValue] = React.useState(0);
    const [currency, setCurrency] = React.useState(defaultCurrency);
    const [ids, setIds] = React.useState([] as Array<number>);

    const handleSelectId = (id: number, checked: boolean) => {
        if (checked) {
            setIds([...ids, id]);
        } else {
            setIds(ids.filter(_id => _id !== id));
        }
    };

    const handleSelectCurrency = (value: string) => {
        setCurrency(value);
    };

    const handleInputChange = (value: number | null) => {
        setInputValue(value || 0);
    };

    const handleDeleteItem = (id: number) => {
        setState(state.filter(item => item.id !== id));
        setIds(ids.filter(_id => _id !== id));
    };

    const handleAddItem = () => {
        setState([...state, {
            id: Date.now(),
            price: Number(inputValue),
            currency,
        }]);
        setInputValue(0);
        setCurrency(defaultCurrency);
    };

    const handleChangeItem = (currentItem: TItem) => {
        setState(state.map(item => (item.id === currentItem.id ? {
            ...item,
            ...currentItem,
        } : item)));
    };

    return (
        <div className="App">
            <Task1/>
            <Card bordered={false} className="card" title="Додати новий рахунок">
                <InputNumber min={0} onChange={handleInputChange} value={inputValue}/>
                <SelectCurrency onChange={handleSelectCurrency} value={currency}/>
                <Button disabled={!inputValue} onClick={handleAddItem} type="primary">Додати</Button>
            </Card>
            <Card bordered={false} className="card" title="Ваші рахунки">
                <List
                    bordered
                    dataSource={state}
                    renderItem={(item) => (
                        <List.Item>
                            <Item
                                key={item.id}
                                ids={ids}
                                item={item}
                                onChangeItem={handleChangeItem}
                                onRemove={handleDeleteItem}
                                onSelect={handleSelectId}
                            />
                        </List.Item>
                    )}
                />
            </Card>
            {!!ids.length && <ResultComponent data={state} ids={ids}/>}
        </div>
    );
};

export default App;
