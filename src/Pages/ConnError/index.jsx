import React from 'react';
import Button from '../../Components/Button';
import './ConnError.css';

const Error = props => {
    return (
        <div className="noconnection">
            <h1>Ups! We can't connect with server...</h1>
            <p>Maybe we are working on it and it will be ready soon. Or maybe you have lost your Internet connection...</p>
            <p><Button to='/'>Retry</Button></p>
        </div>
    );
}

export default Error;