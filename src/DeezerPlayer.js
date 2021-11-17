/**
 * @var DeezerPlayer
 * @see https://developers.deezer.com/sdk/javascript
 */
var DeezerPlayer = function(params){
    params = params || {};

    this.track = params.track || {};
    this.context = params.context || null;

    this._mute = false;
    this._volume = 1;
    this._events = params.events || {};
    this._audio = null;
    this._src = params.src || null;

    this.init = function(){
		console.log(DZ.getLoginStatus());
        DZ.getLoginStatus(function(response) {
			console.log(response);
			if (response.authResponse) {
				// logged in and connected user, someone you know
			} else {
				// no user session available, someone you dont know
			}
		});
		
		this._audio = {
            currentTime: 0,
            duration: 0,
            src: this.getTrackId(this._src)
        };

        DZ.Event.subscribe('player_play', function(){
            if(typeof _this._events.onplay === 'function'){
                _this._events.onplay.call(null, null, _this);
            }
        });
        DZ.Event.subscribe('player_paused', function(){
            if(typeof _this._events.onpause === 'function'){
                _this._events.onpause.call(null, null, _this);
            }
        });
        DZ.Event.subscribe('player_position', function(arg){
            _this._audio.currentTime = arg[0];
            _this._audio.duration = arg[1];
            if(typeof _this._events.ontimeupdate === 'function'){
                _this._events.ontimeupdate.call(null, null, _this);
            }
        });
        DZ.Event.subscribe('track_end', function(){
            if(typeof _this._events.onfinish === 'function'){
                _this._events.onfinish.call(null, null, _this);
            }
        });

        DZ.player.playTracks([this._audio.src]);
    };

    var _this = this;
};

/**
 * Get track ID
 *
 * @param string mrl
 * @return string
 */
DeezerPlayer.prototype.getTrackId = function(mrl){
    if(window.URL) var url = new URL(mrl);
    else{
        var url = document.createElement('a');
            url.href = mrl;
    }

    var matches = url.pathname.match(/\/track\/(.*)/);
    if(matches){
        return matches[1];
    }

    console.error('Invalid URL');
};

/**
 * Play audio
 *
 * @return DeezerPlayer
 */
DeezerPlayer.prototype.play = function(){
    if(!this._audio) this.init();
    else DZ.player.play();

    return this;
};

/**
 * Pause audio
 *
 * @return DeezerPlayer
 */
DeezerPlayer.prototype.pause = function(){
    if(!this._audio) return this;

    DZ.player.pause();

    return this;
};

/**
 * Stop audio
 *
 * @return DeezerPlayer
 */
DeezerPlayer.prototype.stop = function(){
    if(!this._audio) return this;

    DZ.player.pause();
    DZ.player.seek(0);

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
DeezerPlayer.prototype.position = function(value){
    if(!this._audio) return this;

    if(typeof value === 'undefined'){
        return this._audio.currentTime;
    }

    if(typeof value !== 'number' || value < 0){
        throw new Error("Invalid argument value (" + value + ")");
    }

    DZ.player.seek(value * 1000);

    return this;
};

/**
 * Get audio duration
 *
 * @return integer
 */
DeezerPlayer.prototype.duration = function(){
    if(!this._audio) return 0;

    return this._audio.duration;
};

/**
 * Get/set audio source
 *
 * @param string value
 *
 * @return mixed
 * @throw Error if argument is invalid
 */
DeezerPlayer.prototype.source = function(value){
    if(!this._audio) return this;

    if(typeof value === 'undefined'){
        return this._audio.src;
    }

    if(typeof value !== 'string'){
        throw new Error("Invalid argument value (" + value + ")");
    }

    this._audio.src = value;
    DZ.player.playExternalTracks([{ url: value }]);

    return this;
};

/**
 * Get/set audio volume
 *
 * @param float value
 *
 * @return mixed
 * @throw Error if argument is invalid
 */
DeezerPlayer.prototype.volume = function(value){
    if(!this._audio) return this;

    if(typeof value === 'undefined'){
        return DZ.player.getVolume() / 100;
    }

    if(typeof value !== 'number' || value < 0 || value > 1){
        throw new Error("Invalid argument value (" + value + ")");
    }

    DZ.player.setVolume(value * 100);

    return this;
};

/**
 * Mute audio
 *
 * @return DeezerPlayer
 */
DeezerPlayer.prototype.mute = function(){
    if(!this._audio) return this;

    DZ.player.setMute(true);
    this._mute = true;

    return this;
};

/**
 * Unmute audio
 *
 * @return DeezerPlayer
 */
DeezerPlayer.prototype.unmute = function(){
    if(!this._audio) return this;

    DZ.player.setMute(false);
    this._mute = false;

    return this;
};

/**
 * Return audio status
 *
 * @return boolean
 */
DeezerPlayer.prototype.isPlaying = function(){
    return this._audio && DZ.player.isPlaying();
};
