/**
 * @author Cyril Vermande (cyril@cyrilwebdesign.com)
 * @license MIT
 */

describe("Method Tracklist.prototype.add()", function() {
	var tracklist = new Tracklist();

	it("add element", function(){
		var a = tracklist.add(1);
		expect(a instanceof Tracklist).toBe(true);
		expect(tracklist.elements).toEqual([1]);
	});

	it("add elements", function(){
		var a = tracklist.add([5,6]);
		expect(a instanceof Tracklist).toBe(true);
		expect(tracklist.elements).toEqual([1,5,6]);
	});

	it("insert element", function(){
		var a = tracklist.add(2, 1);
		expect(a instanceof Tracklist).toBe(true);
		expect(tracklist.elements).toEqual([1,2,5,6]);
	});

	it("insert elements", function(){
		var a = tracklist.add([3,4], 2);
		expect(a instanceof Tracklist).toBe(true);
		expect(tracklist.elements).toEqual([1,2,3,4,5,6]);
	});

	it("throw exception if invalid argument", function(){
		var testString = function(){
			tracklist.add(9,'a');
		};
		var testNegative = function(){
			tracklist.add(9,-1);
		};
		var testSuperior = function(){
			tracklist.add(9,100);
		};
		expect(testString).toThrow();
		expect(testNegative).toThrow();
		expect(testSuperior).toThrow();
	});
});

describe("Method Tracklist.prototype.length()", function() {
	var tracklist = new Tracklist();
		tracklist.elements = [1,2,3,4];
		tracklist.currentIndex = 0;

	it("return number of elements", function(){
		expect(tracklist.length()).toBe(4);
	});
});

describe("Method Tracklist.prototype.current()", function() {
	var tracklist = new Tracklist();
		tracklist.elements = [1,2,3,4];
		tracklist.currentIndex = 1;

	it("get current element", function(){
		expect(tracklist.current()).toBe(2);
	});

	it("set current element", function(){
		tracklist.current(1);
		expect(tracklist.currentIndex).toBe(1);
	});

	it("throw exception if invalid argument", function(){
		var testString = function(){
			tracklist.current('a');
		};
		var testNegative = function(){
			tracklist.current(-1);
		};
		var testSuperior = function(){
			tracklist.current(100);
		};
		expect(testString).toThrow();
		expect(testNegative).toThrow();
		expect(testSuperior).toThrow();
	});
});

describe("Method Tracklist.prototype.prev()", function() {
	var tracklist = new Tracklist();
		tracklist.elements = [1,2,3,4];
		tracklist.currentIndex = 1;

	it("get previous element", function(){
		expect(tracklist.prev()).toBe(1);
	});

	it("set current element", function(){
		expect(tracklist.currentIndex).toBe(0);
	});
});

describe("Method Tracklist.prototype.next()", function() {
	var tracklist = new Tracklist();
		tracklist.elements = [1,2,3,4];
		tracklist.currentIndex = 0;

	it("get next element", function(){
		expect(tracklist.next()).toBe(2);
	});

	it("set current element", function(){
		expect(tracklist.currentIndex).toBe(1);
	});
});

describe("Method Tracklist.prototype.first()", function() {
	var tracklist = new Tracklist();
		tracklist.elements = [1,2,3,4];
		tracklist.currentIndex = 0;

	it("get first element", function(){
		expect(tracklist.first()).toBe(1);
	});

	it("set current element", function(){
		expect(tracklist.currentIndex).toBe(0);
	});
});

describe("Method Tracklist.prototype.last()", function() {
	var tracklist = new Tracklist();
		tracklist.elements = [1,2,3,4];
		tracklist.currentIndex = 0;

	it("get last element", function(){
		expect(tracklist.last()).toBe(4);
	});

	it("set current element", function(){
		expect(tracklist.currentIndex).toBe(3);
	});
});

describe("Method Tracklist.prototype.move()", function() {
	var tracklist = new Tracklist();
		tracklist.elements = [1,2,3,4];
		tracklist.currentIndex = 0;

	it("remove an element", function(){
		var a = tracklist.move(1,2);
		expect(a instanceof Tracklist).toBe(true);
		expect(tracklist.elements).toEqual([1,3,2,4]);
	});

	it("throw exception if invalid argument", function(){
		var testString = function(){
			tracklist.move(1,'a');
		};
		var testNegative = function(){
			tracklist.move(1,-1);
		};
		var testSuperior = function(){
			tracklist.move(1,100);
		};
		expect(testString).toThrow();
		expect(testNegative).toThrow();
		expect(testSuperior).toThrow();
	});
});

describe("Method Tracklist.prototype.remove()", function() {
	var tracklist = new Tracklist();
		tracklist.elements = [1,2,3,4];
		tracklist.currentIndex = 0;

	it("remove an element", function(){
		var a = tracklist.remove(1);
		expect(a instanceof Tracklist).toBe(true);
		expect(tracklist.elements).toEqual([1,3,4]);
	});
});

describe("Method Tracklist.prototype.empty()", function() {
	var tracklist = new Tracklist();
		tracklist.elements = [1,2,3,4];
		tracklist.currentIndex = 0;

	it("remove all elements", function(){
		var a = tracklist.empty();
		expect(a instanceof Tracklist).toBe(true);
		expect(tracklist.elements).toEqual([]);
		expect(tracklist.currentIndex).toBeNull();
	});
});
