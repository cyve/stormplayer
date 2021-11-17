/**
 */

var StormPlayer = function(){
    this.tracklist = new Collection();

    this._repeat = false;
    this._random = false;
    this._mute = false;
    this._volume = 1;
    this._duration = 0;
};

StormPlayer.providers = {
    SONDUCOIN: 'sonducoin',
    SOUNDCLOUD: 'soundcloud',
    YOUTUBE: 'youtube'
};

StormPlayer.prototype.setTracklist = function(tracks, options){
    if(this.tracklist.length > 0 && this.tracklist.current().isPlaying()) this.tracklist.current().stop();
    
    this.tracklist = new Collection();
    this.addTracklist(tracks);
    
    if(options.autoplay){
        var index = options.index || 0;
        this.tracklist.current(index).play();
    }
};

StormPlayer.prototype.addTracklist = function(tracks){
    var track;
    for(var i in tracks){
        track = tracks[i];
        if(track instanceof AudioPlayer || track instanceof YoutubePlayer || track instanceof SoundcloudPlayer){
            this.tracklist.add(track);
        }
        else if(track.src){
            switch(track.provider){
                case StormPlayer.providers.YOUTUBE:
                    this.tracklist.add(new YoutubePlayer(track));
                    break
                case StormPlayer.providers.SOUNDCLOUD:
                    this.tracklist.add(new SoundcloudPlayer(track));
                    break;
                default:
                    this.tracklist.add(new AudioPlayer(track));
            }
        }
    }
};

/**
 * Prev
 * 
 * @return Stormplayer
 */
StormPlayer.prototype.prev = function(){
    if(this.tracklist.length){
        this.tracklist.current().stop();
        
        if(this.tracklist.index === 0){
            this.tracklist.current().play();
        }
        else{
            this.tracklist.prev().play();
        }
    }
    
    return this;
}

/**
 * Next
 * 
 * @return Stormplayer
 */
StormPlayer.prototype.next = function(){
    if(this.tracklist.length){
        this.tracklist.current().stop();
        
        if(this.random()){
            var randomIndex = parseInt(Math.random() * this.tracklist.length, 10);
            this.tracklist.current(randomIndex).play();
        }
        else{
            if(this.tracklist.index === this.tracklist.length-1){
                if(this.repeat()){
                    this.tracklist.first().play();
                }
            }
            else{
                this.tracklist.next().play();
            }
        }
    }
    
    return this;
}

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
