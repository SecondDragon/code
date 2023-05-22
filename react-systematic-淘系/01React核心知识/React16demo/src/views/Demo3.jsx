import React, { useState } from "react";
import { flushSync } from 'react-dom';

const Demo = function Demo() {
    console.log('RENDER渲染');
    let [x, setX] = useState(10),
        [y, setY] = useState(20),
        [z, setZ] = useState(30);

    const handle = () => {
        /* setX(x + 1);
        setY(y + 1);
        setZ(z + 1); */

        /* setTimeout(() => {
            setX(x + 1);
            setY(y + 1);
            setZ(z + 1);
        }, 1000); */

        flushSync(() => {
            setX(x + 1);
            setY(y + 1);
        });
        setZ(z + 1);
    };
    return <div className="demo">
        <span className="num">x:{x}</span>
        <span className="num">y:{y}</span>
        <span className="num">z:{z}</span>
        <button onClick={handle}>
            新增
        </button>
    </div>;
};

export default Demo;