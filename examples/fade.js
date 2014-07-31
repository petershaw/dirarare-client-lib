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
	
	
var matrix 		= new Matrix(16, 8);	
var movement 	= new Movement(matrix);
var polygon1	= new Polygon([0, 0, 255], [7, 0, 255], [7, 7, 255], [0, 7, 255]);


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


var brightness = 255
var r1 = animation.add(300, 'p1'
	, function(element, matrix){
		brightness = brightness -10;
		if(brightness <= 0){ brightness = 255; }
		element.setGlobalBrightness(brightness);
	}
);


polygon1.enableLines();
polygon1.enableFill();

animation.start();

