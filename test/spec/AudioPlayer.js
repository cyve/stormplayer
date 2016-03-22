/**
 * @author Cyril Vermande (cyril@cyrilwebdesign.com)
 * @license MIT
 */

describe("AudioPlayer.prototype.play()", function() {
	var audioPlayer = new AudioPlayer({ src:'test.mp3', events:{ onplay:function(){} } });
		audioPlayer.audio.volume = 0;
	
	var a;
	beforeEach(function(done) {
		spyOn(audioPlayer.events, 'onplay');
		a = audioPlayer.play();
		setTimeout(function(){
			done();
		}, 100);
	});
	
	it("play audio", function(){
		expect(a instanceof AudioPlayer).toBe(true);
		expect(audioPlayer.audio.currentTime).toBeGreaterThan(0);
		expect(audioPlayer.audio.paused).toBe(false);
		expect(audioPlayer.events.onplay).toHaveBeenCalled();
	});
});

describe("AudioPlayer.prototype.pause()", function() {
	var audioPlayer = new AudioPlayer({ src:'test.mp3', events:{ onpause:function(){} } });
		audioPlayer.audio.volume = 0;
		audioPlayer.play();
	
	var a;
	beforeEach(function(done) {
		spyOn(audioPlayer.events, 'onpause');
		a = audioPlayer.pause();
		setTimeout(function(){
			done();
		}, 100);
	});

	it("pause audio", function(){
		expect(a instanceof AudioPlayer).toBe(true);
		expect(audioPlayer.audio.paused).toBe(true);
		expect(audioPlayer.events.onpause).toHaveBeenCalled();
	});
});

describe("AudioPlayer.prototype.stop()", function() {
	var audioPlayer = new AudioPlayer({ src:'test.mp3', events:{ onfinish:function(){} } });
		audioPlayer.audio.volume = 0;
		audioPlayer.play();
	
	var a;
	beforeEach(function(done) {
		a = audioPlayer.stop();
		setTimeout(function(){
			done();
		}, 100);
	});

	it("stop audio", function(){
		expect(a instanceof AudioPlayer).toBe(true);
		expect(audioPlayer.audio.currentTime).toBe(0);
		expect(audioPlayer.audio.paused).toBe(true);
	});
});

describe("AudioPlayer.prototype.isPlaying()", function() {
	var audioPlayer = new AudioPlayer({ src:'test.mp3' });
		audioPlayer.audio.volume = 0;
	beforeEach(function(done) {
		audioPlayer.play();
		setTimeout(function(){
			done();
		}, 100);
	});
	
	it("get audio status", function(){
		expect(audioPlayer.isPlaying()).toBe(true);
	});
});

describe("AudioPlayer.prototype.position()", function() {
	var audioPlayer = new AudioPlayer({ src:'test.mp3' });
		audioPlayer.audio.volume = 0;
		audioPlayer.play();

	it("set current position", function(){
		var a = audioPlayer.position(10);
		expect(a instanceof AudioPlayer).toBe(true);
		expect(audioPlayer.audio.currentTime).toBeGreaterThan(9);
	});

	it("get current position", function(){
		expect(audioPlayer.position()).toBeGreaterThan(9);
	});
});

describe("AudioPlayer.prototype.duration()", function() {
	var audioPlayer = new AudioPlayer({ src:'test.mp3' });
		audioPlayer.audio.volume = 0;
		audioPlayer.play();
	
	it("get audio duration", function(){
		expect(audioPlayer.duration()).toBeGreaterThan(30);
	});
});

describe("AudioPlayer.prototype.source()", function() {
	var audioPlayer = new AudioPlayer({ src:'test.mp3' });
		audioPlayer.audio.volume = 0;
	
	it("set source", function(){
		var a = audioPlayer.source('http://localhost/stormplayer/test/test.mp3');
		expect(a instanceof AudioPlayer).toBe(true);
		expect(audioPlayer.audio.src).toBe('http://localhost/stormplayer/test/test.mp3');
	});

	it("get source", function(){
		expect(audioPlayer.source()).toBe('http://localhost/stormplayer/test/test.mp3');
	});
});

describe("AudioPlayer.prototype.mute()", function() {
	var audioPlayer = new AudioPlayer({ src:'test.mp3' });
		audioPlayer.audio.volume = 1;
		//audioPlayer.play();
	
	it("mute audio element", function(){
		var a = audioPlayer.mute();
		expect(a instanceof AudioPlayer).toBe(true);
		expect(audioPlayer._mute).toBe(true);
		expect(audioPlayer._volume).toBe(1);
		expect(audioPlayer.audio.volume).toBe(0);
	});
});

describe("AudioPlayer.prototype.unmute()", function() {
	var audioPlayer = new AudioPlayer({ src:'test.mp3' });
		audioPlayer.audio.volume = 0;
		//audioPlayer.play();
	
	it("mute audio element", function(){
		var a = audioPlayer.unmute();
		expect(a instanceof AudioPlayer).toBe(true);
		expect(audioPlayer._mute).toBe(false);
		expect(audioPlayer._volume).toBe(1);
		expect(audioPlayer.audio.volume).toBe(1);
	});
});

describe("AudioPlayer.prototype.toogleMute()", function() {
	var audioPlayer = new AudioPlayer({ src:'test.mp3' });
		audioPlayer.audio.volume = 1;
		//audioPlayer.play();
	
	it("mute audio element", function(){
		var a = audioPlayer.toggleMute();
		expect(a instanceof AudioPlayer).toBe(true);
		expect(audioPlayer._mute).toBe(true);
		expect(audioPlayer._volume).toBe(1);
		expect(audioPlayer.audio.volume).toBe(0);
	});
});

describe("AudioPlayer.prototype.volume()", function() {
	var audioPlayer = new AudioPlayer({ src:'test.mp3' });
		audioPlayer.audio.volume = 1;
		//audioPlayer.play();
	
	it("set volume of audio element", function(){
		var a = audioPlayer.volume(0);
		expect(a instanceof AudioPlayer).toBe(true);
		expect(audioPlayer.audio.volume).toBe(0);
	});

	it("get volume of audio element", function(){
		expect(audioPlayer.volume()).toBe(0);
	});
});
