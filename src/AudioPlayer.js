/**
 * @var AudioPlayer
 */
var AudioPlayer = function(params){
    params = params || {};

    this.track = params.track || {};
    this.context = params.context || null;

    this._mute = false;
    this._volume = 0.5;
    this._events = params.events || {};
    this._audio = new Audio();
    this._audio.preload = 'none';
    this._audio.src = params.src;
    this._audio.volume = this._volume;
    this._audio.addEventListener('playing', function(e){
        if(typeof _this._events.onplay === 'function'){
            _this._events.onplay.call(null, e, _this);
        }
    });
    this._audio.addEventListener('pause', function(e){
        if(typeof _this._events.onpause === 'function'){
            _this._events.onpause.call(null, e, _this);
        }
    });
    this._audio.addEventListener('timeupdate', function(e){
        if(typeof _this._events.ontimeupdate === 'function'){
            _this._events.ontimeupdate.call(null, e, _this);
        }
    });
    this._audio.addEventListener('ended', function(e){
        if(typeof _this._events.onfinish === 'function'){
            _this._events.onfinish.call(null, e, _this);
        }
    });
    this._audio.addEventListener('error', function(e, error){
        if(typeof _this._events.onerror === 'function'){
            _this._events.onerror.call(null, e, error, _this);
        }
    });

    var _this = this;
};

/**
 * @return AudioPlayer
 */
AudioPlayer.prototype.play = function(){
    if(!this._audio) return this;

    this._audio.play();

    return this;
};

/**
 * @return AudioPlayer
 */
AudioPlayer.prototype.pause = function(){
    if(!this._audio) return this;

    this._audio.pause();

    return this;
};

/**
 * @return AudioPlayer
 */
AudioPlayer.prototype.stop = function(){
    if(!this._audio) return this;

    this._audio.pause();
    this._audio.currentTime = 0;

    return this;
};

/**
 * @param integer value
 * @return integer|AudioPlayer
 */
AudioPlayer.prototype.position = function(value){
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
 * @return integer
 */
AudioPlayer.prototype.duration = function(){
    if(!this._audio) return 0;

    return this._audio.duration;
};

/**
 * @param string value
 * @return string|AudioPlayer
 */
AudioPlayer.prototype.source = function(value){
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
 * @param integer value
 * @return integer|AudioPlayer
 */
AudioPlayer.prototype.volume = function(value){
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
 * @return AudioPlayer
 */
AudioPlayer.prototype.mute = function(){
    if(!this._audio) return this;

    this._volume = this._audio.volume;
    this._audio.volume = 0;
    this._mute = true;

    return this;
};

/**
 * @return AudioPlayer
 */
AudioPlayer.prototype.unmute = function(){
    if(!this._audio) return this;

    this._audio.volume = this._volume;
    this._mute = false;

    return this;
};

/**
 * @return boolean
 */
AudioPlayer.prototype.isPlaying = function(){
    return this._audio && this._audio.currentTime > 0 && !this._audio.paused;
};
