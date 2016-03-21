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
AudioPlayer.prototype.setPosition = function(value){
	this.audio.currentTime = value;
	return this;
}
AudioPlayer.prototype.getPosition = function(){
	return this.audio.currentTime;
}
AudioPlayer.prototype.setSource = function(value){
	this.audio.src = value;
	return this;
}
AudioPlayer.prototype.getSource = function(){
	return this.audio.src;
}
AudioPlayer.prototype.setVolume = function(value){
	this.audio.volume = value;
	return this;
}
AudioPlayer.prototype.getVolume = function(){
	return this.audio.volume;
}
