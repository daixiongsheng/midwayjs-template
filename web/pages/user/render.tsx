import React, { useCallback, useContext } from 'react';
import { SProps, IContext } from 'ssr-types';
import { login } from './fetch';
export default (props: SProps) => {
    const { state, dispatch } = useContext<IContext<any>>(window.STORE_CONTEXT);
    const onLogin = useCallback(() => {
        console.log(state);
        login('user');
    }, []);

    return <button onClick={onLogin}>1111111</button>;
};
