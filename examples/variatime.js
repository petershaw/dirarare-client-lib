#!/usr/bin/env node

var clc = require('cli-color')
	, async = require('async')
	, _ = require('underscore')
	, artnetclient = require('artnet-node').Client
	, Matrix = require('../lib/matrix')
	, Movement = require('../lib/movement')
	, Animation = require('../lib/animation')
	, Polygon = require('../lib/objects/polygon')
	, Line = require('../lib/objects/line')
	;
	
	
var matrix 		= new Matrix(8, 8);	
var movement 	= new Movement(matrix);
var polygon1	= new Polygon([0,0], [5,0], [5,5], [0,5]);


var ConsolePrinter = require('../lib/printer/console')(matrix);
var ArtNetPrinter = require('../lib/printer/artnet')(matrix);

matrix.setTarget( ConsolePrinter );
//matrix.setTarget( ArtNetPrinter );

matrix.addElement('p1', polygon1);


var animation 	= new Animation(matrix);
animation.updateFrequency(30);
animation.updateFunction(function(){
	matrix.draw(function(data){
		//console.log("== ", data);
	});
});


var moveright = [1,0];
var movedown = [0,1];


var timeFunction = function(){
	var t = new Date().getTime();
	t = (Math.abs(Math.sin(t) * 200));

	return t;
}

var a1 = animation.add(timeFunction, 'p1'
	, function(element, matrix){
 		movement.moveBy( element, moveright );
 		if((element.midPoint[0] >= matrix.dimension.x)){
 			moveright[0] = -1;
 		}
 		if((element.midPoint[0] <= 0)){
 			moveright[0] = 1;
 		}
 	}
	, function(element, matrix){
 		movement.moveBy( element, movedown );
 		if(element.midPoint[1] >= matrix.dimension.y){
 			movedown[1] = -1;
 		}
 		if(element.midPoint[1] <= 0){
 			movedown[1] = 1;
 		}
 	}
);


polygon1.enableLines();
//polygon1.enableFill();

animation.start();

