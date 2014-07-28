
var clc = require('cli-color')
	, async = require('async')
	, _ = require('underscore')
	, artnetclient = require('artnet-node').Client
	, Matrix = require('./lib/matrix')
	, Movement = require('./lib/movement')
	, Animation = require('./lib/animation')
	, Polygon = require('./lib/objects/polygon')
	;
	
	
var matrix 		= new Matrix(16, 16);	
var movement 	= new Movement(matrix);
var polygon1	= new Polygon([0,0], [3,0], [3,3], [0,3]);
var polygon2	= new Polygon([4,4], [5,4], [5,5], [4,5]);

var ConsolePrinter = require('./lib/printer/console')(matrix);

matrix.setTarget( ConsolePrinter );
matrix.addElement('p1', polygon1);
// matrix.addElement('p2', polygon2);

var animation 	= new Animation(matrix);
animation.updateFrequency(50);
animation.updateFunction(function(){
	matrix.draw(function(data){
		//console.log("== ", data);
	});
});

var moveright = [1,0];
var movedown = [0,1];
var a1 = animation.add(150, 'p1'
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

var resizer = -5;
var a2 = animation.add(800, 'p1'
	, function(element, matrix){
		resizer = resizer +1;
		if(resizer > 5){ resizer = -4; }
		if(resizer < 0){
			element.resize(1);
		} else if (resizer > 1){
			element.resize(-1);
		} 
	}
);

polygon1.enableLines();
polygon1.enableFill();

animation.start();

