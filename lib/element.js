

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
 		element.midPoint = [ 
			(parseInt( a[0] + ((c[0] - a[0]) /2) ))
			, (parseInt( a[1] + ((c[1] - a[1]) /2) )) 
 		];
	}
	element.getMidPoint 	= function getMidPoint(){
		return element.midPoint;
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
		
	var pitch 		= point_b[1] - point_a[1];		// y
	var stretch 	= point_b[0] - point_a[0];		// x
	
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




