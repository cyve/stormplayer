/**
 * @author Cyril Vermande
 * @license MIT
 */

describe("new StormPlayer()", function() {
	var player = new StormPlayer();
	
	it("return StormPlayer", function(){
		expect(player instanceof StormPlayer).toBe(true);
	});
	
	it("player.tracklist instance of Tracklist", function(){
		expect(player.tracklist instanceof Collection).toBe(true);
	});
});

describe("StormPlayer.prototype.duration()", function() {
	var player = new StormPlayer();
		player.tracklist.add(new AudioPlayer({ src:'test.mp3' }));

	var a;
	beforeEach(function(done) {
		setTimeout(function(){
			done();
		}, 100);
	});
	
	it("get duration (update)", function(){
		expect(player.duration(true)).toBeGreaterThan(30);
	});

	it("get duration", function(){
		expect(player.duration()).toBeGreaterThan(30);
	});
});

describe("StormPlayer.prototype.repeat()", function() {
	var player = new StormPlayer();

	it("set repeat", function(){
		var a = player.repeat(true);
		expect(a instanceof StormPlayer).toBe(true);
		expect(player._repeat).toBe(true);
	});
	
	it("get repeat", function(){
		expect(player.repeat()).toBe(true);
	});

	it("throw exception if invalid argument", function(){
		var testString = function(){
			collection.repeat('a');
		};
		var testNumber = function(){
			collection.repeat(1);
		};
		expect(testString).toThrow();
		expect(testNumber).toThrow();
	});
});

describe("StormPlayer.prototype.random()", function() {
	var player = new StormPlayer();

	it("set random", function(){
		var a = player.random(true);
		expect(a instanceof StormPlayer).toBe(true);
		expect(player._random).toBe(true);
	});
	
	it("get random", function(){
		expect(player.random()).toBe(true);
	});

	it("throw exception if invalid argument", function(){
		var testString = function(){
			collection.random('a');
		};
		var testNumber = function(){
			collection.random(1);
		};
		expect(testString).toThrow();
		expect(testNumber).toThrow();
	});
});

describe("StormPlayer.prototype.volume()", function() {
	var player = new StormPlayer();
		player.tracklist.add(new AudioPlayer({ src:'test.mp3' }));

	it("set volume", function(){
		var a = player.volume(0.5);
		expect(a instanceof StormPlayer).toBe(true);
		expect(player._volume).toBe(0.5);
		expect(player.tracklist.get(0).volume()).toBe(0.5);
	});

	it("get volume", function(){
		expect(player.volume()).toBe(0.5);
	});

	it("throw exception if invalid argument", function(){
		var testString = function(){
			player.volume('a');
		};
		var testNegative = function(){
			player.volume(-1);
		};
		var testSuperior = function(){
			player.volume(1.5);
		};
		expect(testString).toThrow();
		expect(testNegative).toThrow();
		expect(testSuperior).toThrow();
	});
});

describe("StormPlayer.prototype.mute()", function() {
	var player = new StormPlayer();
		player.tracklist.add(new AudioPlayer({ src:'test.mp3' }));

	it("set mute", function(){
		var a = player.mute(true);
		expect(a instanceof StormPlayer).toBe(true);
		expect(player._mute).toBe(true);
		expect(player.tracklist.get(0)._mute).toBe(true);
		expect(player.tracklist.get(0)._volume).toBe(1);
		expect(player.tracklist.get(0)._audio.volume).toBe(0);
	});
	
	it("get mute", function(){
		expect(player.mute()).toBe(true);
	});

	it("throw exception if invalid argument", function(){
		var testString = function(){
			collection.mute('a');
		};
		var testNumber = function(){
			collection.mute(1);
		};
		expect(testString).toThrow();
		expect(testNumber).toThrow();
	});
});
