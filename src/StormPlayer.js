/**
 * @author Cyril Vermande (cyril@cyrilwebdesign.com)
 * @license MIT
 */

var StormPlayer = function(params){
	this.tracklist = new Tracklist();

	this.repeat = false;
	this.random = false;
	this.mute = false;
	this.duration = 0;

	//this.playerDefaultEvents = params.events ||
}
StormPlayer.prototype.setTracklist = function(tracks, options) {
	this.tracklist = new Tracklist();
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
