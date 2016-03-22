/**
 * @author Cyril Vermande (cyril@cyrilwebdesign.com)
 * @license MIT
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
 * @return Object|Tracklist
 */
Tracklist.prototype.current = function(index){
	if(typeof index === 'undefined'){
		return this.elements[this.currentIndex];
	}
	else if(typeof index === 'number' && index >= 0 && index < this.elements.length){
		this.currentIndex = index;
		return this;
	}
}

/**
 * @param object element
 * 
 * @return Tracklist
 */
Tracklist.prototype.add = function(element){
	this.elements.push(element);
	this.currentIndex = null;
	return this;
}

/**
 * @param mixed index Index or instance of AudioPlayer
 * 
 * @return Tracklist
 */
Tracklist.prototype.remove = function(index){
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
