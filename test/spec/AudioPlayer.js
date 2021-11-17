/**
 * @author Cyril Vermande
 * @license MIT
 */

describe("new AudioPlayer()", function() {
	var audioPlayer = new AudioPlayer({ src:'test.mp3', metadata: { name: "Track" }, events:{ onplay:function(){} } });
		audioPlayer2 = new AudioPlayer();
	
	it("return AudioPlayer", function(){
		expect(audioPlayer instanceof AudioPlayer).toBe(true);
		expect(audioPlayer._type).toEqual('html5');
		expect(audioPlayer._metadata.name).toEqual("Track");
		expect(audioPlayer._audio.src).toMatch(/test.mp3$/);
		expect(audioPlayer._events.onplay instanceof Function).toBe(true);
		
		expect(audioPlayer2 instanceof AudioPlayer).toBe(true);
		expect(audioPlayer2._metadata).toEqual({});
		expect(audioPlayer2._audio.src).toBe('');
		expect(audioPlayer2._events).toEqual({});
	});
});

describe("AudioPlayer.prototype.play()", function() {
	var audioPlayer = new AudioPlayer({ src:'test.mp3', events:{ onplay:function(){} } });
		audioPlayer._audio.volume = 0;

	var a;
	beforeEach(function(done) {
		spyOn(audioPlayer._events, 'onplay');
		a = audioPlayer.play();
		setTimeout(function(){
			done();
		}, 100);
	});

	it("play audio", function(){
		expect(a instanceof AudioPlayer).toBe(true);
		expect(audioPlayer._audio.currentTime).toBeGreaterThan(0);
		expect(audioPlayer._audio.paused).toBe(false);
		expect(audioPlayer._events.onplay).toHaveBeenCalled();
	});
});

describe("AudioPlayer.prototype.pause()", function() {
	var audioPlayer = new AudioPlayer({ src:'test.mp3', events:{ onpause:function(){} } });
		audioPlayer._audio.volume = 0;
		audioPlayer.play();

	var a;
	beforeEach(function(done) {
		spyOn(audioPlayer._events, 'onpause');
		a = audioPlayer.pause();
		setTimeout(function(){
			done();
		}, 100);
	});

	it("pause audio", function(){
		expect(a instanceof AudioPlayer).toBe(true);
		expect(audioPlayer._audio.paused).toBe(true);
		expect(audioPlayer._events.onpause).toHaveBeenCalled();
	});
});

describe("AudioPlayer.prototype.stop()", function() {
	var audioPlayer = new AudioPlayer({ src:'test.mp3', events:{ onfinish:function(){} } });
		audioPlayer._audio.volume = 0;
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
		expect(audioPlayer._audio.currentTime).toBe(0);
		expect(audioPlayer._audio.paused).toBe(true);
	});
});

describe("AudioPlayer.prototype.isPlaying()", function() {
	var audioPlayer = new AudioPlayer({ src:'test.mp3' });
		audioPlayer._audio.volume = 0;
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
		audioPlayer._audio.volume = 0;
		audioPlayer.play();

	it("set current position", function(){
		var a = audioPlayer.position(10);
		expect(a instanceof AudioPlayer).toBe(true);
		expect(audioPlayer._audio.currentTime).toBeGreaterThan(9);
	});

	it("get current position", function(){
		expect(audioPlayer.position()).toBeGreaterThan(9);
	});

	it("throw exception if invalid argument", function(){
		var testString = function(){
			audioPlayer.position('a');
		};
		var testNegative = function(){
			audioPlayer.position(-1);
		};
		expect(testString).toThrow();
		expect(testNegative).toThrow();
	});
});

describe("AudioPlayer.prototype.duration()", function() {
	var audioPlayer = new AudioPlayer({ src:'test.mp3' });
		audioPlayer._audio.volume = 0;
		audioPlayer.play();

	it("get audio duration", function(){
		expect(audioPlayer.duration()).toBeGreaterThan(30);
	});
});

describe("AudioPlayer.prototype.source()", function() {
	var audioPlayer = new AudioPlayer({ src:'test.mp3' });
		audioPlayer._audio.volume = 0;

	it("set source", function(){
		var a = audioPlayer.source('http://localhost/stormplayer/test/test.mp3');
		expect(a instanceof AudioPlayer).toBe(true);
		expect(audioPlayer._audio.src).toBe('http://localhost/stormplayer/test/test.mp3');
	});

	it("get source", function(){
		expect(audioPlayer.source()).toBe('http://localhost/stormplayer/test/test.mp3');
	});

	it("throw exception if invalid argument", function(){
		var testNumber = function(){
			audioPlayer.source(123);
		};
		var testObject = function(){
			audioPlayer.source({});
		};
		expect(testNumber).toThrow();
		expect(testObject).toThrow();
	});
});

describe("AudioPlayer.prototype.mute()", function() {
	var audioPlayer = new AudioPlayer({ src:'test.mp3' });
		audioPlayer._audio.volume = 1;
		//audioPlayer.play();

	it("mute audio element", function(){
		var a = audioPlayer.mute();
		expect(a instanceof AudioPlayer).toBe(true);
		expect(audioPlayer._mute).toBe(true);
		expect(audioPlayer._volume).toBe(1);
		expect(audioPlayer._audio.volume).toBe(0);
	});
});

describe("AudioPlayer.prototype.unmute()", function() {
	var audioPlayer = new AudioPlayer({ src:'test.mp3' });
		audioPlayer._audio.volume = 0;
		//audioPlayer.play();

	it("mute audio element", function(){
		var a = audioPlayer.unmute();
		expect(a instanceof AudioPlayer).toBe(true);
		expect(audioPlayer._mute).toBe(false);
		expect(audioPlayer._volume).toBe(1);
		expect(audioPlayer._audio.volume).toBe(1);
	});
});

describe("AudioPlayer.prototype.volume()", function() {
	var audioPlayer = new AudioPlayer({ src:'test.mp3' });
		audioPlayer._audio.volume = 1;
		//audioPlayer.play();

	it("set volume of audio element", function(){
		var a = audioPlayer.volume(0);
		expect(a instanceof AudioPlayer).toBe(true);
		expect(audioPlayer._audio.volume).toBe(0);
	});

	it("get volume of audio element", function(){
		expect(audioPlayer.volume()).toBe(0);
	});

	it("throw exception if invalid argument", function(){
		var testString = function(){
			audioPlayer.volume('a');
		};
		var testNegative = function(){
			audioPlayer.volume(-1);
		};
		var testSuperior = function(){
			audioPlayer.volume(1.5);
		};
		expect(testString).toThrow();
		expect(testNegative).toThrow();
		expect(testSuperior).toThrow();
	});
});

describe("AudioPlayer.prototype.type()", function() {
	var audioPlayer = new AudioPlayer({ src:'test.mp3' });

	it("get type", function(){
		expect(audioPlayer.type()).toBe('html5');
	});
});

describe("AudioPlayer.prototype.metadata()", function() {
	var audioPlayer = new AudioPlayer({ src:'test.mp3', metadata: { name: "Track" } });

	it("get metadata", function(){
		expect(audioPlayer.metadata().name).toBe("Track");
	});
});
