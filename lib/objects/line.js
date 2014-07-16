

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

	line.init = function init(){
		var x_min = _.min(
			_.map(line.points, function(elm){
				return elm[0];
			})
		);
		var x_max = _.max(
			_.map(line.points, function(elm){
				return elm[0];
			})
		);	
		var y_min = _.min(
			_.map(line.points, function(elm){
				return elm[1];
			})
		);
		var y_max = _.max(
			_.map(line.points, function(elm){
				return elm[1];
			})
		);
		line.squareBounds.push( [x_min, y_min], [x_max, y_min], [x_max, y_max], [x_min, y_max] );
		line.setMidPoint( line.squareBounds[0], line.squareBounds[1], line.squareBounds[2], line.squareBounds[3] );
	}

	line.render = function render(callback){
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
	
	line.init();
	return _.extend({
		render:		this.render
		, disableLines: this.disableLines
		, enableLines:  this.enableLines
		, squareBounds: this.squareBounds
		, isPointInside:	this.isPointInside
	}, this.super);
}
