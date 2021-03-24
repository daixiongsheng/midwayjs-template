import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { login } from './apis/lambda';

function App() {
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        const userName = '123';
        const password = '123';
        const response = await login(userName, password);
        if (response) {
            setMessage(response.msg);
            console.log(response);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Message from ./apis/lambda: {message}</p>
                <p>
                    <button onClick={handleLogin}>
                        Send message to backend
                    </button>
                </p>
            </header>
        </div>
    );
}

export default App;
