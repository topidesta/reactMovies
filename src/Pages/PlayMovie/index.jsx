import React from 'react';
import API from '../../Components/API/request';
import Error404 from '../Error404';
import Error from '../Error';
import Button from '../../Components/Button';
import shaka from 'shaka-player'
import './PlayMovie.css';

class ViewMovie extends React.Component {
    state = {
        title: '',
        backdrop: '',
        message: ''
    }

    manifestUri = 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8';

    loaded(data) {
        if (!data.title) this.setState({ message: <Error404 /> });
        this.setState({ title: data.title, backdrop: API.poster(data.backdrop_path, 500) }, this.playVideo);
    }

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
        player.load(this.manifestUri).catch(this.onError.bind(this));
    }

    onError(error) {
        const showText = typeof (error) === 'string' ? error : 'Connection error';
        const message = <Error data={showText} />;
        this.setState({ message });
    }

    componentDidMount() {
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
                                <div className="close"><Button to={'/movie/' + this.props.match.params.id }>X</Button></div>
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