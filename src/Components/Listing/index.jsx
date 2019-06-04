import React from 'react';
import SlideList from './SlideList';
import BoxList from './BoxList';
import Error from '../Error';
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

    loaded = data => {
        this.endLoading();
        const formatedData = this.formatFilm(data.results);
        this.setState({ list: [...this.state.list, formatedData] });
        if (data.length === 0) this.showedAll = true;
    };

    fail = error => {
        this.endLoading();
        if (this.page === 0) this.setState({ message: <Error /> });
    };

    more = () => {
        if (this.showedAll || this.loading) return;
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
        return data.map((item, index) => {
            const backgroundImage = 'url(' + API.poster(item.poster_path, 200) + ')';
            const title = item.poster_path?'':<p>{item.title}</p>
            return <div className="item" key={index} style={{ backgroundImage }}>{title}</div>
        });
    }

    componentDidMount() {
        this.more();
    }

    render() {
        const listing = this.props.slide ? <SlideList list={this.state.list} query={this.props.query} more={this.more} /> : <BoxList list={this.state.list} more={this.more} />
        return (
            <div>
                {listing}
            </div>

        )
    }
}

export default Listing;