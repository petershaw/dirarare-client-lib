
// Matrix
// Representation of the overall matrix
 
var _ = require('underscore')
	;
	
module.exports = function matrix(x, y) {
	var matrix = this;
	
	matrix.x = x;
	matrix.y = y;
	matrix.countLights = x * y;
	matrix.blackoutValues = [];
	matrix.current = [];
	matrix.elementObjects = [];
	matrix.target = function(data){};
	
	/**
	 * Initialise the matrix
	 */ 
	matrix.init = function init(){
		var that = this;
		for(var i=0; i < that.countLights; i++) {
			that.blackoutValues[i] = 0;
		}
		that.current = that.blackoutValues;
	}

	/**
	 * blackout
	 * Turns all lights off
	 */
	matrix.blackout = function blackout(){
		matrix.current = matrix.blackoutValues;
		return matrix.current;
	}
	
	matrix.addElement = function addElement(element){
		matrix.elementObjects.push(element);
	}

	matrix.setTarget = function setTarget(fn){
		matrix.target = fn;
	}

	matrix.draw = function draw(){
		var pixel = [];
		_.each(matrix.elementObjects, function(obj){
			obj.render(function(data){
				pixel = pixel.concat(data);
			});
		});
		matrix.current = _.uniq(pixel);
		matrix.target(matrix.current);
	}

	// auto call init
	matrix.init();
	
	// Public API
	return {
		countLights: 	this.countLights
		, blackout: 	this.blackout
		, matrix:		this.matrix
		, current:		this.current
		, addElement:	this.addElement
		, setTarget:	this.setTarget
		, draw:			this.draw
		, dimension:	{x: this.x, y: this.y}
	};
}
