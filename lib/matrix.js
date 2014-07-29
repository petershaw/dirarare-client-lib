
// Matrix
// Representation of the overall matrix
 
var _ = require('underscore')
	;
	
Matrix = module.exports = function matrix(x, y) {
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
		matrix.target( matrix.current );
		return matrix.current;
	}
	
	/**
	 * Add a element to the matrix.
	 * Add a anonymous element by addElement(element);
	 * or add a named element by addElement(name, element);
	 */
	matrix.addElement = function addElement(a, b){
		if(typeof a != 'string' && b == null){
			matrix.elementObjects.push({element:a});
		} else {
			matrix.elementObjects.push({name:a, element:b});
		}
	}
	
	matrix.getElementByName = function addElement(name){
		return _.findWhere(matrix.elementObjects, {name:name});
	}

	matrix.setTarget = function setTarget(fn){
		matrix.target = fn;
	}

	matrix.draw = function draw(){
		var pixel = [];
		_.each(matrix.elementObjects, function(obj){
			obj.element.render(function(data){
				data = _.map(data, function(point){
					if(point[0] <= matrix.x 
						&& point[1] <= matrix.y){
						return point;
					} 
				});
				pixel = pixel.concat(_.compact(data));
			});
		});
		matrix.current = _.uniq(pixel);
		matrix.target(matrix.current);
	}

	matrix.getElementByName = function getElementByName(name){
		return _.findWhere(matrix.elementObjects, {name: name});
	}

	// auto call init
	matrix.init();
	
	// Public API
	return {
		countLights: 		this.countLights
		, blackout: 		this.blackout
		, matrix:			this.matrix
		, current:			this.current
		, addElement:		this.addElement
		, setTarget:		this.setTarget
		, draw:				this.draw
		, dimension:		{x: this.x, y: this.y}
		, getElementByName:	this.getElementByName
	};
}

