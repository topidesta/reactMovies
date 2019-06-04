import React from 'react';

const Template = props => {
    return (
        <div>
            <h1>React Movies</h1>
            {props.children}
        </div>
    )
}

export default Template;