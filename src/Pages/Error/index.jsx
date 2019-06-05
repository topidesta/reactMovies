import React from 'react';
import Button from '../../Components/Button';
import './Error.css';

/**
 * Shows an error message
 */

const Error = props => {
    return (
        <div className="error">
            <h1>{props.data}</h1>
            <p><Button to='/'>Home</Button></p>
        </div>
    );
}

export default Error;