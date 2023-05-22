import { useState, useEffect } from 'react';

export default function demoModel() {
    const [num, setNum] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setNum(10);
        }, 1000);
    }, []);

    const setNumAsync = () => {
        setTimeout(() => {
            setNum(num + 1);
        }, 1000);
    };

    return {
        num,
        setNum,
        setNumAsync
    };
};