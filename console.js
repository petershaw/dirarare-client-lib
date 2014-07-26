#!/usr/bin/env node

/**
 * console.js
 * a console debugger for the dirarare-client-lib
 * this tool shows objects in a table on the console
 * use console.js for debugging and developing objects without a connected pixel wall
 *
 */
 
var clc 		= require('cli-color')
	, console	= require('better-console')
	, async 	= require('async')
	, _ 		= require('underscore')
	, fs		= require('fs')
	, S			= require('string')
	, Matrix 	= require('./lib/matrix')
	;

// defines a global err function
var err = function(/* err */){
	errs = Array.prototype.slice.call(arguments);
	_.each(errs, function(err){
		if(err){ console.error(clc.red(err)) }
	});
}

// First check if a list of objects is requested. 
// Print out a list of objects
var fullargs = _.clone(process.argv).slice(2);
var checkList = fullargs.shift();
if(checkList == '--list' || checkList == '-l'){
	console.log(clc.blue("List of available objects"));
	files = fs.readdirSync(__dirname +'/lib/objects');
	_.each(files, function(file){
		if(S(file).endsWith('.js')){
			file = S(file).chompRight('.js').s
			console.log(clc.green("\t"+file));
		}
	});
	process.exit(0);
}

// if not, than parse the argumets
var argv = require('optimist')
    .usage('Usage: $0 -object [line|polygon] -matrix [x,y] p1x,p1y p2y,p2y ...')
    .demand(['object','matrix'])
    .alias('o', 'object')
    .describe('o', 'which object to draw (see -list)')
    .alias('m', 'matrix')
    .describe('m', 'matrix size')
    .alias('l', 'list')
    .describe('l', 'show list of available objects')
    .alias('l', 'list')
    .argv;
	
// initialise the matrix and load the requested object
var Obj = null;
try {
	var Obj 		= require('./lib/objects/'+ argv.object)
} catch(e){
	err('Error while loading the object '+ argv.object, e);
	process.exit(0);
}
	
try {
	var matrix 		= new Matrix(
 		  parseInt( S(argv.matrix.split(',')[0]).trim() )
		, parseInt( S(argv.matrix.split(',')[1]).trim() )
	);	
} catch(e){
	err('Error while construction the matrix', e);
	process.exit(0);
}

// function to print the resulttable
var printtable = function(obj, data){
	console.log(clc.blue(
		"Draw points from object "
		+ argv.object 
		+": "
		+ argv._.join('|')
	));
	console.log(clc.green(data.join("|")));
	var table = [];
	for(y=0;y < 8; y++){
		var row = [];
		for(x=0;x < 8;x++){
			var test = _.find(data, function(e){ 
				if(e[0]==x && e[1]==y) return 1;
			});
			if( test ){
				if(test[0] == points[0][0] && test[1] == points[0][1] || 
					test[0] == points[1][0] && test[1] == points[1][1] ){
					row.push("X");
				}
				else if(test[0] == obj.midPoint[0] && test[1] == obj.midPoint[1] ){
					row.push("+");
				} else {
					row.push("-");
				}
			} else {
				if(x == obj.midPoint[0] && y == obj.midPoint[1] ){
					row.push("+");
				} else {
					row.push(" ");
				}
			}
		}
		table.push(row);
	}
	console.table(table);
}

// construction the element
console.clear();
var points = [];
_.each(argv._, function(p){
	points.push([
		  parseInt(p.split(",")[0])
		, parseInt(p.split(",")[1])
	]);
});

var objElement = Obj.apply(this, points);
matrix.setTarget(
	function(data){
		printtable(objElement, data);
	}
);
matrix.addElement( objElement );

matrix.draw();
	







