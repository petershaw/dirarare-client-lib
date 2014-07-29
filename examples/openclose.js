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
var polygon1	= new Polygon([0,0], [7,0], [7,7], [0,7]);


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


var resizer = -3;
var r1 = animation.add(430, 'p1'
	, function(element, matrix){
		resizer = resizer +1;
		if(resizer > 3){ resizer = -3; }
		if(resizer < 0){
			element.resize(-1);
		} else if (resizer > 0){
			element.resize(1);
		} 
	}
);

var moveright = [0,0];
var movedown = [0,0];
setInterval(function(){
	moveright[0] = Math.floor((Math.random() * 8) + 1) -4;
	movedown[1] = Math.floor((Math.random() * 8) + 1) -4;
}, 5000);


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
 	, function(element, matrix){
 		var r = Math.floor((Math.random() * 10) + 1) -5;
 		if( r > 3 ){
 			element.enableFill();
 		} else {
 			element.disableFill();
 		}
 	}
);


polygon1.enableLines();
//polygon1.enableFill();

animation.start();

