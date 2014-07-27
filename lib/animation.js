
// Animation
// Register animations for an element
 
var _ = require('underscore')
	;
	
Animation = module.exports = function animation(matrix) {
	var animation = this;
	
	animation.matrix = matrix;
	animation.frequency = 1000;
	animation.fn = null;
	animation.tasks = [];
	
	animation.updateFrequency = function updateFrequency(ms){
		animation.frequency = ms;
	}

	animation.updateFunction = function updateFunction(fn){
		animation.fn = fn;
	}
	
	return animation;
}

Animation.prototype.add( /* list of args: time, element name, functions */){
	hia. 
}

