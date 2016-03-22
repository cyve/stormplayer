/**
 * @author Cyril Vermande (cyril@cyrilwebdesign.com)
 * @license MIT
 */

describe("Method Tracklist.prototype.add()", function() {
	var tracklist = new Tracklist();
	var a = tracklist.add(1);
	
	it("return instance of Tracklist", function(){
		expect(a instanceof Tracklist).toBe(true);
	});

	it("add element", function(){
		expect(tracklist.elements.length).toBe(1);
	});
});

describe("Method Tracklist.prototype.length()", function() {
	var tracklist = new Tracklist();
		tracklist.elements.push(1);
		tracklist.elements.push(2);

	it("return number of elements", function(){
		expect(tracklist.length()).toEqual(tracklist.elements.length);
	});
});

describe("Method Tracklist.prototype.current()", function() {
	var tracklist = new Tracklist();
		tracklist.elements.push(1);
		tracklist.elements.push(2);
	var a = tracklist.current(1);
	
	it("return instance of Tracklist", function(){
		expect(a instanceof Tracklist).toBe(true);
	});
	
	it("set current element", function(){
		expect(tracklist.currentIndex).toBe(1);
	});
	
	it("get current element", function(){
		expect(tracklist.current()).toBe(2);
	});
});

describe("Method Tracklist.prototype.remove()", function() {
	var tracklist = new Tracklist();
		tracklist.elements.push(1);
		tracklist.elements.push(2);
		tracklist.currentIndex = 0;
	var a = tracklist.remove(1);
	
	it("return instanceof Tracklist", function(){
		expect(a instanceof Tracklist).toBe(true);
	});

	it("remove an element", function(){
		expect(tracklist.elements.length).toBe(1);
	});
});

describe("Method Tracklist.prototype.empty()", function() {
	var tracklist = new Tracklist();
		tracklist.elements.push(1);
		tracklist.currentIndex = 0;
	var a = tracklist.empty();
	
	it("return instanceof Tracklist", function(){
		expect(a instanceof Tracklist).toBe(true);
	});

	it("remove all elements", function(){
		expect(tracklist.elements.length).toBe(0);
		expect(tracklist.currentIndex).toBeNull();
	});
});
