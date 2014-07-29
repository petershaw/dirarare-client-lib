
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

	// Public API
	return {
		  moveBy:		this.moveBy
	};
}
