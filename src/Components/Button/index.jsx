import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Button = (props) => {
    return (
        <Link className="button" style={{backgroundColor: props.color || '#932023'}} to={props.to}>
            {props.children}
        </Link>
    );
}

export default Button;