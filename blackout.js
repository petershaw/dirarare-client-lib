#!/usr/bin/env node

var clc = require('cli-color')
	, Matrix = require('./lib/matrix')
	;
	
	
var matrix 		= new Matrix(8, 8);	


var ConsolePrinter = require('./lib/printer/console')(matrix);
var ArtNetPrinter = require('./lib/printer/artnet')(matrix);

matrix.setTarget( ArtNetPrinter );
matrix.blackout();


setTimeout(function(){
	process.exit(0);
}, 100);