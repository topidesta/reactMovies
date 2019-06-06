import React from 'react';
import API from '../../Components/API/request';
import Listing from '../../Components/Listing';
import Button from '../../Components/Button';
import Error404 from '../Error404';
import './ViewMovie.css';

/**
 * Shows the info of a movie
 */

class ViewMovie extends React.Component {
    state = {
        id: 0,
        title: '',
        description: '',
        tags: '',
        poster: '',
        message: ''
    }

    loading = false;

    loaded(data) {
        // When data is received, if wrong shows message, 
        if (!data.title) {
            this.setState({ id: this.props.match.params.id }, () => this.loading = false)
            return this.setState({ message: <Error404 /> });
        }
        // Update background and set state with received data
        document.getElementsByTagName('body')[0].style.backgroundImage = 'url(' + API.poster(data.backdrop_path, 500) + ')';
        this.setState({
            id: data.id,
            title: data.title,
            description: data.overview,
            tags: data.genres.map((t, index) => <p key={index}>{t.name}</p>),
            poster: API.poster(data.poster_path, 500)
        }, () => this.loading = false);
    }

    getData() {
        // Ask for data when component is ready or when id changes.
        if (this.loading || this.state.id === this.props.match.params.id) return;
        this.loading = true;
        API.request('DETAIL', this.props.match.params.id, 1, this.loaded.bind(this), this.loaded.bind(this));
    }

    componentDidUpdate() {
        this.getData();
    }

    componentDidMount() {
        this.getData();
    }

    componentWillUnmount() {
        // Removes the background when we leaves
        document.getElementsByTagName('body')[0].style.backgroundImage = 'url()';
    }

    render() {
        return (
            <div>
                {
                    this.state.message
                        ?
                        this.state.message
                        :
                        <div>
                            <div className="filmDetail" id="filmDetail">
                                <h1>{this.state.title}</h1>
                                <div className="filmDetailBox">
                                    <div className="info">
                                        <div className="text">
                                            <p>{this.state.description}</p>
                                            <p className="playbotton"><Button to={'/movie/' + this.state.id + '/play'}>Play</Button></p>
                                            <div className="tags">{this.state.tags}</div>
                                        </div>
                                    </div>
                                    <div className="poster"><img src={this.state.poster} alt={this.state.title} /></div>
                                </div>
                                <h1>Related</h1>
                                <Listing type="RELATED" query={this.state.id} />
                            </div>

                        </div>
                }
            </div>
        );
    }
}

export default ViewMovie;