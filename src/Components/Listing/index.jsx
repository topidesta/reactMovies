import React from 'react';
import { Link, withRouter } from "react-router-dom";
import SlideList from './SlideList';
import BoxList from './BoxList';
import API from '../API/request';
import './Listing.css';

class Listing extends React.Component {
    state = {
        list: []
    };
    page = 0;
    showedAll = false;
    loading = false;
    query = this.props.query;

    loaded = data => {
        this.loading = false;
        let formatedData = data.results ? this.formatFilm(data.results) : [];
        if (formatedData.length === 0) this.showedAll = true;
        if (this.page > 1) formatedData = [...this.state.list, formatedData];
        this.setState({ list: formatedData });
    };

    fail = error => {
        this.props.history.push('/lost');
    };

    more = () => {
        if (this.showedAll || this.loading) return;
        this.loading = true;
        this.page++;
        API.request(this.props.type, this.props.query, this.page, this.loaded, this.fail);
    };

    formatFilm = data => {
        if (!data) return [];
        return data.map((item, index) => {
            const backgroundImage = 'url(' + API.poster(item.poster_path, 200) + ')';
            const title = item.poster_path ? '' : <p>{item.title}</p>
            return <Link to={'/movie/'+item.id} key={index}><div className="item" style={{ backgroundImage }}>{title}</div></Link>
        });
    }

    componentDidUpdate() {
        if (this.query !== this.props.query) {
            this.query = this.props.query;
            this.page = 0;
            this.showedAll = false;
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