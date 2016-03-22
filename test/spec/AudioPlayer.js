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

	it("audioPlayer.audio.currentTime > 0", function(done){
		expect(audioPlayer.audio.currentTime).toBeGreaterThan(0);
		done();
	});
});

describe("AudioPlayer.prototype.position()", function() {
	var a = audioPlayer.position(10);
	
	it("return instanceof AudioPlayer", function(){
		expect(a instanceof AudioPlayer).toBe(true);
	});

	it("audioPlayer.audio.currentTime >= 10", function(){
		expect(audioPlayer.audio.currentTime).toBeCloseTo(10,1);
		expect(audioPlayer.position()).toBeCloseTo(10,1);
	});
});

describe("AudioPlayer.prototype.source()", function() {
	var a = audioPlayer.source('http://localhost/stormplayer/test/test.mp3');
	
	it("return instanceof AudioPlayer", function(){
		expect(a instanceof AudioPlayer).toBe(true);
	});

	it("audioPlayer.audio.src >= 'http://localhost/stormplayer/test/test.mp3'", function(){
		expect(audioPlayer.audio.src).toBe('http://localhost/stormplayer/test/test.mp3');
		expect(audioPlayer.source()).toBe('http://localhost/stormplayer/test/test.mp3');
	});
});

describe("AudioPlayer.prototype.volume()", function() {
	var a = audioPlayer.volume(0.5);
	
	it("return instanceof AudioPlayer", function(){
		expect(a instanceof AudioPlayer).toBe(true);
	});

	it("audioPlayer.audio.volume = 0,5", function(){
		expect(audioPlayer.audio.volume).toBe(0.5);
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

	it("audioPlayer.audio.currentTime = pauseTime", function(){
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

	it("audioPlayer.audio.currentTime = 0", function(){
		expect(audioPlayer.audio.currentTime).toBe(0);
	});
});
