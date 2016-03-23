/**
 * @author Cyril Vermande (cyril@cyrilwebdesign.com)
 * @license MIT
 */

var StormPlayer = function(){
	this.tracklist = new Collection();

	this._repeat = false;
	this._random = false;
	this._mute = false;
	this._volume = 1;
	this._duration = 0;

	//this.playerDefaultEvents = params.events ||
}
StormPlayer.prototype.setTracklist = function(tracks, options) {
	this.tracklist = new Collection();
	var track;
	for(var i in tracks){
		track = tracks[i];
		if(track instanceof AudioPlayer){
			this.tracklist.add(track);
		}
		else{
			this.tracklist.add(new AudioPlayer({ src: track.src}));
		}
	}

	if(options.autoplay){
		//this.tracklist.play(options.current ? 0);
	}
};

/**
 * Get duration
 * 
 * @param boolean update Set true to update duration
 * 
 * @return integer
 */
StormPlayer.prototype.duration = function(update){
	if(typeof update !== 'undefined' && update){
		var duration = 0;
		this.tracklist.forEach(function(element){
			duration += element.duration();
		});
		this._duration = duration;
	}
	
	return this._duration;
}

/**
 * Get/set repeat
 * 
 * @param boolean value
 * 
 * @return mixed
 * @throw Error if argument is invalid
 */
StormPlayer.prototype.repeat = function(value){
	if(typeof value === 'undefined'){
		return this._repeat;
	}

	if(typeof value !== 'boolean'){
		throw new Error("Invalid argument value (" + value + ")");
	}

	this._repeat = value;

	return this;
}

/**
 * Get/set random
 * 
 * @param boolean value
 * 
 * @return mixed
 * @throw Error if argument is invalid
 */
StormPlayer.prototype.random = function(value){
	if(typeof value === 'undefined'){
		return this._random;
	}

	if(typeof value !== 'boolean'){
		throw new Error("Invalid argument value (" + value + ")");
	}

	this._random = value;

	return this;
}

/**
 * Get/set volume
 * 
 * @param integer value
 * 
 * @return mixed
 * @throw Error if argument is invalid
 */
StormPlayer.prototype.volume = function(value){
	if(typeof value === 'undefined'){
		return this._volume;
	}

	if(typeof value !== 'number' || value < 0 || value > 1){
		throw new Error("Invalid argument value (" + value + ")");
	}
	
	this.tracklist.forEach(function(element){
		element.volume(value);
	});

	this._volume = value;

	return this;
}

/**
 * Mute/unmute
 * 
 * @param boolean value
 * 
 * @return mixed
 * @throw Error if argument is invalid
 */
StormPlayer.prototype.mute = function(value){
	if(typeof value === 'undefined'){
		return this._mute;
	}

	if(typeof value !== 'boolean'){
		throw new Error("Invalid argument value (" + value + ")");
	}

	if(value){
		this.tracklist.forEach(function(element){
			element.mute();
		});
	}
	else{
		this.tracklist.forEach(function(element){
			element.unmute();
		});
	}
	this._mute = value;

	return this;
}
