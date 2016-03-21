/**
 * @author Cyril Vermande (cyril@cyrilwebdesign.com)
 * @license MIT
 */

var StormPlayer = function(params){
	this.tracklist = new Tracklist();
}
StormPlayer.prototype.setTracklist = function(tracklist, options) {
	this.tracklist = new Tracklist();
	var track;
	for(var i in tracklist){
		track = tracklist[i];
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
