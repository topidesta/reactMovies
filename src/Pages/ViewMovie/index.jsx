import React from 'react';
import API from '../../Components/API/request';
import Button from '../../Components/Button';
import Error404 from '../Error404';
import './ViewMovie.css';

/**
 * Shows the info of a movie
 */

class ViewMovie extends React.Component {
    state = {
        title: '',
        description: '',
        tags: '',
        poster: '',
        message: ''
    }

    loaded(data) {
        // When data is received, if wrong shows message, else it update background and set state with received data
        if (!data.title) return this.setState({ message: <Error404 /> });
        document.getElementsByTagName('body')[0].style.backgroundImage = 'url(' + API.poster(data.backdrop_path, 500) + ')';
        this.setState({
            title: data.title,
            description: data.overview,
            tags: data.genres.map((t, index) => <p key={index}>{t.name}</p>),
            poster: API.poster(data.poster_path, 500)
        });
    }

    componentDidMount() {
        // Ask for data when component is ready
        API.request('DETAIL', this.props.match.params.id, 1, this.loaded.bind(this), this.loaded.bind(this));
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
                        <div className="filmDetail" id="filmDetail">
                            <h1>{this.state.title}</h1>
                            <div className="filmDetailBox">
                                <div className="info">
                                    <div className="text">
                                        <p>{this.state.description}</p>
                                        <p className="playbotton"><Button to={'/movie/' + this.props.match.params.id + '/play'}>Play</Button></p>
                                        <div className="tags">{this.state.tags}</div>
                                    </div>
                                </div>
                                <div className="poster"><img src={this.state.poster} alt={this.state.title} /></div>
                            </div>
                        </div>
                }
            </div>
        );
    }
}

export default ViewMovie;