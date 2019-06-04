import React from 'react';
import { withRouter } from "react-router-dom";
import SlideList from './SlideList';
import BoxList from './BoxList';
import API from '../API/request';
import './Listing.css';

class Listing extends React.Component {
    state = {
        list: [],
        message: ''
    };
    page = 0;
    showedAll = false;
    loading = false;
    query = this.props.query;

    loaded = data => {
        this.endLoading();
        if (data.results.length === 0) return this.showedAll = true;
        let formatedData = this.formatFilm(data.results);
        if (this.page > 1) formatedData = [...this.state.list, formatedData];
        this.setState({ list: formatedData });
    };

    fail = error => {
        console.log(error)
        this.props.history.push('/lost');
    };

    more = () => {
        if (this.showedAll || this.loading) return;
        if (this.props.type === 'SEARCH' && !this.props.query) {
            if (this.state.list.length > 0) this.setState({ list: [] });
            return;
        };
        this.startLoading();
        this.page++;
        API.request(this.props.type, this.props.query, this.page, this.loaded, this.fail);
    };

    startLoading = () => {
        this.loading = true;
    }

    endLoading = () => {
        this.loading = false;
    }

    formatFilm = data => {
        if (!data) return [];
        return data.map((item, index) => {
            const backgroundImage = 'url(' + API.poster(item.poster_path, 200) + ')';
            const title = item.poster_path ? '' : <p>{item.title}</p>
            return <div className="item" key={index} style={{ backgroundImage }}>{title}</div>
        });
    }

    componentDidUpdate() {
        if (this.query !== this.props.query) {
            this.query = this.props.query;
            this.page = 0;
            this.more();
        }
    }

    componentDidMount() {
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