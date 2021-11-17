/**
 * @var StormPlayerTracklist
 */
var StormPlayerTracklist = function(elements){
    this.elements = elements || [];
    this.index = this.elements.length ? 0 : null;
    this.length = this.elements.length;
};

/**
 * @param Object element
 * @return boolean
 */
StormPlayerTracklist.prototype.has = function(element){
    if(this.elements.length === 0){
        throw new Error("StormPlayerTracklist has no element");
    }

    for(var i in this.elements){
        if(this.elements[i] === element){
            return true;
        }
    }

    return false;
};

/**
 * @param int index
 * @return Object
 */
StormPlayerTracklist.prototype.current = function(index){
    if(this.elements.length === 0){
        throw new Error("StormPlayerTracklist has no element");
    }

    if(typeof index !== 'undefined'){
        if(typeof index !== 'number' || index < 0 || index >= this.elements.length){
            throw new Error("Invalid argument index (" + index + ")");
        }
        this.index = index;
    }

    if(this.index === null) this.index = 0;

    return this.elements[this.index];
};

/**
 * @param int index
 * @return Object
 */
StormPlayerTracklist.prototype.get = function(index){
    if(this.elements.length === 0){
        throw new Error("StormPlayerTracklist has no element");
    }

    if(typeof index !== 'number' || index < 0 || index >= this.elements.length){
        throw new Error("Invalid argument index (" + index + ")");
    }

    return this.elements[index];
};

/**
 * Return the first element and set it as current
 * 
 * @return Object
 */
StormPlayerTracklist.prototype.first = function(){
    if(this.elements.length === 0){
        throw new Error("StormPlayerTracklist has no element");
    }

    this.index = 0;

    return this.elements[this.index];
};

/**
 * Return the last element and set it as current
 * 
 * @return Object
 */
StormPlayerTracklist.prototype.last = function(){
    if(this.elements.length === 0){
        throw new Error("StormPlayerTracklist has no element");
    }

    this.index = this.elements.length - 1;

    return this.elements[this.index];
};

/**
 * Return the previous element and set it as current
 * 
 * @return Object
 */
StormPlayerTracklist.prototype.prev = function(){
    if(this.elements.length === 0){
        throw new Error("StormPlayerTracklist has no element");
    }

    if(this.index > 0){
        this.index--;
    }

    return this.elements[this.index];
};

/**
 * Return the next element and set it as current
 * 
 * @return Object
 */
StormPlayerTracklist.prototype.next = function(){
    if(this.elements.length === 0){
        throw new Error("StormPlayerTracklist has no element");
    }

    if(this.index < this.elements.length - 1){
        this.index++;
    }

    return this.elements[this.index];
};

/**
 * @param Object element
 * @param int position
 * @return StormPlayerTracklist
 */
StormPlayerTracklist.prototype.add = function(element, position){
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
        this.length = this.length + element.length;
    }
    else{
        if(typeof position === 'number'){
            this.elements.splice(position, 0, element);
        }
        else{
            this.elements.push(element);
        }
        this.length++;
    }

    if(this.index === null){
        this.index = 0;
    }

    return this;
};

/**
 * @param Object element
 * @return StormPlayerTracklist
 */
StormPlayerTracklist.prototype.push = function(element){
    return this.add(element);
};

/**
 * @param int index
 * @param int position
 * @return StormPlayerTracklist
 */
StormPlayerTracklist.prototype.move = function(index, position){
    if(this.elements.length === 0){
        throw new Error("StormPlayerTracklist has no element");
    }

    if(typeof position !== 'number' || position < 0 || position >= this.elements.length){
        throw new Error("Invalid argument position (" + position + ")");
    }

    var element = this.elements.splice(index, 1)[0];
    this.elements.splice(position, 0, element);

    if(index === this.index) this.index = position;

    return this;
};

/**
 * @param inte index
 * @return StormPlayerTracklist
 */
StormPlayerTracklist.prototype.remove = function(index){
    if(this.elements.length === 0){
        throw new Error("StormPlayerTracklist has no element");
    }

    if(typeof index !== 'number' || index < 0 || index >= this.elements.length){
        throw new Error("Invalid argument index (" + index + ")");
    }

    this.elements.splice(index, 1);

    if(this.elements.length === 0){
        this.index = null;
    }
    else if(index >= this.elements.length){
        this.index = this.elements.length - 1;
    }
    this.length--;

    return this;
};

/**
 * @return StormPlayerTracklist
 */
StormPlayerTracklist.prototype.clear = function(){
    this.elements = [];
    this.index = null;
    this.length = 0;

    return this;
};

/**
 * @return StormPlayerTracklist
 */
StormPlayerTracklist.prototype.forEach = function(callback){
    if(this.elements.length === 0){
        throw new Error("StormPlayerTracklist has no element");
    }

    if(typeof callback !== 'function'){
        throw new Error("Invalid argument callback");
    }

    for(var i in this.elements){
        callback(this.elements[i], i, this.elements);
    }

    return this;
};

/**
 * @return string
 */
StormPlayerTracklist.prototype.toJSON = function(){
    return JSON.stringify(this.elements);
};

/**
 * @return array
 */
StormPlayerTracklist.prototype.toArray = function(){
    return this.elements;
};
