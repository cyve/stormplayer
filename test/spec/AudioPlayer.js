/**
 * @author Cyril Vermande (cyril@cyrilwebdesign.com)
 * @license MIT
 */

describe("AudioPlayer.prototype.play()", function() {
	var a;
	beforeEach(function(done) {
		a = audioPlayer.play();
		setTimeout(function(){
			done();
		}, 100);
	});

	it("return instanceof AudioPlayer", function(){
		expect(a instanceof AudioPlayer).toBe(true);
	});

	it("play audio", function(done){
		expect(audioPlayer.audio.currentTime).toBeGreaterThan(0);
		done();
	});
});

describe("AudioPlayer.prototype.position()", function() {
	var a = audioPlayer.position(10);
	
	it("return instanceof AudioPlayer", function(){
		expect(a instanceof AudioPlayer).toBe(true);
	});

	it("set current position", function(){
		expect(audioPlayer.audio.currentTime).toBeCloseTo(10,1);
	});

	it("get current position", function(){
		expect(audioPlayer.position()).toBeCloseTo(10,1);
	});
});

describe("AudioPlayer.prototype.source()", function() {
	var a = audioPlayer.source('http://localhost/stormplayer/test/test.mp3');
	
	it("return instanceof AudioPlayer", function(){
		expect(a instanceof AudioPlayer).toBe(true);
	});

	it("set source", function(){
		expect(audioPlayer.audio.src).toBe('http://localhost/stormplayer/test/test.mp3');
	});

	it("get source", function(){
		expect(audioPlayer.source()).toBe('http://localhost/stormplayer/test/test.mp3');
	});
});

describe("AudioPlayer.prototype.toogleMute()", function() {
	var a = audioPlayer.toggleMute();
	
	it("return instanceof AudioPlayer", function(){
		expect(a instanceof AudioPlayer).toBe(true);
	});

	it("mute audio element", function(){
		expect(audioPlayer.mute).toBe(true);
		expect(audioPlayer.muteVolume).toBe(1);
	});
});

describe("AudioPlayer.prototype.volume()", function() {
	var a = audioPlayer.volume(0.5);
	
	it("return instanceof AudioPlayer", function(){
		expect(a instanceof AudioPlayer).toBe(true);
	});

	it("set volume of audio element", function(){
		expect(audioPlayer.audio.volume).toBe(0.5);
	});

	it("get volume of audio element", function(){
		expect(audioPlayer.volume()).toBe(0.5);
	});
});

describe("AudioPlayer.prototype.pause()", function() {
	var a,pauseTime;
	beforeEach(function(done) {
		a = audioPlayer.pause();
		pauseTime = audioPlayer.audio.currentTime;
		setTimeout(function(){
			done();
		}, 100);
	});

	it("return instanceof AudioPlayer", function(){
		expect(a instanceof AudioPlayer).toBe(true);
	});

	it("pause audio", function(){
		expect(audioPlayer.audio.currentTime).toEqual(pauseTime);
	});
});

describe("AudioPlayer.prototype.stop()", function() {
	var a;
	beforeEach(function(done) {
		a = audioPlayer.stop();
		setTimeout(function(){
			done();
		}, 100);
	});

	it("return instanceof AudioPlayer", function(){
		expect(a instanceof AudioPlayer).toBe(true);
	});

	it("stop audio", function(){
		expect(audioPlayer.audio.currentTime).toBe(0);
	});
});
