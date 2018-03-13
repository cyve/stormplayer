/**
 * @author Cyril Vermande (cyril@cyrilwebdesign.com)
 * @license MIT
 * @copyright All rights reserved 2018 Cyril Vermande
 * @see https://developers.google.com/youtube/iframe_api_reference
 */

/**
 * @return YoutubePlayer
 */
var YoutubePlayer = function(params){
    params = params || {};

    this._type = 'youtube';
    this._mute = false;
    this._volume = 1;
    this._metadata = params.metadata || {};
    this._events = params.events || {};

    this._audio = null;
    this._src = params.src || null;
    this._watcher = null;

    this.init = function(){
        var iframe = document.createElement('iframe');
        iframe.id = 'youtube-player';
        iframe.src = this.getEmbedMrl(this._src) + '?enablejsapi=1&autoplay=1&controls=0&showinfo=0';
        iframe.className = 'youtube-player';
        document.body.append(iframe);

        this._audio = new YT.Player('youtube-player');
        this._audio.addEventListener('onReady', function(e){
            _this._watcher = setInterval(function(){
                if(typeof _this._events.ontimeupdate === 'function' && _this._audio.getPlayerState() === YT.PlayerState.PLAYING){
                    _this._events.ontimeupdate.call(null, null, _this);
                }
            }, 500);
        });
        this._audio.addEventListener('onStateChange', function(e){
            switch(e.data){
                case YT.PlayerState.PLAYING:
                    if(typeof _this._events.onplay === 'function'){
                        _this._events.onplay.call(null, e, _this);
                    }
                    break;
                case YT.PlayerState.PAUSED:
                    if(typeof _this._events.onpause === 'function'){
                        _this._events.onpause.call(null, e, _this);
                    }
                    break;
                case YT.PlayerState.ENDED:
                    if(typeof _this._events.onfinish === 'function'){
                        _this._events.onfinish.call(null, e, _this);
                    }
                    _this.clear();
                    break;
            }
        });
        this._audio.addEventListener('onError', function(e, error){
            if(typeof _this._events.onerror === 'function'){
                _this._events.onerror.call(null, e, e.data, _this);
            }
        });
    };
    this.clear = function(){
        if(this._watcher){
            clearInterval(this._watcher);
            this._watcher = null;
        }

        if(this._audio){
            this._audio.destroy();
            this._audio = null;
        }
    };

    var _this = this;
};

/**
 * Get embed URL
 *
 * @param string mrl
 * @return string
 */
YoutubePlayer.prototype.getEmbedMrl = function(mrl){
    if(window.URL) var url = new URL(mrl);
    else{
        var url = document.createElement('a');
            url.href = mrl;
    }

    if(url.pathname.match(/^\/embed\//)){
        return mrl;
    }
    else if(url.pathname.match(/^\/watch/)){
        return url.origin + '/embed/' + url.searchParams.get('v');
    }
    else if(url.hostname === 'youtu.be'){
        return url.origin + '/embed' + url.pathname;
    }

    console.error('Invlid URL');
};

/**
 * Play audio
 *
 * @return YoutubePlayer
 */
YoutubePlayer.prototype.play = function(){
    if(!this._audio) this.init();
    else this._audio.playVideo();

    return this;
};

/**
 * Pause audio
 *
 * @return YoutubePlayer
 */
YoutubePlayer.prototype.pause = function(){
    this._audio.pauseVideo();

    return this;
};

/**
 * Stop audio
 *
 * @return YoutubePlayer
 */
YoutubePlayer.prototype.stop = function(){
    this._audio.stopVideo();
    this.clear();

    return this;
};

/**
 * Get/set audio position
 *
 * @param integer value
 *
 * @return mixed
 * @throw Error if argument is invalid
 */
YoutubePlayer.prototype.position = function(value){
    if(typeof value === 'undefined'){
        return  parseInt(this._audio.getCurrentTime(), 10);
    }

    if(typeof value !== 'number' || value < 0){
        throw new Error("Invalid argument value (" + value + ")");
    }

    this._audio.seekTo(value);

    return this;
};

/**
 * Get audio duration
 *
 * @return integer
 */
YoutubePlayer.prototype.duration = function(){
    return  parseInt(this._audio.getDuration(), 10);
};

/**
 * Get/set audio source
 *
 * @param string value
 *
 * @return mixed
 * @throw Error if argument is invalid
 */
YoutubePlayer.prototype.source = function(value){
    if(typeof value === 'undefined'){
        return this._audio.getVideoUrl();
    }

    if(typeof value !== 'string'){
        throw new Error("Invalid argument value (" + value + ")");
    }

    this._audio.loadVideoByUrl(value);

    return this;
};

/**
 * Get/set audio volume
 *
 * @param integer value
 *
 * @return mixed
 * @throw Error if argument is invalid
 */
YoutubePlayer.prototype.volume = function(value){
    if(typeof value === 'undefined'){
        return this._audio.getVolume() / 100;
    }

    if(typeof value !== 'number' || value < 0 || value > 1){
        throw new Error("Invalid argument value (" + value + ")");
    }

    this._audio.setVolume(value * 100);

    return this;
};

/**
 * Mute audio
 *
 * @return YoutubePlayer
 */
YoutubePlayer.prototype.mute = function(){
    this._audio.mute();
    this._mute = true;

    return this;
};

/**
 * Unmute audio
 *
 * @return YoutubePlayer
 */
YoutubePlayer.prototype.unmute = function(){
    this._audio.unMute();
    this._mute = false;

    return this;
};

/**
 * Return audio status
 *
 * @return boolean
 */
YoutubePlayer.prototype.isPlaying = function(){
    return this._audio && this._audio.getPlayerState() === YT.PlayerState.PLAYING;
};

/**
 * Get type
 *
 * @return Object
 */
YoutubePlayer.prototype.type = function(){
    return this._type;
};

/**
 * Get metadata
 *
 * @return Object
 */
YoutubePlayer.prototype.metadata = function(){
    return this._metadata;
};
