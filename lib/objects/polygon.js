

// Object - Polygon
// even a Square :-)
//
// A--------B
// |        |
// D--------C
//
// or something other with more points

var _ 			= require('underscore')
	, Element 	= require("../element")
	;

var Polygon = module.exports = function polygon(/* list of path points */){
	// Extends from global Element
	this.super = new Element();
	var polygon = _.extend(this, this.super);
	
	// get all points from the initialisation call
	polygon.points = Array.prototype.slice.call(arguments);

	// set defaults
	polygon.isLined 		= false;	// draw lines between the points
	polygon.isFilled		= false;	// fill the element
	
	polygon.setGlobalBrightness(polygon.brightness || 255);
	
	/**
	 * render
	 * renders the object to callback(data)
	 */
	polygon.render = function render(callback){
		var that = this;
		this.brightness = polygon.getGlobalBrightness();
		polygon.commitPosition();
		// set  points to object
		polygon.data = _.map(_.clone(polygon.points), function setInitialBrightness(point){
			point[2] = that.brightness;
			return point;
		});
	
		// Draw lines between the points.
		if( polygon.isLined === true || polygon.isFilled === true){
			_.each( polygon.drawLineBetweenTwoPoints( 
				  polygon.points[ polygon.points.length -1]
				, polygon.points[0] 
				), function(point){
					point[2] = that.brightness;
					polygon.data.push(point);
				}
			);
			for(i=0; i < polygon.points.length -1; i++){
				_.each( polygon.drawLineBetweenTwoPoints( 
					  polygon.points[i]
					, polygon.points[i +1] 
					), function(point){
						point[2] = that.brightness;
						polygon.data.push(point);
					}
				);
			}
		}
		
		// Fill the Object
		if( polygon.isFilled === true ){
			var min = polygon.squareBounds[0];
			var max = polygon.squareBounds[2];		
			// x <->, y ^
			for( x = min[0]; x <= max[0]; x++){
				for( y = min[1]; y <= max[1]; y++){
					if(polygon.hasPoint([x, y]) === false && polygon.isPointInside([x, y]) ){
						polygon.data.push([x, y, that.brightness]);
					}
				}
			}
		}
		
		// return the data into the callback, or fallback
		if(typeof callback == "function") {
			return callback(polygon.data);
		}
		return polygon.data;
	}

	/**
	 * Call disableLines to disable the lines between the points
	 */
	polygon.disableLines = function disableLines(){
		polygon.isLined = false;
	}
	
	/**
	 * Call enableLines to enable the lines between the points
	 */
	polygon.enableLines = function enableLines(){
		polygon.isLined = true;
	}

	/**
	 * Call disableFill to disable fills inside the polygon
	 */	
	polygon.disableFill = function disableFill(){
		polygon.isFilled = false;
	}
	
	/**
	 * Call enableFill to enable fills inside the polygon
	 */	
	polygon.enableFill = function enableFill(){
		polygon.isFilled = true;	
	}
	
	// call initial commitPosition
	polygon.commitPosition();
	
	polygon.isPointInside 	= function isPointInside(point){
		var inside = false;
		var x = point[0];
		var y = point[1];
	
		for (var i = 0, j = this.points.length -1; i < this.points.length; j = i++) {
			var xi = this.points[i][0], yi = this.points[i][1];
			var xj = this.points[j][0], yj = this.points[j][1];
			var intersect = ((yi > y) != (yj > y))
				&& (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
			if (intersect) inside = !inside;
		}
    	return inside;
	}
	
	// Public API
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