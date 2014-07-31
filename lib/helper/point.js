
// Matrix
// Representation of the overall matrix
 
var _ = require('underscore')
	;
	
PointHelper = module.exports = {

	getCoordinates: function getCoordinates(point){
		if(typeof point[0] === 'object'){
			return _.map(point, function(p){
				return [p[0], p[1]];
			});
		} else {
			return [point[0], point[1]];
		}
	}
	
}

