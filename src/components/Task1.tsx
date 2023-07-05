import React from 'react';

const items = [
    'First',
    'Second',
    'Some third text',
];

const Task1 = () => (
    <nav>
        {items.map(item => (
            <div>{item}</div>
        ))}
    </nav>
);

export default Task1;
