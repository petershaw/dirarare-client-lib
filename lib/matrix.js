
// Matrix
 
 
var _ = require('underscore')
	;
	
module.exports = function matrix(x, y) {

	var matrix = this;
	
	matrix.countLights = x * y;
	matrix.blackoutValues = [];
	matrix.current = [];
	
	matrix.init = function init(){
		var that = this;
		for(var i=0; i < that.countLights; i++) {
			that.blackoutValues[i] = 0;
		}
		that.current = that.blackoutValues;
	}

	matrix.blackout = function blackout(){
		var that = this;
		matrix.current = matrix.blackoutValues;
		return matrix.current;
	}

	matrix.init();
	
	return {
		countLights: 	this.countLights
		, blackout: 	this.blackout
		, matrix:		this.matrix
		, current:		this.current
	};
}
