/**
 * @var StormPlayer
 */
var StormPlayer = function(options){
    this.tracklist = new StormPlayerTracklist();

    this._repeat = false;
    this._random = false;
    this._mute = false;
    this._duration = 0;
    this._events = options.events || {};
};

/**
 * @param string url URL to resolve to get list of tracks
 * @param object options List of available options: autoplay (bool), index (int), context (string), append (bool)
 * @return void
 */
StormPlayer.prototype.loadTracklistFromUrl = function(url, options){
    var _this = this;

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (content) {
        var tracks = content.tracks || [content];

        if (!options.append) {
            _this.setTracklist(tracks, options);
        } else {
            _this.addTracklist(tracks, options);
        }
    });
};

/**
 * @param array tracks
 * @param object options List of available options: autoplay (bool), index (int)
 * @return void
 */
StormPlayer.prototype.setTracklist = function(tracks, options){
    if(this.tracklist.length > 0 && this.tracklist.current().isPlaying()) this.tracklist.current().stop();

    this.tracklist.clear();
    this.addTracklist(tracks, options);

    if(options.autoplay){
        var index = options.index || 0;
        this.tracklist.current(index).play();
    }
};

/**
 * @param array tracks
 * @return void
 */
StormPlayer.prototype.addTracklist = function(tracks, options){
    for(var track,params,i=0,l=tracks.length; i<l; i++){
        track = tracks[i];
        if(track instanceof AudioPlayer || track instanceof YoutubePlayer || track instanceof SoundcloudPlayer || track instanceof BandcampPlayer){
            this.tracklist.add(track);
        }
        else if(track.audio.contentUrl){
            params = {
                src: track.audio.contentUrl,
                track: track,
                events: this._events,
                context: options.context || null,
            };

            if (params.src.match(/youtube.com/)) {
                this.tracklist.add(new YoutubePlayer(params));
            } else if (params.src.match(/soundcloud.com/)) {
                this.tracklist.add(new SoundcloudPlayer(params));
            } else if (params.src.match(/bandcamp.com/)) {
                this.tracklist.add(new BandcampPlayer(params));
            } else if (params.src.match(/audio.sonducoin.fr/)) {
                this.tracklist.add(new FunkwhalePlayer(params));
            } else {
                this.tracklist.add(new AudioPlayer(params));
            }
        }
    }
};

/**
 * @return void
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
};

/**
 * @return void
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
                else{
                    document.dispatchEvent(new CustomEvent('ontracklistend', { detail: this.tracklist.current().track }));
                }
            }
            else{
                this.tracklist.next().play();
            }
        }
    }
};

/**
 * @param bool update Set true to update duration
 * @return int
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
};

/**
 * @param bool value
 * @return bool|void
 */
StormPlayer.prototype.repeat = function(value){
    if(typeof value === 'undefined'){
        return this._repeat;
    }

    if(typeof value !== 'boolean'){
        throw new Error("Invalid argument value (" + value + ")");
    }

    this._repeat = value;
};

/**
 * @param bool value
 * @return bool|void
 */
StormPlayer.prototype.random = function(value){
    if(typeof value === 'undefined'){
        return this._random;
    }

    if(typeof value !== 'boolean'){
        throw new Error("Invalid argument value (" + value + ")");
    }

    this._random = value;
};

/**
 * @param int value
 * @return int|void
 */
StormPlayer.prototype.volume = function(value){
    if(typeof value === 'undefined'){
        return this.tracklist.current().volume();
    }

    if(typeof value !== 'number' || value < 0 || value > 1){
        throw new Error("Invalid argument value (" + value + ")");
    }
    
    this.tracklist.forEach(function(element){
        element.volume(value);
    });
};

/**
 * @param bool value
 * @return bool|void
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
};
