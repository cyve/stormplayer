/**
 * @author Cyril Vermande (cyril@cyrilwebdesign.com)
 * @license MIT
 */

var Tracklist = function(){
	this.elements = [];
	this.currentIndex = null;
}
Tracklist.prototype.length = function(){
	return this.elements.length;
}
Tracklist.prototype.current = function(value){
	if(typeof value === 'undefined'){
		return this.elements[this.currentIndex];
	}
	else if(typeof value === 'number' && value >= 0 && value < this.elements.length){
		this.currentIndex = value;
		return this;
	}
}
Tracklist.prototype.add = function(player){
	this.elements.push(player);
	this.currentIndex = null;
	return this;
}
Tracklist.prototype.remove = function(element){
	if(typeof element === "number"){
		this.elements.splice(element, 1);
	}
	else if(element instanceof AudioPlayer){
		for(var i in this.elements){
			if(this.elements[i].audioElement.src === element.audioElement.src){
				this.elements.splice(i, 1);
			}
		}
	}
	return this;
}
Tracklist.prototype.empty = function(){
	this.elements = [];
	this.currentIndex = null;
	return this;
}
