import React from 'react';
import Listing from '../../Components/Listing';

/**
 * Shows the home (actually, 4 sliders using the Listing component)
 */

const Home = props => {
    return (
        <div>
            <h1>React Movies</h1>
            <h2>Popular movies</h2>
            <Listing type="LIST" query="POPULAR_MOVIES" slide />
            <h2>Popular series</h2>
            <Listing type="LIST" query="POPULAR_SERIES" slide />
            <h2>Family</h2>
            <Listing type="LIST" query="FAMILY" slide />
            <h2>Documentary</h2>
            <Listing type="LIST" query="DOCUMENTARY" slide />
        </div>
    )
}

export default Home;