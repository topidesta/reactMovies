import React from 'react';
import API from '../../Components/API/request';
import Error404 from '../Error404';
import Error from '../Error';
import Button from '../../Components/Button';
import shaka from 'shaka-player';
import './PlayMovie.css';

/**
 * Plays the movie
 */

class ViewMovie extends React.Component {
    state = {
        title: '',
        backdrop: '',
        message: ''
    }
    
    // The manifest
    manifestUri='//storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';
            // manifestUri = '//bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8';
            // manifestUri = '//storage.googleapis.com/shaka-demo-assets/sintel-widevine/dash.mpd';

    loaded(data) {
        // When data is received, error 404 if the films is not found, or update the the state and plays video.
        if (!data.title) return this.setState({ message: <Error404 /> });
        this.setState({ title: data.title, backdrop: API.poster(data.backdrop_path, 500) }, this.playVideo);
    }

    /**
     * Playing video functions for shaka player
     */

    playVideo() {
        shaka.polyfill.installAll();
        if (shaka.Player.isBrowserSupported()) {
            this.initPlayer();
        } else {
            this.onError('Your browser is not compatible');
        }
    }

    initPlayer() {
        var player = new shaka.Player(document.getElementById('video'));
        player.addEventListener('error', this.onError.bind(this));
        player.load(this.manifestUri)
            .catch(this.onError.bind(this));
    }

    onError(error) {
        const showText = typeof (error) === 'string' ? error : 'Connection error';
        const message = <Error data={showText} />;
        this.setState({ message });
    }

    componentDidMount() {
        // Ask for data when component is ready.
        API.request('DETAIL', this.props.match.params.id, 1, this.loaded.bind(this), this.loaded.bind(this));
    }

    render() {
        return (
            <div>
                {
                    this.state.message
                        ?
                        this.state.message
                        :
                        <div className="filmPlayer">
                            <div className="filmPlayerHead">
                                <div><h1>{this.state.title}</h1></div>
                                <div className="close"><Button to={'/movie/' + this.props.match.params.id}>X</Button></div>
                            </div>
                            <video id="video"
                                width="100%"
                                poster={this.state.backdrop}
                                controls autoPlay></video>
                        </div>
                }
            </div>
        );
    }
}

export default ViewMovie;