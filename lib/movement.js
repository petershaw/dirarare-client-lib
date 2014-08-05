
// Movement 
// moves an object

var _ = require('underscore')
	;

module.exports = function movement(matrix) {
	var movement = this;
	
	/**
	 * moveBy 
	 * moves an object by coordinates [x, y] 
	 */	
	movement.moveBy = function(element, movedesc, callback){
		_.each(element.points, function(point){ 
			point[0] += movedesc[0];
			point[1] += movedesc[1];
		});
		if(typeof callback == 'function'){
			callback(element);
		}
	}
	
	/**
	 * moveTo 
	 * moves an object to coordinates [x, y] 
	 */	
	movement.moveTo = function(element, movedesc, callback){
		// get element.midPoint and find factor to removed position.
		// move all points with factor
		var moveX = (element.midPoint[0] - movedesc[0]) *-1;
		var moveY = (element.midPoint[1] - movedesc[1]) *-1;	
		_.each(element.points, function(point){ 
			point[0] += moveX;
			point[1] += moveY;
		});
		if(typeof callback == 'function'){
			callback(element);
		}
	}
	
	// Public API
	return {
		    moveBy:		this.moveBy
		  , moveTo:		this.moveTo
	};
}
