import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

/**
 * Render a button.
 * 
 * @param color The color of button if you don't want the corporate color
 * @param to The url to send when click
 */

const Button = (props) => {
    return (
        <Link className="button" style={{backgroundColor: props.color || '#932023'}} to={props.to}>
            {props.children}
        </Link>
    );
}

export default Button;