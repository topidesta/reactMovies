import React from 'react';
import { Link, withRouter } from "react-router-dom";
import SlideList from './SlideList';
import BoxList from './BoxList';
import API from '../API/request';
import './Listing.css';

/**
 * Renders a box list or slider list.
 * 
 * Params:
 * @param {*} type 'LIST' / 'SEARCH' / 'DETAIL'
 * @param {*} query search query for SEARCH, Film ID for DETAIL, or for LIST: 'POPULAR_MOVIES' / 'POPULAR_SERIES' / 'FAMILY' / 'DOCUMENTARY'
 * @param slide (if its indicated, it shows a horizontal slider, if not, it renders a box). See use at page Home.
 */

class Listing extends React.Component {
    state = {
        list: []
    };
    page = 0;
    showedAll = false;
    loading = false;
    query = this.props.query;

    loaded = data => {
        // When data is received.
        this.loading = false;
        let formatedData = data.results ? this.formatFilm(data.results) : [];
        if (formatedData.length === 0) this.showedAll = true;
        if (this.page > 1) formatedData = [...this.state.list, formatedData];
        this.setState({ list: formatedData });
    };

    fail = error => {
        // When error while data receiving.
        this.props.history.push('/lost');
    };

    more = () => {
        // Get more data. It's passed to child components BoxList and SlideList.
        if (this.showedAll || this.loading) return;
        this.loading = true;
        this.page++;
        API.request(this.props.type, this.props.query, this.page, this.loaded, this.fail);
    };

    formatFilm = data => {
        // Formats the data received to a html way.
        if (!data) return [];
        return data.map((item, index) => {
            const backgroundImage = 'url(' + API.poster(item.poster_path, 200) + ')';
            const title = item.poster_path ? '' : <p>{item.title}</p>
            return <Link to={'/movie/'+item.id} key={index}><div className="item" style={{ backgroundImage }}>{title}</div></Link>
        });
    }

    componentDidUpdate() {
        // If there is an update because the query has changed, something must be reset.
        if (this.query !== this.props.query) {
            this.query = this.props.query;
            this.page = 0;
            this.showedAll = false;
            this.more();
        }
    }

    componentDidMount() {
        // To load the first set of data
        this.more();
    }

    render() {
        const listing = this.props.slide
            ? <SlideList list={this.state.list} query={this.props.query} more={this.more} />
            : <BoxList list={this.state.list} more={this.more} />;
        return (
            <div>
                {listing}
            </div>

        )
    }
}

export default withRouter(Listing);