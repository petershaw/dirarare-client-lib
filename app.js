
var clc = require('cli-color')
	, async = require('async')
	, _ = require('underscore')
	, artnetclient = require('artnet-node').Client
	, matrix = require('./lib/matrix')
	, movement = require('./lib/movement')
	;
	
	
var matrix 		= new matrix(8, 8);	
var movement 	= new movement(matrix);
	
var global = this;

setInterval(function(){

	global.pan = [];
	global.pan[0] = 50;
	global.pan[8] = 255;
	global.pan[16] = 50;

	movement.down(global.pan, function(err, result){
		global.pan = result;
		out = _.extend(blackout, global.pan);
		console.log(out);
	});
	process.exit(0);
	
}, 1000);