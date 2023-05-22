import React, { useState } from "react";
import { Button } from 'antd';

const ButtonAgain = function ButtonAgain(props) {
    let options = { ...props },
        { children, onClick: handle } = options;
    delete options.children;

    /* Loading */
    let [loading, setLoading] = useState(false);
    const clickHandle = async () => {
        setLoading(true);
        try {
            await handle();
        } catch (_) { }
        setLoading(false);
    };
    if (handle) options.onClick = clickHandle;

    return <Button {...options} loading={loading}>
        {children}
    </Button>;
};
export default ButtonAgain;