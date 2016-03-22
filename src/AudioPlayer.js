/**
 * @author Cyril Vermande (cyril@cyrilwebdesign.com)
 * @license MIT
 */

var AudioPlayer = function(params){
	this.type = 'html5';
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
AudioPlayer.prototype.play = function(){
	this.audio.play();
	return this;
}
AudioPlayer.prototype.pause = function(){
	this.audio.pause();
	return this;
}
AudioPlayer.prototype.stop = function(){
	this.audio.pause();
	this.audio.currentTime = 0;
	return this;
}
AudioPlayer.prototype.position = function(value){
	if(typeof value === 'undefined'){
		return this.audio.currentTime;
	}
	else{
		this.audio.currentTime = value;
		return this;
	}
}
AudioPlayer.prototype.source = function(value){
	if(typeof value === 'undefined'){
		return this.audio.src;
	}
	else{
		this.audio.src = value;
		return this;
	}
}
AudioPlayer.prototype.volume = function(value){
	if(typeof value === 'undefined'){
		return this.audio.volume;
	}
	else{
		this.audio.volume = value;
		return this;
	}
}
