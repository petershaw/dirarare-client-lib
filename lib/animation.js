
// Animation
// Register animations for an element
 
var _ 			= require('underscore')
	, uuid		= require('node-uuid')
	, tick		= require('animation-loops')
	;
	
Animation = module.exports = function animation(matrix) {
	var animation = this;
	
	animation.matrix = matrix;
	animation.frequency = 1000;
	animation.fn = null;
	animation.tasks = [];
	animation.handle = null;
	
	animation.updateFrequency = function updateFrequency(ms){
		animation.frequency = ms;
	}

	animation.updateFunction = function updateFunction(fn){
		animation.fn = fn;
	}
	
	animation.animator = function animator(){
		_.each(animation.tasks, function task){
			task.elapsed += animation.frequency;
			if(task.elapsed > task.time){
			
			}
		});
		animation.fn()
	}
	
	animation.start = function start(){
		animation.handle = setInterval(
			  animation.animator
			, animation.frequency 
		);
	}
	
	return animation;
}

Animation.prototype.count = function count(){
	return this.tasks.length;
}

Animation.prototype.add = function add( /** list of args: time, element name, functions */ ){
	var id = uuid.v4()
	var args = Array.prototype.slice.call(arguments);
	var time = args.shift();
	var name = args.shift();
	var fns = args;
	
	var element = this.matrix.getElementByName(name);
	if(element == null){
		return new Error("Element "+ name +" is unknown");
	}
	this.tasks.push({
		  id:	id
		, time: time
		, element: element
		, fnlist: fns
		, elapsed: 0
	});
	return id;
}

Animation.prototype.remove = function remove(objectid){
	this.tasks = _.reject(this.tasks, function(elm){
		return elm.id == objectid;
	});
}
