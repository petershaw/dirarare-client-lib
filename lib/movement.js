
// Movement - moves an object
 
 
var _ = require('underscore')
	;
	
module.exports = function movement(matrix) {

	var movement = this;
	var matrix = matrix;
	
	movement.moveBy = function(element, movedesc,  callback){
		
		_.each(element.points, function(point){ 
			point[0] += movedesc[0];
			point[1] += movedesc[1];
		});
		callback(element);
	}

	return {
		  moveBy:		this.moveBy
	};
}
