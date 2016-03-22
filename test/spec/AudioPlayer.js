/**
 * @author Cyril Vermande (cyril@cyrilwebdesign.com)
 * @license MIT
 */

describe("Test play()", function() {
	beforeEach(function(done) {
		audioPlayer.play();
		setTimeout(function(){
			done();
		}, 100);
	});

	it("audioPlayer.audio.currentTime > 0", function(done){
		expect(audioPlayer.audio.currentTime).toBeGreaterThan(0);
		done();
	});
});

describe("Test setPosition()", function() {
	var a = audioPlayer.setPosition(10);
	
	it("instanceof AudioPlayer", function(){
		expect(a instanceof AudioPlayer).toBe(true);
	});

	it("audioPlayer.audio.currentTime >= 10", function(){
		expect(audioPlayer.audio.currentTime).toBeCloseTo(10,1);
		expect(audioPlayer.getPosition()).toBeCloseTo(10,1);
	});
});

describe("Test setSource()", function() {
	var a = audioPlayer.setSource('http://localhost/stormplayer/test/test.mp3');
	
	it("instanceof AudioPlayer", function(){
		expect(a instanceof AudioPlayer).toBe(true);
	});

	it("audioPlayer.audio.src >= 'http://localhost/stormplayer/test/test.mp3'", function(){
		expect(audioPlayer.audio.src).toBe('http://localhost/stormplayer/test/test.mp3');
		expect(audioPlayer.getSource()).toBe('http://localhost/stormplayer/test/test.mp3');
	});
});

describe("Test setVolume()", function() {
	var a = audioPlayer.setVolume(0.5);
	
	it("instanceof AudioPlayer", function(){
		expect(a instanceof AudioPlayer).toBe(true);
	});

	it("audioPlayer.audio.volume = 0,5", function(){
		expect(audioPlayer.audio.volume).toBe(0.5);
		expect(audioPlayer.getVolume()).toBe(0.5);
	});
});

describe("Test pause()", function() {
	var pauseTime;
	beforeEach(function(done) {
		audioPlayer.pause();
		pauseTime = audioPlayer.audio.currentTime;
		setTimeout(function(){
			done();
		}, 100);
	});

	it("audioPlayer.audio.currentTime = pauseTime", function(){
		expect(audioPlayer.audio.currentTime).toEqual(pauseTime);
	});
});

describe("Test stop()", function() {
	beforeEach(function(done) {
		audioPlayer.stop();
		setTimeout(function(){
			done();
		}, 100);
	});

	it("audioPlayer.audio.currentTime = 0", function(){
		expect(audioPlayer.audio.currentTime).toBe(0);
	});
});
