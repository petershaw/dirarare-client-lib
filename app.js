
var clc = require('cli-color')
	, async = require('async')
	, _ = require('underscore')
	, artnetclient = require('artnet-node').Client
	, Matrix = require('./lib/matrix')
	, Movement = require('./lib/movement')
	, Animation = require('./lib/animation')
	, Polygon = require('./lib/objects/polygon')
	;
	
	
var matrix 		= new Matrix(8, 8);	
var movement 	= new Movement(matrix);
var polygon1	= new Polygon([0,0], [3,0], [3,6], [0,6]);
var polygon2	= new Polygon([3,1], [6,5], [6,6], [3,6]);

matrix.setTarget( console.log );
matrix.addElement('p1', polygon1);
matrix.addElement(polygon2);

var animation 	= new Animation(matrix);
animation.updateFrequency(500);
animation.updateFunction(function(){
	matrix.draw(function(data){
		console.log("== ", data);
	});
});

var moveright = [0,1]
var a1 = animation.add(3000, 'p1'
	, function(element, matrix, elements){
 		movement.moveBy( element.moveright );
 	}
);

animation.start();

// setInterval(function(){
// 	matrix.draw(function(data){
// 		console.log("== ", data);
// 	});
// }, 100);

