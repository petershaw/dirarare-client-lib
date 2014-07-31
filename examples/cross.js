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
var line1	= new Polygon([3,0], [3,7]);
var line2	= new Polygon([0,2], [7,2]);

var ConsolePrinter = require('../lib/printer/console')(matrix);
var ArtNetPrinter = require('../lib/printer/artnet')(matrix);

matrix.setTarget( ConsolePrinter );
matrix.addElement('l1', line1);
matrix.addElement('l2', line2);

var animation 	= new Animation(matrix);
animation.updateFrequency(130);
animation.updateFunction(function(){
matrix.draw(function(data){
		//console.log("== ", data);
	});
});

var linedraw = 0;
setInterval(function(){
	linedraw++;
	if(linedraw == 1){
		line1.enableLines();
		line2.enableLines();
	} else {
		line1.disableLines();
		line2.disableLines();
	}
	if(linedraw>=3){ linedraw = 0 ;}
}, 10000);

var moveright = [-1,0];
var movedown = [0,-1];
setInterval(function(){
	moveright[0] = Math.floor((Math.random() * 8) + 1) -4;
	movedown[1] = Math.floor((Math.random() * 8) + 1) -4;
}, 5000);

var moveright2 = [1,0];
var movedown2 = [0,1];
setInterval(function(){
	moveright2[0] = Math.floor((Math.random() * 8) + 1) -4;
	movedown2[1] = Math.floor((Math.random() * 8) + 1) -4;
}, 5000);

var a1 = animation.add(130, 'l1'
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
var a1 = animation.add(130, 'l2'
	, function(element, matrix){
 		movement.moveBy( element, moveright2 );
 		if((element.midPoint[0] >= matrix.dimension.x)){
 			moveright2[0] = -1;
 		}
 		if((element.midPoint[0] <= 0)){
 			moveright2[0] = 1;
 		}
 	}
	, function(element, matrix){
 		movement.moveBy( element, movedown2 );
 		if(element.midPoint[1] >= matrix.dimension.y){
 			movedown2[1] = -1;
 		}
 		if(element.midPoint[1] <= 0){
 			movedown2[1] = 1;
 		}
 	}
);

animation.start();

