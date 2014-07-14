
// Movement - moves an object
 
 
var _ = require('underscore')
	;
	
module.exports = function movement(matrix) {

	var movement = this;
	var matrix = matrix;
	
	movement.init = function init(){
		var that = this;
		that.matrix = matrix;
	}

	movement.up = function(object, callback){
		var result =  _.map(object, function(elm){
			return elm -8;
		});
		callback(null, result);
	}

	movement.down = function(object, callback){
		var that = this;
		var result = []; 
		// first turn off
		_.each(object, function(value, key, list){
			result[key] = 0;
		});	
		// than turn on
		_.each(object, function(value, key, list){
			result[key +8] = value;			
		});			
		callback(null, result);
	}

	movement.left = function(object, callback){
		var result =  _.map(object, function(elm){
			return elm -1;
		});
		callback(null, result);
	}

	movement.right = function(object, callback){
		var result =  _.map(object, function(elm){
			return elm +1;
		});
		callback(null, result);
	}

	movement.init();
	return {
		  up:		this.up
		, down:		this.down
		, left: 	this.left
		, right:	this.right
	};
}
