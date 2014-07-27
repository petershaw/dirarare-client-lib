
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
	var args = Array.prototype.slice.call(arguments);
	var time = args.shift();
	var name = args.shift();
	var fns = args;
	
	var element = animation.matrix.getElementByName(name);
	if(element == null){
		return new Error("Element "+ name +" is unknown");
	}
	animation.tasks.push({
		  time: time
		, element: element
		, fnlist: fns
	});
}

