/**
 * @var BandcampPlayer
 */
var BandcampPlayer = function(params){
    params = params || {};

    this.track = params.track || {};
    this.context = params.context || null;

    this._mute = false;
    this._volume = 0.5;
    this._events = params.events || {};
    this._audio = null;

    this.init = function(){
        this.resolveMrl(params.src).then(function(reponse) {
            _this._audio = new Audio();
            _this._audio.preload = 'none';
            _this._audio.src = reponse.mrl;
            _this._audio.volume = _this._volume;

            _this._audio.addEventListener('playing', function(e){
                if(typeof _this._events.onplay === 'function'){
                    _this._events.onplay.call(null, e, _this);
                }
            });
            _this._audio.addEventListener('pause', function(e){
                if(typeof _this._events.onpause === 'function'){
                    _this._events.onpause.call(null, e, _this);
                }
            });
            _this._audio.addEventListener('timeupdate', function(e){
                if(typeof _this._events.ontimeupdate === 'function'){
                    _this._events.ontimeupdate.call(null, e, _this);
                }
            });
            _this._audio.addEventListener('ended', function(e){
                if(typeof _this._events.onfinish === 'function'){
                    _this._events.onfinish.call(null, e, _this);
                }
            });
            _this._audio.addEventListener('error', function(e, error){
                if(typeof _this._events.onerror === 'function'){
                    _this._events.onerror.call(null, e, error, _this);
                }
            });

            _this._audio.play();
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
 * @return BandcampPlayer
 */
BandcampPlayer.prototype.resolveMrl = function(mrl){
    return fetch('/bandcamp/resolve?mrl=' + mrl).then(function(response) {
        return (response.ok) ? response.json() : Promise.reject(response);
    });
};

/**
 * Play audio
 * 
 * @return BandcampPlayer
 */
BandcampPlayer.prototype.play = function(){
    if(!this._audio) this.init();
    else this._audio.play();

    return this;
};

/**
 * Pause audio
 * 
 * @return BandcampPlayer
 */
BandcampPlayer.prototype.pause = function(){
    if(!this._audio) return this;

    this._audio.pause();

    return this;
};

/**
 * Stop audio
 * 
 * @return BandcampPlayer
 */
BandcampPlayer.prototype.stop = function(){
    if(!this._audio) return this;

    this._audio.pause();
    this._audio.currentTime = 0;

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
BandcampPlayer.prototype.position = function(value){
    if(!this._audio) return this;

    if(typeof value === 'undefined'){
        return this._audio.currentTime;
    }

    if(typeof value !== 'number' || value < 0){
        throw new Error("Invalid argument value (" + value + ")");
    }

    this._audio.currentTime = value;

    return this;
};

/**
 * Get audio duration
 * 
 * @return integer
 */
BandcampPlayer.prototype.duration = function(){
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
BandcampPlayer.prototype.source = function(value){
    if(!this._audio) return this;

    if(typeof value === 'undefined'){
        return this._audio.src;
    }

    if(typeof value !== 'string'){
        throw new Error("Invalid argument value (" + value + ")");
    }

    this._audio.src = value;

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
BandcampPlayer.prototype.volume = function(value){
    if(!this._audio) return this;

    if(typeof value === 'undefined'){
        return this._audio.volume;
    }

    if(typeof value !== 'number' || value < 0 || value > 1){
        throw new Error("Invalid argument value (" + value + ")");
    }

    this._audio.volume = value;

    return this;
};

/**
 * Mute audio
 * 
 * @return BandcampPlayer
 */
BandcampPlayer.prototype.mute = function(){
    if(!this._audio) return this;

    this._volume = this._audio.volume;
    this._audio.volume = 0;
    this._mute = true;

    return this;
};

/**
 * Unmute audio
 * 
 * @return BandcampPlayer
 */
BandcampPlayer.prototype.unmute = function(){
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
BandcampPlayer.prototype.isPlaying = function(){
    return this._audio && this._audio.currentTime > 0 && !this._audio.paused;
};
