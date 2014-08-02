

// Object - Point
// Representation of a single point
//
// A
//
 
 
var _ 			= require('underscore')
	, Element 	= require("../element")
	;

var Point = module.exports = function point( coordinate ){
	this.super = new Element();
	var point = _.extend(this, this.super);

	point.points = [coordinate];

	point.brightness	= 255;
	point.squareBounds	= [];

	point.setGlobalBrightness(point.brightness || 255);
	
	point.render = function render(callback){
		var that = this;
		this.brightness = point.getGlobalBrightness();
		
		point.commitPosition();
		// set  points to object
		point.data = _.map(_.clone(point.points), function setInitialBrightness(point){
			point[2] = that.brightness;
			return point;
		});

		if(typeof callback == "function") {		
			callback(point.data);
		}
	}
	
	point.isPointInside 	= function isPointInside(point){
		var inside = false;
		var x = point[0];
		var y = point[1];
		for (var i = 0, j = point.points.length - 1; i < point.points.length; j = i++) {
        	var xi = point.points[i][0], yi = point.points[i][1];
    	    var xj = point.points[j][0], yj = point.points[j][1];
	        var intersect = ((yi > y) != (yj > y))
        	    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    	    if (intersect) inside = !inside;
	    }
    	return inside;
	}
	
	point.commitPosition();
	return _.extend({
		render:				this.render
		, squareBounds: 	this.squareBounds
		, isPointInside:	this.isPointInside
	}, this.super);
}
