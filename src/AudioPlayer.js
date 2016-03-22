/**
 * @author Cyril Vermande (cyril@cyrilwebdesign.com)
 * @license MIT
 */

var AudioPlayer = function(params){
	this.type = 'html5';
	this._mute = false;
	this._volume = 1;
	this.audio = document.createElement('audio');
	this.audio.src = params.src || null;
	this.events = params.events || {};
	
	var _this = this;
	this.audio.addEventListener('playing', function(e){
		if(typeof _this.events.onplay === 'function'){
			_this.events.onplay.call(_this, e);
		}
	});
	this.audio.addEventListener('pause', function(e){
		if(typeof _this.events.onpause === 'function'){
			_this.events.onpause.call(_this, e);
		}
	});
	this.audio.addEventListener('timeupdate', function(e){
		if(typeof _this.events.ontimeupdate === 'function'){
			_this.events.ontimeupdate.call(_this, e, _this.audio.currentTime);
		}
	});
	this.audio.addEventListener('ended', function(e){
		if(typeof _this.events.onfinish === 'function'){
			_this.events.onfinish.call(_this, e);
		}
	});
	this.audio.addEventListener('error', function(e, error){
		if(typeof _this.events.onerror === 'function'){
			_this.events.onerror.call(_this, e, error);
		}
	});
}

/**
 * @return AudioPlayer
 */
AudioPlayer.prototype.play = function(){
	this.audio.play();
	return this;
}

/**
 * @return AudioPlayer
 */
AudioPlayer.prototype.pause = function(){
	this.audio.pause();
	return this;
}

/**
 * @return AudioPlayer
 */
AudioPlayer.prototype.stop = function(){
	this.audio.pause();
	this.audio.currentTime = 0;
	return this;
}

/**
 * @param int value
 * @return int|AudioPlayer
 */
AudioPlayer.prototype.position = function(value){
	if(typeof value === 'undefined'){
		return this.audio.currentTime;
	}
	else{
		this.audio.currentTime = value;
		return this;
	}
}

/**
 * @return int
 */
AudioPlayer.prototype.duration = function(){
	return this.audio.duration;
}

/**
 * @param string value
 * @return string|AudioPlayer
 */
AudioPlayer.prototype.source = function(value){
	if(typeof value === 'undefined'){
		return this.audio.src;
	}
	else{
		this.audio.src = value;
		return this;
	}
}

/**
 * @param string value
 * @return int|AudioPlayer
 */
AudioPlayer.prototype.volume = function(value){
	if(typeof value === 'undefined'){
		return this.audio.volume;
	}
	else{
		this.audio.volume = value;
		return this;
	}
}

/**
 * @return AudioPlayer
 */
AudioPlayer.prototype.mute = function(){
	this._volume = this.audio.volume;
	this.audio.volume = 0;
	this._mute = true;
	return this;
}

/**
 * @return AudioPlayer
 */
AudioPlayer.prototype.unmute = function(){
	this.audio.volume = this._volume;
	this._mute = false;
	return this;
}

/**
 * @return AudioPlayer
 */
AudioPlayer.prototype.toggleMute = function(){
	if(this._mute){
		return this.unmute();
	}
	return this.mute();
}

/**
 * @return boolean
 */
AudioPlayer.prototype.isPlaying = function(){
	return this.audio.currentTime > 0 && !this.audio.paused;
}
