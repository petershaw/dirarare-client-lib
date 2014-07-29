#!/usr/bin/env node

var clc = require('cli-color')
	, async = require('async')
	, _ = require('underscore')
	, artnetclient = require('artnet-node').Client
	, Matrix = require('../lib/matrix')
	, Movement = require('../lib/movement')
	, Animation = require('../lib/animation')
	, Polygon = require('../lib/objects/polygon')
	;
	
	
var matrix 		= new Matrix(8, 8);	
var movement 	= new Movement(matrix);
var polygon1	= new Polygon([4,0], [6,0], [6,2], [4,2]);

var ConsolePrinter = require('../lib/printer/console')(matrix);
var ArtNetPrinter = require('../lib/printer/artnet')(matrix);

matrix.setTarget( ArtNetPrinter );
matrix.addElement('p1', polygon1);
// matrix.addElement('p2', polygon2);

var animation 	= new Animation(matrix);
animation.updateFrequency(30);
animation.updateFunction(function(){
	matrix.draw(function(data){
		//console.log("== ", data);
	});
});

var moveright = [4,0];
var movedown = [0,1];

var a1 = animation.add(80, 'p1'
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

