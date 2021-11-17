/**
 * @return SoundcloudPlayer
 */
var SoundcloudPlayer = function(params){
    params = params || {};

    this._type = 'soundcloud';
    this._mute = false;
    this._volume = 1;
    this._metadata = params.metadata || {};
    this._events = params.events || {};

    this._audio = null;
    this._src = params.src || null;

    this.init = function(){
        SC.resolve(_this._src).then(function(response){
            if(response.kind !== 'track') return console.error('Invalid MRL ' + _this._src);
            
            _this._src = '/tracks/' + response.id;
            
            SC.stream(_this._src).then(function(player){
                _this._audio = player;
                _this._audio.play();
                
                _this._audio.on('play-start', function(e){
                    if(typeof _this._events.onplay === 'function'){
                        _this._events.onplay.call(null, e, _this);
                    }
                });
                _this._audio.on('play', function(e){
                    if(typeof _this._events.onplay === 'function'){
                        _this._events.onplay.call(null, e, _this);
                    }
                });
                _this._audio.on('pause', function(e){
                    if(typeof _this._events.onpause === 'function'){
                        _this._events.onpause.call(null, e, _this);
                    }
                });
                _this._audio.on('time', function(e){
                    if(typeof _this._events.ontimeupdate === 'function'){
                        _this._events.ontimeupdate.call(null, e, _this);
                    }
                });
                _this._audio.on('finish', function(e){
                    if(typeof _this._events.onfinish === 'function'){
                        _this._events.onfinish.call(null, e, _this);
                    }
                });
                _this._audio.on('audio_error', function(e, error){
                    if(typeof _this._events.onerror === 'function'){
                        _this._events.onerror.call(null, e, error, _this);
                    }
                });
            });
        });
    };

    var _this = this;
};

/**
 * Play audio
 *
 * @return SoundcloudPlayer
 */
SoundcloudPlayer.prototype.play = function(){
    if(!this._audio) this.init();
    else this._audio.play();

    return this;
};

/**
 * Pause audio
 *
 * @return SoundcloudPlayer
 */
SoundcloudPlayer.prototype.pause = function(){
    this._audio.pause();

    return this;
};

/**
 * Stop audio
 *
 * @return SoundcloudPlayer
 */
SoundcloudPlayer.prototype.stop = function(){
    this._audio.pause();
    this._audio.seek(0);

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
SoundcloudPlayer.prototype.position = function(value){
    if(typeof value === 'undefined'){
        return parseInt(this._audio.currentTime() / 1000, 10);
    }

    if(typeof value !== 'number' || value < 0){
        throw new Error("Invalid argument value (" + value + ")");
    }

    this._audio.seek(value * 1000);

    return this;
};

/**
 * Get audio duration
 *
 * @return integer
 */
SoundcloudPlayer.prototype.duration = function(){
    return  parseInt(this._audio.getDuration() / 1000, 10);
};

/**
 * Get/set audio source
 *
 * @param string value
 *
 * @return mixed
 * @throw Error if argument is invalid
 */
SoundcloudPlayer.prototype.source = function(value){
    if(typeof value === 'undefined'){
        return this._src;
    }

    if(typeof value !== 'string'){
        throw new Error("Invalid argument value (" + value + ")");
    }

    // this._audio.loadVideoByUrl(value);

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
SoundcloudPlayer.prototype.volume = function(value){
    if(typeof value === 'undefined'){
        return this._audio.getVolume();
    }

    if(typeof value !== 'number' || value < 0 || value > 1){
        throw new Error("Invalid argument value (" + value + ")");
    }

    this._audio.setVolume(value);

    return this;
};

/**
 * Mute audio
 *
 * @return SoundcloudPlayer
 */
SoundcloudPlayer.prototype.mute = function(){
    this._volume = this._audio.getVolume();
    this._audio.setVolume(0);
    this._mute = true;

    return this;
};

/**
 * Unmute audio
 *
 * @return SoundcloudPlayer
 */
SoundcloudPlayer.prototype.unmute = function(){
    this._audio.volume = this._volume;
    this._mute = false;

    return this;
};

/**
 * Return audio status
 *
 * @return boolean
 */
SoundcloudPlayer.prototype.isPlaying = function(){
    return this._audio && this._audio.isActuallyPlaying();
};

/**
 * Get type
 *
 * @return Object
 */
SoundcloudPlayer.prototype.type = function(){
    return this._type;
};

/**
 * Get metadata
 *
 * @return Object
 */
SoundcloudPlayer.prototype.metadata = function(){
    return this._metadata;
};
