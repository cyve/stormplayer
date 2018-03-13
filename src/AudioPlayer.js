/**
 * @author Cyril Vermande (cyril@cyrilwebdesign.com)
 * @license MIT
 * @copyright All rights reserved 2016 Cyril Vermande
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
 */

/**
 * @return AudioPlayer
 */
var AudioPlayer = function(params){
    params = params || {};

    this._type = 'html5';
    this._mute = false;
    this._volume = 1;
    this._metadata = params.metadata || {};
    this._events = params.events || {};

    this._audio = new Audio();
    this._audio.preload = 'none';
    this._audio.src = params.src;
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
 * Play audio
 * 
 * @return AudioPlayer
 */
AudioPlayer.prototype.play = function(){
    this._audio.play();

    return this;
}

/**
 * Pause audio
 * 
 * @return AudioPlayer
 */
AudioPlayer.prototype.pause = function(){
    this._audio.pause();

    return this;
}

/**
 * Stop audio
 * 
 * @return AudioPlayer
 */
AudioPlayer.prototype.stop = function(){
    this._audio.pause();
    this._audio.currentTime = 0;

    return this;
}

/**
 * Get/set audio position
 * 
 * @param integer value
 *
 * @return mixed
 * @throw Error if argument is invalid
 */
AudioPlayer.prototype.position = function(value){
    if(typeof value === 'undefined'){
        return this._audio.currentTime;
    }

    if(typeof value !== 'number' || value < 0){
        throw new Error("Invalid argument value (" + value + ")");
    }

    this._audio.currentTime = value;

    return this;
}

/**
 * Get audio duration
 * 
 * @return integer
 */
AudioPlayer.prototype.duration = function(){
    return this._audio.duration;
}

/**
 * Get/set audio source
 * 
 * @param string value
 * 
 * @return mixed
 * @throw Error if argument is invalid
 */
AudioPlayer.prototype.source = function(value){
    if(typeof value === 'undefined'){
        return this._audio.src;
    }

    if(typeof value !== 'string'){
        throw new Error("Invalid argument value (" + value + ")");
    }

    this._audio.src = value;

    return this;
}

/**
 * Get/set audio volume
 * 
 * @param integer value
 * 
 * @return mixed
 * @throw Error if argument is invalid
 */
AudioPlayer.prototype.volume = function(value){
    if(typeof value === 'undefined'){
        return this._audio.volume;
    }

    if(typeof value !== 'number' || value < 0 || value > 1){
        throw new Error("Invalid argument value (" + value + ")");
    }

    this._audio.volume = value;

    return this;
}

/**
 * Mute audio
 * 
 * @return AudioPlayer
 */
AudioPlayer.prototype.mute = function(){
    this._volume = this._audio.volume;
    this._audio.volume = 0;
    this._mute = true;

    return this;
}

/**
 * Unmute audio
 * 
 * @return AudioPlayer
 */
AudioPlayer.prototype.unmute = function(){
    this._audio.volume = this._volume;
    this._mute = false;

    return this;
}

/**
 * Return audio status
 * 
 * @return boolean
 */
AudioPlayer.prototype.isPlaying = function(){
    return this._audio.currentTime > 0 && !this._audio.paused;
}

/**
 * Get type
 * 
 * @return Object
 */
AudioPlayer.prototype.type = function(){
    return this._type;
}

/**
 * Get metadata
 * 
 * @return Object
 */
AudioPlayer.prototype.metadata = function(){
    return this._metadata;
}
