import React from 'react';
import { Link } from 'react-router-dom';
import './Template.css';

/**
 * The html template
 */

const Template = props => {
    return (
        <div>
            <header>
                <Link className="option" to="/">Home</Link>
                <div className="blank"></div>
                <Link className="option" to="/search">Search</Link>
            </header>
            <div className="content">
                {props.children}
            </div>
        </div>
    )
}

export default Template;