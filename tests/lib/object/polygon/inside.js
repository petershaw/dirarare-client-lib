
var   assert = require('assert')
	, should = require('should')
	, _		 = require('underscore')
	, polygon = require('../../../../lib/objects/polygon')
	;

/*
Empty Matrix:
	9  _  _  _  _  _  _  _  _  _  _
	8  _  _  _  _  _  _  _  _  _  _
	7  _  _  _  _  _  _  _  _  _  _
	6  _  _  _  _  _  _  _  _  _  _
	5  _  _  _  _  _  _  _  _  _  _
	4  _  _  _  _  _  _  _  _  _  _
	3  _  _  _  _  _  _  _  _  _  _
	2  _  _  _  _  _  _  _  _  _  _
	1  _  _  _  _  _  _  _  _  _  _
	0  _  _  _  _  _  _  _  _  _  _
    0  1  2  3  4  5  6  7  8  9
*/

describe('A Point', function(){
	describe('in a polygon', function(){
		var s =  new polygon([2,4],[7,6],[3,8],[0,6]);
		/*
		test s - should have lines between the points
		Test 1 - lines
		9   _  _  _  _  _  _  _  _  _  _
		8   _  _  _  X  _  _  _  _  _  _
		7   _  _  _  _  _  _  _  _  _  _
		6   X  _  _  _  _  _  _  X  _  _
		5   _  _  _  _  _  _  _  _  _  _
		4   _  _  X  _  _  O  _  _  _  _
		3   _  _  _  _  _  _  _  _  _  _
		2   _  _  _  _  _  _  _  _  _  _
		1   _  _  _  _  _  _  _  _  _  _
		0   _  _  _  _  _  _  _  _  _  _
			0  1  2  3  4  5  6  7  8  9
		*/
		it('should be true when it is inside', function(done){
			console.log(s.data);
			s.isPointInside([4,6]).should.be.true;
			done();
		});
		it('should be false when it is outside', function(done){
			console.log(s.data);
			s.isPointInside([5,4]).should.be.false;
			done();
		});

	});
		
});
