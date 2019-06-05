import React from 'react';

/**
 * Renders a list with infinite scroll. It's only called from Listing
 */

class BoxList extends React.Component {

    scrolled = () => {
        // Based on page size and content loaded, if it's near to end, it renders more() using the function passed by parent Listing
        const bodyElement = document.body;
        const windowHeight = window.innerHeight;
        const bodyScrollHeight = window.scrollY;
        const bodyHeight = bodyElement.clientHeight;
        if (windowHeight + bodyScrollHeight > bodyHeight - Math.round(windowHeight / 2)) this.props.more();
    }
    
    componentDidUpdate(){
        this.scrolled();
    }

    componentDidMount(){
        window.addEventListener('scroll', this.scrolled);
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.scrolled);
    }

    render(){
        return (
            <div className="box">{this.props.list}</div>
        );
    }
}

export default BoxList;