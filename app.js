
var clc = require('cli-color')
	, async = require('async')
	, _ = require('underscore')
	, artnetclient = require('artnet-node').Client
	, Matrix = require('./lib/matrix')
	, Movement = require('./lib/movement')
	, Polygon = require('./lib/objects/polygon')
	;
	

DO NOT USE -- NOT EVEN BEGUN TO IMPLEMENT
use the tests!
	
var matrix 		= new Matrix(8, 8);	
var movement 	= new Movement(matrix);
var polygon1	= new Polygon([0,0], [3,0], [3,6], [0,6]);
var polygon2	= new Polygon([3,1], [6,5], [6,6], [3,6]);

matrix.updateFrequency(250);

movement.setMove([+1, 0], function(o){o[0] *= -1}, 300);
polygon1.addMovement(movement);


matrix.addElement(polygon1);

setInterval(function(){
	matrix.renderAll(function(data){
		console.log("== ", data);
	});
}, 100);

