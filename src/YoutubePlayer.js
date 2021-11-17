/**
 * @var YoutubePlayer
 * @see https://developers.google.com/youtube/iframe_api_reference
 */
var YoutubePlayer = function(params){
    params = params || {};

    this.track = params.track || {};
    this.context = params.context || null;

    this._mute = false;
    this._volume = 0.5;
    this._events = params.events || {};
    this._audio = null;
    this._watcher = null;
    this._startTime = null;
    this._duration = null;

    this.init = function(){
        var response = this.resolveMrl(params.src);

        var iframe = document.createElement('div');
        iframe.id = 'youtube-player';
        iframe.className = 'youtube-player';
        document.body.append(iframe);

        var playerVars = {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            showinfo: 0,
            enablejsapi: 1,
            origin: 'https://www.sonducoin.fr'
        };

        if (response.startTime && response.endTime) {
            this._startTime = response.startTime;
            this._duration = response.endTime - response.startTime;
            playerVars.start = response.startTime;
            playerVars.end = response.endTime;
        }

        this._audio = new YT.Player('youtube-player', {
            width: 197,
            height: 111,
            videoId: response.videoId,
            playerVars: playerVars
        });

        this._audio.addEventListener('onReady', function(e){
            _this._audio.setVolume(_this._volume * 100);

            if(typeof _this._events.onready === 'function'){
                _this._events.onready.call(null, e, _this);
            }

            _this._watcher = setInterval(function(){
                if(typeof _this._events.ontimeupdate === 'function' && _this._audio.getPlayerState() === YT.PlayerState.PLAYING){
                    _this._events.ontimeupdate.call(null, null, _this);
                }
            }, 500);

            _this._audio.playVideo();
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
                    break;
            }
        });
        this._audio.addEventListener('onError', function(e, error){
            if ([100, 101, 150].indexOf(e.data) !== -1) {
                fetch('/api/tasks', {
                    method: 'post',
                    headers: new Headers({ 'Content-Type': 'application/json' }),
                    body: JSON.stringify({
                        name: 'Migrate unavailable track #' + _this.track.id,
                        type: 'task',
                        action: 'https://www.sonducoin.fr/admin/?action=edit&entity=Track&id=' + _this.track.id,
                    })
                });
            }

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

        var iframe = document.getElementById('youtube-player');
        if (iframe) {
            iframe.parentNode.removeChild(iframe);
        }
    };

    var _this = this;
};

/**
 * Resolve MRL
 *
 * @return YoutubePlayer
 */
YoutubePlayer.prototype.resolveMrl = function(mrl){
    if(window.URL) var url = new URL(mrl);
    else{
        var url = document.createElement('a');
            url.href = mrl;
    }

    var response = {};
    if(url.pathname.match(/^\/embed\//)){
        response.videoId = url.pathname.replace('/embed/', '');
    } else if(url.pathname.match(/^\/watch/)){
        response.videoId = url.searchParams.get('v');
    } else if(url.hostname === 'youtu.be'){
        response.videoId = url.pathname;
    } else {
        return console.error('Invalid MRL "' + mrl + '"');
    }

    if (url.searchParams.has('start') && url.searchParams.has('end')) {
        response.startTime = parseInt(url.searchParams.get('start'), 10);
        response.endTime = parseInt(url.searchParams.get('end'), 10);
    }

    return response;
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
    if(!this._audio) return this;

    this._audio.pauseVideo();

    return this;
};

/**
 * Stop audio
 *
 * @return YoutubePlayer
 */
YoutubePlayer.prototype.stop = function(){
    if(!this._audio) return this;

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
    if(!this._audio) return this;

    if(typeof value === 'undefined'){
        // if start time is specified in MRL
        if(this._startTime) return parseInt(this._audio.getCurrentTime(), 10) - this._startTime;

        return parseInt(this._audio.getCurrentTime(), 10);
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
    if(!this._audio) return 0;

    // if duration is specified in MRL
    if(this._duration) return this._duration;

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
    if(!this._audio) return this;

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
    if(!this._audio) return this;

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
    if(!this._audio) return this;

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
    if(!this._audio) return this;

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
