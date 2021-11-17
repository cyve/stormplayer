/**
 * @var SoundcloudPlayer
 * @see https://developer.soundcloud.com/docs/api/sdks#streaming
 */
var SoundcloudPlayer = function(params){
    params = params || {};

    this.track = params.track || {};
    this.context = params.context || null;
    this.clientId = 'aeb8608f5c352e40a7a8ffddc9265c46';

    this._mute = false;
    this._volume = 0.5;
    this._events = params.events || {};
    this._audio = null;
    this._src = null;

    this.init = function(){
        SC.initialize({ client_id: this.clientId });
        this.resolveMrl(params.src).then(function(response){
            SC.stream(response.mrl).then(function(player){
                _this._audio = player;
                _this._audio.play();
                _this._audio.setVolume(_this._volume);
                _this._src = response.mrl;
                
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
                    if(typeof _this._events.ontimeupdate === 'function' && this.isPlaying()){
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
        }).catch(function (error) {
            console.error(error);

            if (error.status === 404) {
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
        });
    };

    var _this = this;
};

/**
 * Resolve MRL
 *
 * @return SoundcloudPlayer
 */
SoundcloudPlayer.prototype.resolveMrl = function(mrl){
    return SC.resolve(mrl + '?client_id=' + this.clientId).then(function(response) {
        if (response.kind !== 'track') {
            return Promise.reject('Invalid MRL "' + mrl + '"');
        }

        return Promise.resolve({ mrl: '/tracks/' + response.id });
    });
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
    if(!this._audio) return this;

    this._audio.pause();

    return this;
};

/**
 * Stop audio
 *
 * @return SoundcloudPlayer
 */
SoundcloudPlayer.prototype.stop = function(){
    if(!this._audio) return this;

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
    if(!this._audio) return this;

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
    if(!this._audio) return 0;

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
    if(!this._audio) return this;

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
    if(!this._audio) return this;

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
    if(!this._audio) return this;

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
    if(!this._audio) return this;

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
