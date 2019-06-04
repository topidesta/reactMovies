import React from 'react';
import Listing from '../../Components/Listing';
import './Search.css';

class Search extends React.Component {

    state = {
        search: ''
    }

    search = value => {
        this.setState({ search: value });
    }

    render() {
        return (
            <div>
                <div className="inputBox">
                    <input type="text" placeholder="search" value={this.state.search} onChange={(e) => this.search(e.target.value)} />
                </div>
                <Listing type="SEARCH" query={this.state.search} />
            </div>
        );
    }
}

export default Search;