

// Object - Abstract
//
//
 
 
var _ = require('underscore')
	;

var Element = module.exports = function element(){
	var element = this;
	
	element.data 			= [];
	element.midPoint 		= [];
	element.setMidPoint 	= function setMidPoint( a, b, c, d ){
		var line1 = this.drawLineBetweenTwoPoints(b, d);
		var line2 = this.drawLineBetweenTwoPoints(a, c);
		line1 = _.map(line1, function(point){
			return point[0]+"/"+point[1];
		});
		line2 = _.map(line2, function(point){
			return point[0]+"/"+point[1];
		});
		var intersection = _.intersection(line1, line2);
		var selectedMidPoint = intersection.shift();
		element.midPoint = [ 
			(parseInt(selectedMidPoint.split('/')[0]))
			, parseInt(selectedMidPoint.split('/')[1]) 
		];
	}
	
	return element
	;
	
}

Element.prototype.hasPoint = function hasPoint(point){
	var found = _.find(this.data, function(elm){
		if( elm[0] == point[0] && elm[1] == point[1]){
			return true;
		}
	});
	if(found){
		return true;
	}
	return false; 
}

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
	var stretch 	= point_b[0] - point_a[0];
	var pitch 		= point_b[1] - point_a[1];

	var points_x 	= [point_a[0], point_b[0]];
	var points_y 	= [point_a[1], point_b[1]];

	var newPoint = [];
	if( points_x[0] === points_x[1] ){
		if( points_y[0]	> points_y[1] ){
			points_x.reverse();
			points_y.reverse();
		}
		for(y=points_y[0] +1; y < points_y[1]; y++){
			var x = (stretch / pitch) * y + points_x[0];
			newPoint.push( [Math.abs(Math.round(x)), Math.abs(Math.round(y))] );
		}
	} else { 
		if( points_x[0]	> points_x[1] ){
			points_x.reverse();
			points_y.reverse();
		} 	
		for(x=points_x[0] +1; x < points_x[1]; x++){
			var y = (pitch / stretch) * x + points_y[0];
			newPoint.push( [Math.abs(Math.round(x)), Math.abs(Math.round(y))] );
		}
	}
	return newPoint;
}




