

// Element - Abstract
// use one of the objects, that extended this element.
// Contains abstract methods for all objects:
//
// Midpoint calculation
// Has Point check
// Commit position 
// Draw lines between two given points
// Resize function
 
 
var _ = require('underscore')
	;

/**
 * Abstract Element
 *
 * use the element in your object:
 * this.super = new Element();
 * var myObject = _.extend(this, this.super);
 *
 */
var Element = module.exports = function element(){
	// the current element
	var element = this;
	
	// given points 
	element.points 			= [];
	
	// all data, filled and lined [x, y, brightness]
	element.data 			= [];
	
	// calculated midpoint
	element.midPoint 		= [];
	
	// the square that bounds the whole object
	element.squareBounds	= [];
	
	// The global brightness
	element.brightness = null;
	
	// function to set the points from your subclass into this parent
	element.setPoints		= function setPoints(/* args */){
		element.points = Array.prototype.slice.call(arguments);
		if( element.points.length == 1 ){
			element.points = element.points.shift();
		}
	}
	
  	element.setGlobalBrightness = function setGlobalBrightness( brightness ){
  		element.brightness = brightness;
  	}

  	element.getGlobalBrightness = function setGlobalBrightness( ){
  		return element.brightness;
  	}

	return element;
}

/**
 * setMidPoint
 * calculates the midpoint 
 */
Element.prototype.setMidPoint 	= function setMidPoint( a, b, c, d ){
    this.midPoint[0] = (parseInt( a[0] + ((c[0] - a[0]) /2) ));
 	this.midPoint[1] = (parseInt( a[1] + ((c[1] - a[1]) /2) ));
}

/**
 * getMidPoint
 * returns the calculated midpoint
 */
Element.prototype.getMidPoint 	= function getMidPoint(){
	return this.midPoint;
}

/**
 * hasPoint 
 * checks if a given point is one of the objects point
 */
Element.prototype.hasPoint = function hasPoint(point){
	var found = _.find(this.data, function(elm){
		if( elm[0] == point[0] && elm[1] == point[1] ){
			return true;
		}
	});
	if(found){
		return true;
	}
	return false; 
}

/**
 * drawLineBetweenTwoPoints
 * draws a line between to points :-) 
 */
Element.prototype.drawLineBetweenTwoPoints = function drawLineBetweenTwoPoints(point_a, point_b){
	/**
	 * 	Lineare Gleichung: y = m · x + b
	 *  ---------------------------------------------------
	 *  b = y-Achsenabschnitt
	 *  m = Steigung
	 *  
	 *  eg: y = 2 · x + 1
	 *
	 *  var y = pitch * x + square.points[1][1];
	 *  var x = (y - square.points[2][0]) / lengthBC;
	 */ 
	var that 		= this;
		
	var pitch 		= point_b[1] - point_a[1];	// y
	var stretch 	= point_b[0] - point_a[0];	// x

	var newPoint = [];
	if(Math.abs(stretch) >= Math.abs(pitch)){
		// turn around if a < b
		if(point_a[0] > point_b[0]){
			var tempPoint = point_a;
			point_a = point_b;
			point_b = tempPoint;
		}
		var m = pitch / stretch;	 	
 		for(x=point_a[0] +1; x < point_b[0]; x++){
			y = (m * ( x - point_b[0] )) + point_b[1];
			newPoint.push( [Math.round(x), Math.round(y)] );
	 	}
	} else {
		// turn around if a < b
		if(point_a[1] > point_b[1]){
			var tempPoint = point_a;
			point_a = point_b;
			point_b = tempPoint;
		}
		var m = stretch / pitch ;
	 	for(y=point_a[1] +1; y < point_b[1]; y++){
	 		var x = (m * ( y - point_b[1] )) + point_b[0];
			newPoint.push( [Math.round(x), Math.round(y)] );
	 	}	
	}

	return newPoint;
}

/**
 * resise
 * resize the object by value in all directions
 */
Element.prototype.resize = function(value){
	var that = this;
	_.each(this.points, function(point){
		var pitch 		= that.midPoint[1] - point[1];	// y
		var stretch 	= that.midPoint[0] - point[0];	// x
		var m = pitch / stretch;
		
		if(point[0] > that.midPoint[0]){
			if( m < 0 ){
				point[0] += value;
				point[1] -= value;
			} else {
				point[0] += value;
				point[1] += value;
			}
		} else if(point[0] < that.midPoint[0]){
			if( m > 0 ){
				point[0] -= value;
				point[1] -= value;
			} else {
				point[0] -= value;
				point[1] += value;
			}
		} else {
			// x ist gleich 
			if(point[1] > that.midPoint[1]){
				point[1] += value;
			} else if(point[1] > that.midPoint[1]){
				point[1] -= value;
			} 
		}
	});
}

/**
 * commitPosition
 * commits the position. Use this function after a move.
 * its recalculates the framing square
 */
Element.prototype.commitPosition = function commitPosition(){
	var that = this;
	var x_min = _.min(
		_.map(that.points, function(elm){
			if(elm){
			return elm[0];
			}
		})
	);
	var x_max = _.max(
		_.map(that.points, function(elm){
			if(elm){
			return elm[0];
			}

		})
	);	
	var y_min = _.min(
		_.map(that.points, function(elm){
			if(elm){
			return elm[1];
			}
		})
	);
	var y_max = _.max(
		_.map(that.points, function(elm){
			if(elm){
			return elm[1];
			}
		})
	);
	this.setPoints(that.points);
	this.squareBounds = [ 
		  [x_min, y_min]
		, [x_max, y_min]
		, [x_max, y_max]
		, [x_min, y_max]
	];
	this.setMidPoint( 
		  this.squareBounds[0]
		, this.squareBounds[1]
		, this.squareBounds[2]
		, this.squareBounds[3] 
	);
}

