import React from 'react';
import Button from '../../Components/Button';
import './Error404.css';

const Error404 = () => {
    return (
        <div className="error404">
            <h1>Ups! We don't find that...</h1>
            <p>Maybe we are working on it and it will be ready soon.</p>
            <p><Button to="/">Home</Button></p>
        </div>
    );
}


export default Error404;