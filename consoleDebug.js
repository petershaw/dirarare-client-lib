
var clc 		= require('cli-color')
	, console	= require('better-console')
	, async 	= require('async')
	, _ 		= require('underscore')
	, Matrix 	= require('./lib/matrix')
	, Line 		= require('./lib/objects/line')
	, Polygon	= require('./lib/objects/polygon')
	;
	
	
var matrix 		= new Matrix(8, 8);	

var args = process.argv.slice(2);
var type = args.shift();

var printtable = function(obj, data){
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

if(type == 'line') {
	console.warn("Drawing a line between these points:");
	console.info(args);

	var points = [];
	_.each(args, function(p){
		var xy = p.split(",");
		points.push([parseInt(xy[0]), parseInt(xy[1])]);
	});
	var line		= new Line(points[0], points[1]);
	line.render(function(data){printtable(line, data);});
} else if(type == 'polygon') {
	console.warn("Drawing a polygon with these points:");
	console.info(args);

	var points = [];
	_.each(args, function(p){
		var xy = p.split(",");
		points.push([parseInt(xy[0]), parseInt(xy[1])]);
	});
	var polygon		= new Polygon(points[0], points[1], points[2], points[3]);
	polygon.enableLines();
	polygon.render(function(data){printtable(polygon, data);});
} else {
	console.error("Must define a type (line|polygon)");
}







