/**
 * @author Cyril Vermande (cyril@cyrilwebdesign.com)
 * @license MIT
 */

var Tracklist = function(){
	this.elements = [];
}
Tracklist.prototype.add = function(player){
	this.elements.push(player);
	this.currentElementIndex = 0;
}
Tracklist.prototype.remove = function(element){
	if(typeof element === "integer"){
		this.elements.splice(element);
	}
	else if(element instanceof AudioPlayer){
		for(var i in this.elements){
			if(this.elements[i].audioElement.src === element.audioElement.src){
				this.elements.splice(i);
			}
		}
	}
}
Tracklist.prototype.empty = function(){
	this.elements = [];
}
Tracklist.prototype.play = function(index){
	this.elements[index].play();
	this.currentElementIndex = index;
}
Tracklist.prototype.pause = function(){
	this.elements[this.currentElementIndex].pause();
}
Tracklist.prototype.next = function(){
	this.play(++this.currentElementIndex);
}
