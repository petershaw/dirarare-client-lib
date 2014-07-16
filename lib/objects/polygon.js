

// Object - Polygon
// even a Square :-)
//
// A--------B
// |        |
// D--------C
//
 
 
var _ 			= require('underscore')
	, Element 	= require("../element")
	;

var Polygon = module.exports = function polygon(/* list of path points */){
	this.super = new Element();
	var polygon = _.extend(this, this.super);

	polygon.points = Array.prototype.slice.call(arguments);

	polygon.isLined 		= false;
	polygon.isFilled		= false;
	polygon.brightness		= 255;
	polygon.squareBounds	= [];

	polygon.init = function init(){
		var x_min = _.min(
			_.map(polygon.points, function(elm){
				return elm[0];
			})
		);
		var x_max = _.max(
			_.map(polygon.points, function(elm){
				return elm[0];
			})
		);	
		var y_min = _.min(
			_.map(polygon.points, function(elm){
				return elm[1];
			})
		);
		var y_max = _.max(
			_.map(polygon.points, function(elm){
				return elm[1];
			})
		);
		polygon.squareBounds.push( [x_min, y_min], [x_max, y_min], [x_max, y_max], [x_min, y_max] );
		polygon.setMidPoint( polygon.squareBounds[0], polygon.squareBounds[1], polygon.squareBounds[2], polygon.squareBounds[3] );
	}

	polygon.render = function render(callback){
		// set  points to object
		polygon.data = _.clone(polygon.points);
		
		// Draw lines between the points.
		if( polygon.isLined === true || polygon.isFilled === true){
			_.each( polygon.drawLineBetweenTwoPoints( polygon.points[ polygon.points.length -1], polygon.points[0] ), function(point){
				polygon.data.push(point);
			});
			for(i=0; i<polygon.points.length -1; i++){
				_.each( polygon.drawLineBetweenTwoPoints( polygon.points[i], polygon.points[i +1] ), function(point){
					polygon.data.push(point);
				});
			}
		}
		
		// Fill the Object
		if( polygon.isFilled === true ){
			var min = polygon.squareBounds[0];
			var max = polygon.squareBounds[2];
			// x <->, y ^
			for( x = min[0]; x <= max[0]; x++){
				for( y = min[1]; y <= max[1]; y++){
					if(polygon.hasPoint([ x, y ]) === false && polygon.isPointInside([ x, y ]) ){
						polygon.data.push([x, y]);
					}
				}
			}
		}
		
		if(typeof callback == "function") {		
			callback(polygon.data);
		}
	}

	polygon.disableLines = function disableLines(){
		polygon.isLined = false;
	}
	
	polygon.enableLines = function enableLines(){
		polygon.isLined = true;
	}
	
	polygon.disableFill = function disableFill(){
		polygon.isFilled = false;
	}
	
	polygon.enableFill = function enableFill(){
		polygon.isFilled = true;	
	}
	
	polygon.isPointInside 	= function isPointInside(point){
		var inside = false;
		var x = point[0];
		var y = point[1];
		for (var i = 0, j = polygon.points.length - 1; i < polygon.points.length; j = i++) {
        	var xi = polygon.points[i][0], yi = polygon.points[i][1];
    	    var xj = polygon.points[j][0], yj = polygon.points[j][1];
	        var intersect = ((yi > y) != (yj > y))
        	    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    	    if (intersect) inside = !inside;
	    }
    	return inside;
	}
	
	polygon.init();
	return _.extend({
		render:				this.render
		, disableLines: 	this.disableLines
		, enableLines:  	this.enableLines
		, disableFill:		this.disableFill
		, enableFill:		this.enableFill
		, squareBounds: 	this.squareBounds
		, isPointInside:	this.isPointInside
	}, this.super);
}
