

// Object - Line
// even a arc?
//
// A--------B
//
 
 
var _ 			= require('underscore')
	, Element 	= require("../element")
	;

var Line = module.exports = function line(/* list of path points */){
	this.super = new Element();
	var line = _.extend(this, this.super);

	line.points = Array.prototype.slice.call(arguments);

	line.isLined 		= true;
	line.brightness		= 255;
	line.squareBounds	= [];

	line.render = function render(callback){
		line.commitPosition();
		// set  points to object
		line.data = _.clone(line.points);
		// Draw lines between the points.
		if( line.isLined === true ){
			for(i=0; i<line.points.length -1; i++){
				_.each( line.drawLineBetweenTwoPoints( line.points[i], line.points[i +1] ), function(point){
					line.data.push(point);
				});
			}
		}
		
		if(typeof callback == "function") {		
			callback(line.data);
		}
	}

	line.disableLines = function disableLines(){
		polygon.isLined = false;
	}
	
	line.enableLines = function enableLines(){
		polygon.isLined = true;
	}
	
	line.isPointInside 	= function isPointInside(point){
		var inside = false;
		var x = point[0];
		var y = point[1];
		for (var i = 0, j = line.points.length - 1; i < line.points.length; j = i++) {
        	var xi = line.points[i][0], yi = line.points[i][1];
    	    var xj = line.points[j][0], yj = line.points[j][1];
	        var intersect = ((yi > y) != (yj > y))
        	    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    	    if (intersect) inside = !inside;
	    }
    	return inside;
	}
	
	line.commitPosition();
	return _.extend({
		render:				this.render
		, commitPosition:	this.commitPosition
		, disableLines: 	this.disableLines
		, enableLines:  	this.enableLines
		, squareBounds: 	this.squareBounds
		, isPointInside:	this.isPointInside
	}, this.super);
}
