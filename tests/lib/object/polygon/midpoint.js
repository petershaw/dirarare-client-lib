
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

describe('A polygon midpoint', function(){
	describe('should be set correct', function(){
		describe('in nulled position and', function(){
			var s =  new polygon([0,0],[6,0],[6,6],[0,6]);
			/*
			test s - should have lines between the points
			Test 1 - lines
			9   _  _  _  _  _  _  _  _  _  _
			8   _  _  _  _  _  _  _  _  _  _
			7   _  _  _  _  _  _  _  _  _  _
			6   X  _  _  _  _  _  X  _  _  _
			5   _  _  _  _  _  _  _  _  _  _
			4   _  _  _  _  _  _  _  _  _  _
			3   _  _  _  =  _  _  _  _  _  _
			2   _  _  _  _  _  _  _  _  _  _
			1   _  _  _  _  _  _  _  _  _  _
			0   X  _  _  _  _  _  X  _  _  _
				0  1  2  3  4  5  6  7  8  9
			*/
			it('should return 3/3', function(done){
				[s.midPoint].should.containEql([3,3]);
				done();
			});
		});
		describe('in moved position and', function(){
			var s =  new polygon([0,0],[6,0],[6,6],[0,6]);
			/*
			test s - should have lines between the points
			Test 1 - lines
			9   _  _  _  _  _  _  _  _  _  _
			8   _  _  _  _  _  _  _  _  _  _
			7   _  _  X  _  _  _  _  _  X  _
			6   _  _  _  _  _  _  _  _  _  _
			5   _  _  _  _  _  _  _  _  _  _
			4   _  _  _  _  _  =  _  _  _  _
			3   _  _  _  _  _  _  _  _  _  _
			2   _  _  _  _  _  _  _  _  _  _
			1   _  _  X  _  _  _  _  _  X  _
			0   _  _  _  _  _  _  _  _  _  _
				0  1  2  3  4  5  6  7  8  9
			*/
			it('should return 3/3', function(done){			
				[s.midPoint].should.containEql([3,3]);
				done();
			});
		});
	});
		
});
