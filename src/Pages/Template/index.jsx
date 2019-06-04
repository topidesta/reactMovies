import React from 'react';
import './Template.css';

const Template = props => {
    return (
        <div className="content">
            {props.children}
        </div>
    )
}

export default Template;