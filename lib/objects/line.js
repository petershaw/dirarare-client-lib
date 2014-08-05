

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
		this.resize(1);
		for (var i = 0, j = this.points.length -1; i < this.points.length; j = i++) {
			var test = _.compact(
				_.map(this.drawLineBetweenTwoPoints(this.points[i], this.points[j]), function(p){
					if(p[0] == x && p[1] == y){
						return true;
					}
				})
			);
			if(test.length > 0){
				inside = true;
			}
		}
		this.resize(-1);
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
