
var   assert = require('assert')
	, should = require('should')
	, _		 = require('underscore')
	, line = require('../../../../lib/objects/line')
	, helper 	= require('../../../../lib/helper/point')
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

describe('A Line', function(){
	describe('with start and end point', function(){
		/*
		test s - should have lines between the points
		Test 1 - lines
		9  _  _  _  _  _  _  _  _  _  _
		8  _  _  _  _  _  _  _  _  _  _
		7  _  _  _  _  _  _  _  _  _  _
		6  _  _  _  _  _  _  _  _  _  _
		5  _  _  _  _  _  _  _  _  _  _
		4  _  _  _  _  _  _  _  _  _  _
		3  _  _  _  _  _  _  _  _  _  _
		2  _  X  O  O  O  O  O  X  _  _
		1  _  _  _  _  _  _  _  _  _  _
		0  _  _  _  _  _  _  _  _  _  _
		0  1  2  3  4  5  6  7  8  9
		*/
		it('on x axis should be fine', function(done){
			var s_x =  new line([2,2],[8,2]);
			s_x.render(function(data){
				// count elements
				data.should.have.length(7);
				
				// points
				data.should.containEql([2,2]);
				data.should.containEql([8,2]);

				// line
				data.should.containEql([3,2]);
				data.should.containEql([4,2]);
				data.should.containEql([5,2]);
				data.should.containEql([6,2]);
				data.should.containEql([7,2]);
			});
			done();
		});

		/*
		test s - should have lines between the points
		Test 1 - lines
		9  _  _  _  _  _  _  _  _  _  _
		8  _  _  _  _  _  _  _  _  _  _
		7  _  _  _  _  X  _  _  _  _  _
		6  _  _  _  _  O  _  _  _  _  _
		5  _  _  _  _  O  _  _  _  _  _
		4  _  _  _  _  O  _  _  _  _  _
		3  _  _  _  _  O  _  _  _  _  _
		2  _  _  _  _  O  _  _  _  _  _
		1  _  _  _  _  X  _  _  _  _  _
		0  _  _  _  _  _  _  _  _  _  _
		0  1  2  3  4  5  6  7  8  9
		*/
		it('on y axis should be fine', function(done){
			var s_y =  new line([5,1],[5,7]);
			s_y.render(function(data){
				// count elements
				data.should.have.length(7);
				
				// count elements
				data.should.have.length(7);
				
				// points
				data.should.containEql([5,2]);
				data.should.containEql([5,7]);

				// line
				data.should.containEql([5,2]);
				data.should.containEql([5,3]);
				data.should.containEql([5,4]);
				data.should.containEql([5,5]);
				data.should.containEql([5,6]);
			});
			done();
		});
		
		/*
		test s - should have lines between the points
		Test 1 - lines
		9  _  _  _  _  _  _  _  _  _  _
		8  _  _  _  _  _  _  _  _  _  _
		7  _  _  _  _  _  _  _  X  _  _
		6  _  _  _  _  _  _  O  _  _  _
		5  _  _  _  _  _  O  _  _  _  _
		4  _  _  _  _  O  _  _  _  _  _
		3  _  _  _  O  _  _  _  _  _  _
		2  _  _  O  _  _  _  _  _  _  _
		1  _  X  _  _  _  _  _  _  _  _
		0  _  _  _  _  _  _  _  _  _  _
		   0  1  2  3  4  5  6  7  8  9
		*/
		it('on diagonale up-axis should be fine', function(done){
			var s_up =  new line([1,1],[7,7]);
			s_up.render(function(data){
				// count elements
				data.should.have.length(7);
				
				// count elements
				data.should.have.length(7);
				
				// points
				data.should.containEql([1,1]);
				data.should.containEql([7,7]);

				// line
				data.should.containEql([2,2]);
				data.should.containEql([3,3]);
				data.should.containEql([4,4]);
				data.should.containEql([5,5]);
				data.should.containEql([6,6]);
			});
			s_up.midPoint[0].should.equal(4);
			s_up.midPoint[1].should.equal(4);
			done();
		});

		/*
		test s - should have lines between the points
		Test 1 - lines
		9  _  _  _  _  _  _  _  _  _  _
		8  _  _  _  _  _  _  _  _  _  _
		7  _  X  _  _  _  _  _  _  _  _
		6  _  _  O  _  _  _  _  _  _  _
		5  _  _  _  O  _  _  _  _  _  _
		4  _  _  _  _  O  _  _  _  _  _
		3  _  _  _  _  _  O  _  _  _  _
		2  _  _  _  _  _  _  O  _  _  _
		1  _  _  _  _  _  _  _  X  _  _
		0  _  _  _  _  _  _  _  _  _  _
		   0  1  2  3  4  5  6  7  8  9
		*/
		it('on diagonale down-axis should be fine', function(done){
			var s_down =  new line([1,7],[7,1]);
			s_down.render(function(data){
				// count elements
				data.should.have.length(7);
				
				// count elements
				data.should.have.length(7);
				
				// points
				data.should.containEql([1,7]);
				data.should.containEql([7,1]);

				// line
				data.should.containEql([2,6]);
				data.should.containEql([3,5]);
				data.should.containEql([4,4]);
				data.should.containEql([5,3]);
				data.should.containEql([6,2]);
			});
			s_down.midPoint[0].should.equal(4);
			s_down.midPoint[1].should.equal(4);
			done();
		});

		/*
		test s - should have lines between the points
		Test 1 - lines
		9  _  _  _  _  _  _  _  _  _  _
		8  _  _  _  _  _  _  _  _  _  _
		7  _  _  _  _  _  _  _  _  _  _
		6  _  _  _  _  _  _  _  _  _  _
		5  _  X  _  _  _  _  _  _  _  _
		4  _  _  O  O  _  _  _  _  _  _
		3  _  _  _  _  #  _  _  _  _  _
		2  _  _  _  _  _  O  O  _  _  _
		1  _  _  _  _  _  _  _  X  _  _
		0  _  _  _  _  _  _  _  _  _  _
		   0  1  2  3  4  5  6  7  8  9
		*/
		it('on diagonale down-axis should be fine', function(done){
			var s_flatdown =  new line([1,5],[7,1]);
			s_flatdown.render(function(data){
				// count elements
				data.should.have.length(7);
				
				// get only coordinates
				data = helper.getCoordinates(data);
					
				// count elements
 				data.should.have.length(7);
 				
 				// points
 				data.should.containEql([1,5]);
 				data.should.containEql([7,1]);
 
 				// line
 				data.should.containEql([2,4]);
 				data.should.containEql([3,4]);
 				data.should.containEql([4,3]);
 				data.should.containEql([5,2]);
 				data.should.containEql([6,2]);
			});
			s_flatdown.midPoint[0].should.equal(4);
			s_flatdown.midPoint[1].should.equal(3);
			done();
		});		
		
	});
		
});
