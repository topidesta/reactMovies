import React from 'react';
import Button from '../../Components/Button';
import './Error.css';

/**
 * Shows an error message
 * Optional props:
 * - data: general text to show
 * - to: url to go on button click
 * - text: texto to show at button.
 */

const Error = props => {
    return (
        <div className="error">
            <h1>{props.data}</h1>
            <p><Button to={props.to || '/'}>{props.text || 'Home'}</Button></p>
        </div>
    );
}

export default Error;