
var clc = require('cli-color')
	, async = require('async')
	, _ = require('underscore')
	, artnetclient = require('artnet-node').Client
	, Matrix = require('./lib/matrix')
	, Movement = require('./lib/movement')
	, Polygon = require('./lib/objects/polygon')
	;
	
	
var matrix 		= new Matrix(8, 8);	
var movement 	= new Movement(matrix);
var polygon		= new Polygon([0,0], [3,0], [1,6]);

// set movement options like bound on, paintover, etc.. 

// movement.down(polygon, function(){
// });

// movement.up(polygon, function(){
// });

// movement.to(polygon, [x,y], time_in_seconds, function(){
// });




