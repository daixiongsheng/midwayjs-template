import React, { useCallback, useContext } from 'react';
import { SProps, IContext } from 'ssr-types';
import { login } from './fetch';
export default (props: SProps) => {
    const { state, dispatch } = useContext<IContext<any>>(window.STORE_CONTEXT);
    const onClick = useCallback(() => {
        console.log(state, props);

        login('index');
    }, []);
    return <button onClick={onClick}>index</button>;
};
