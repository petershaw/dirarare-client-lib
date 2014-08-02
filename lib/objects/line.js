

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

	line.setGlobalBrightness(line.brightness || 255);

	line.render = function render(callback){
		var that = this;
		this.brightness = line.getGlobalBrightness();
		
		line.commitPosition();
		// set  points to object
		line.data = _.map(_.clone(line.points), function setInitialBrightness(point){
			point[2] = that.brightness || 255;
			return point;
		});
		
		// Draw lines between the points.
		if( line.isLined === true ){
			for(i=0; i<line.points.length -1; i++){
				_.each( line.drawLineBetweenTwoPoints( line.points[i], line.points[i +1] ), function(point){
					point[2] = point[2] || that.brightness || 255;
					line.data.push(point);
				});
			}
		}
		
		if(typeof callback == "function") {		
			callback(line.data);
		}
	}

	line.disableLines = function disableLines(){
		line.isLined = false;
	}
	
	line.enableLines = function enableLines(){
		line.isLined = true;
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
		, disableLines: 	this.disableLines
		, enableLines:  	this.enableLines
		, squareBounds: 	this.squareBounds
		, isPointInside:	this.isPointInside
	}, this.super);
}
