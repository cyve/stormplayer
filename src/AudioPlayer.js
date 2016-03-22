/**
 * @author Cyril Vermande (cyril@cyrilwebdesign.com)
 * @license MIT
 */

var AudioPlayer = function(params){
	this.type = 'html5';
	this.mute = false;
	this.muteVolume = 1;
	this.audio = document.createElement('audio');
	this.audio.src = params.src || null;
	this.events = {
		'onplay' : params.onplay || null,
		'onpause' : params.onpause || null,
		'onprogress' : params.onprogress || null,
		'onfinish' : params.onfinish || null
	};

	/*
	window.addEventListener('playing', this.audioElement, function(){
		_this.events['onplay'].call();
	});
	*/

	_this = this;
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
AudioPlayer.prototype.toggleMute = function(){
	if(this.mute){
		this.audio.volume = this.muteVolume;
		this.mute = false;
	}
	else{
		this.muteVolume = this.audio.volume;
		this.audio.volume = 0;
		this.mute = true;
	}
	return this;
}
