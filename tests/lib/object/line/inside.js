
var   assert = require('assert')
	, should = require('should')
	, _		 = require('underscore')
	, line 	= require('../../../../lib/objects/line')
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
	describe('on a horizontal line', function(){
		var s =  new line([2,4],[7,4]);
		/*
		test s - should have lines between the points
		Test 1 - lines
		9   _  _  _  _  _  _  _  _  _  _
		8   _  _  _  _  _  _  _  _  _  _
		7   _  _  _  _  _  _  _  _  _  _
		6   _  _  _  _  _  _  _  _  _  _
		5   _  _  _  _  _  _  _  _  _  _
		4   _  _  X  O  *  O  O  X  _  _
		3   _  _  _  _  _  _  _  _  _  _
		2   _  _  _  _  _  *  _  _  _  _
		1   _  _  _  _  _  _  _  _  _  _
		0   _  _  _  _  _  _  _  _  _  _
			0  1  2  3  4  5  6  7  8  9
		*/
		it('should be true when it is inside', function(done){
			s.isPointInside([4,4]).should.be.true;
			done();
		});
		it('should be false when it is outside', function(done){
			s.isPointInside([5,2]).should.be.false;
			done();
		});
		it('should be true when it is on edge', function(done){
			s.isPointInside([2,4]).should.be.true;
			s.isPointInside([7,4]).should.be.true;
			done();
		});
	});
	
	describe('on a vertical line', function(){
		var s =  new line([2,1],[2,7]);
		/*
		test s - should have lines between the points
		Test 1 - lines
		9   _  _  _  _  _  _  _  _  _  _
		8   _  _  _  _  _  _  _  _  _  _
		7   _  _  *  _  _  _  _  _  _  _
		6   _  _  O  _  _  _  _  _  _  _
		5   _  _  O  _  _  _  _  _  _  _
		4   _  _  _  _  _  _  _  _  _  _
		3   _  _  *  _  _  _  _  _  _  _
		2   _  _  O  _  _  *  _  _  _  _
		1   _  _  *  _  _  _  _  _  _  _
		0   _  _  _  _  _  _  _  _  _  _
			0  1  2  3  4  5  6  7  8  9
		*/
		it('should be true when it is inside', function(done){
			s.isPointInside([2,3]).should.be.true;
			done();
		});
		it('should be false when it is outside', function(done){
			s.isPointInside([5,2]).should.be.false;
			done();
		});
		it('should be true when it is on edge', function(done){
			s.isPointInside([2,1]).should.be.true;
			s.isPointInside([2,7]).should.be.true;
			done();
		});
	});

});
