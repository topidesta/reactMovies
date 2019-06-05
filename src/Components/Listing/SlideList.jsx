import React from 'react';

/**
 * Renders a slider with infinite scroll. It's only called from Listing
 */

const SlideList = props => {

    const moveRight = () => {
        // Move slider content to right
        const element = document.getElementById(props.query);
        smooth(element, 210);
    }

    const moveLeft = () => {
        // Move slider content to left
        const element = document.getElementById(props.query);
        smooth(element, -210);
    }

    const smooth = (element, pixels) => {
        // Makes the component moving smooth.
        const eachMove = Math.round(pixels / 10);
        let moved = 0;
        const timer = setInterval(() => {
            element.scrollBy(eachMove, 0);
            moved += eachMove;
            if (Math.abs(moved) >= Math.abs(pixels)) clearInterval(timer);
        }, 10);
    }

    const scrolled = () => {
        // Based on component size and content loaded, if it's near to end, it renders more() using the function passed by parent Listing
        const element = document.getElementById(props.query);
        const scrolled = element.scrollLeft;
        const contentWidth = element.scrollWidth;
        const viewWidth = element.clientWidth;
        if (viewWidth + scrolled > contentWidth - Math.round(viewWidth / 2)) props.more();
    }

    return (
        <div className="scroller">
            <div className="moving" onClick={moveLeft}><p>&lt;</p></div>
            <div className="slider" id={props.query} onScroll={scrolled}>{props.list}</div>
            <div className="moving" onClick={moveRight}><p>&gt;</p></div>
        </div>
    );
}

export default SlideList;