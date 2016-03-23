/**
 * @author Cyril Vermande (cyril@cyrilwebdesign.com)
 * @license MIT
 */

/**
 * @return Tracklist
 */
var Tracklist = function(){
	this.elements = [];
	this.currentIndex = null;
}

/**
 * @return int
 */
Tracklist.prototype.length = function(){
	return this.elements.length;
}

/**
 * @param int index
 * 
 * @return Object
 */
Tracklist.prototype.current = function(index){
	if(typeof index !== 'undefined'){
		if(typeof index !== 'number' || index < 0 || index >= this.elements.length){
			throw new Error("Invalid argument index (" + index + ")");
		}
		this.currentIndex = index;
	}

	if(this.currentIndex === null) this.currentIndex = 0;

	return this.elements[this.currentIndex];
}

/**
 * @return Object
 */
Tracklist.prototype.first = function(){
	this.currentIndex = 0;

	return this.elements[this.currentIndex];
}

/**
 * @return Object
 */
Tracklist.prototype.prev = function(){
	if(this.currentIndex > 0){
		this.currentIndex--;
	}

	return this.elements[this.currentIndex];
}

/**
 * @return Object
 */
Tracklist.prototype.next = function(){
	if(this.currentIndex < this.elements.length - 1){
		this.currentIndex++;
	}

	return this.elements[this.currentIndex];
}


/**
 * @return Object
 */
Tracklist.prototype.last = function(){
	this.currentIndex = this.elements.length - 1;

	return this.elements[this.currentIndex];
}

/**
 * @param object element
 * 
 * @return Tracklist
 */
Tracklist.prototype.add = function(element, position){
	if(typeof position !== 'undefined' && (typeof position !== 'number' || position < 0 || position > this.elements.length)){
		throw new Error("Invalid argument position (" + position + ")");
	}

	if(element instanceof Array){
		if(typeof position !== 'undefined'){
			this.elements.splice.apply(this.elements, [position, 0].concat(element));
		}
		else{
			this.elements = this.elements.concat(element);
		}
	}
	else{
		if(typeof position === 'number'){
			this.elements.splice(position, 0, element);
		}
		else{
			this.elements.push(element);
		}
	}

	return this;
}

/**
 * @param mixed index Index or instance of AudioPlayer
 * 
 * @return Tracklist
 */
Tracklist.prototype.move = function(index, position){
	if(typeof position !== 'number' || position < 0 || position >= this.elements.length){
		throw new Error("Invalid argument position (" + position + ")");
	}

	if(index instanceof AudioPlayer){
		for(var i in this.elements){
			if(this.elements[i].source() === index.source()){
				index = i;
				break;
			}
		}
	}

	var element = this.elements.splice(index, 1)[0];
	this.elements.splice(position, 0, element);

	if(index === this.currentIndex) this.currentIndex = position;

	return this;
}

/**
 * @param mixed index Index or instance of AudioPlayer
 * 
 * @return Tracklist
 */
Tracklist.prototype.remove = function(index){
	if(typeof index !== 'number' || index < 0 || index >= this.elements.length){
		throw new Error("Invalid argument index (" + index + ")");
	}

	if(index instanceof AudioPlayer){
		for(var i in this.elements){
			if(this.elements[i].source() === index.source()){
				index = i;
				break;
			}
		}
	}

	if(index === this.currentIndex){
		this.current().stop();
	}

	this.elements.splice(index, 1);

	if(this.elements.length === 0){
		this.currentIndex = null;
	}
	else if(index >= this.elements.length){
		this.currentIndex = this.elements.length - 1;
	}

	return this;
}

/**
 * @return Tracklist
 */
Tracklist.prototype.empty = function(){
	this.elements = [];
	this.currentIndex = null;

	return this;
}
