/**
 * @author Cyril Vermande (cyril@cyrilwebdesign.com)
 * @license MIT
 */

describe("Test setSource()", function() {
	audioPlayer.setSource('http://localhost/stormplayer/berceuse.mp3');

	it("audioPlayer.audio.src = http://localhost/stormplayer/berceuse.mp3", function(){
		expect(audioPlayer.audio.src).toBe('http://localhost/stormplayer/berceuse.mp3');
		expect(audioPlayer.getSource()).toBe('http://localhost/stormplayer/berceuse.mp3');
	});
});

describe("Test play()", function() {
	audioPlayer.play();

	it("audioPlayer.audio.currentTime > 0", function(done){
		setTimeout(function(){
			expect(audioPlayer.audio.currentTime).toBeGreaterThan(0);
		},500);
		done();
	});

	it("trigger onplaying event", function(){
		expect(status).toBe("playing");
	});
});

describe("Test setPosition()", function() {
	audioPlayer.setPosition(10);

	it("audioPlayer.audio.currentTime > 10", function(done){
		setTimeout(function(){
			expect(audioPlayer.audio.currentTime).toBeGreaterThan(10);
			expect(audioPlayer.getPosition()).toBeGreaterThan(10);
		},500);
		done();
	});
});

describe("Test setVolume()", function() {
	audioPlayer.setVolume(0.5);

	it("audioPlayer.audio.volume = 0,5", function(){
		expect(audioPlayer.audio.volume).toBe(0.5);
		expect(audioPlayer.getVolume()).toBe(0.5);
	});
});

describe("Test pause()", function() {
	it("audioPlayer.audio.currentTime > 10", function(done){
		setTimeout(function(){
			expect(audioPlayer.audio.currentTime).toBeGreaterThan(0);
		},500);
		done();
	});
});

describe("Test stop()", function() {
	audioPlayer.stop();

	it("audioPlayer.audio.currentTime = 0", function(){
		expect(audioPlayer.audio.currentTime).toBe(0);
	});
});
