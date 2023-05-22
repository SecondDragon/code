import React from 'react';
import ReactDOM from 'react-dom/client';
import DemoOne from '@/views/DemoOne';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <DemoOne title="REACT好好玩哦" x={10}>
            <span>哈哈哈</span>
            <span>呵呵呵</span>
        </DemoOne>

        <DemoOne title="哈哈哈哈哈" />
    </>
);