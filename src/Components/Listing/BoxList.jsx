import React from 'react';

class SlideList extends React.Component {

    scrolled = () => {
        const bodyElement = document.body;
        const windowHeight = window.innerHeight;
        const bodyScrollHeight = window.scrollY;
        const bodyHeight = bodyElement.clientHeight;
        if (windowHeight + bodyScrollHeight > bodyHeight - Math.round(windowHeight / 2)) this.props.more();
    }

    componentDidMount(){
        window.addEventListener('scroll', this.scrolled);
    }

    componentDidUpdate(){
        this.scrolled();
    }

    render(){
        return (
            <div className="box">{this.props.list}</div>
        );
    }
}

export default SlideList;