
var   assert 	= require('assert')
	, should 	= require('should')
	, _			= require('underscore')
	, matrix 	= require('../../../../lib/matrix')
	, movement 	= require('../../../../lib/movement')
	, polygon 	= require('../../../../lib/objects/polygon')
	, helper 	= require('../../../../lib/helper/point')
	;

	
var matrix 		= new matrix(10, 10);	
var movement 	= new movement(matrix);

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
describe('A polygon', function(){
	describe('without lines and without fills on a matrix should be replaced after moveBy', function(){
		var s =  new polygon([2,2],[5,2],[5,5],[2,5]);
		/*
		Test 1 - move right
		9   _  _  _  _  _  _  _  _  _  _
		8   _  _  _  _  _  _  _  _  _  _
		7   _  _  _  _  _  _  _  _  _  _
		6   _  _  _  _  _  _  _  _  _  _
		5   _  _  X  #  _  X  #  _  _  _
		4   _  _  _  _  _  _  _  _  _  _
		3   _  _  _  _  _  _  _  _  _  _
		2   _  _  X  #  _  X  #  _  _  _
		1   _  _  _  _  _  _  _  _  _  _
		0   _  _  _  _  _  _  _  _  _  _
			0  1  2  3  4  5  6  7  8  9
		*/
		it('right', function(done){
			movement.moveBy(s, [1, 0], function(){
				s.render(function(data){
					// Check length of 4
					data.should.have.length(4);
					
					// get only coordinates
					data = helper.getCoordinates(data);
					
					// points
					data.should.containEql([3,2]);
					data.should.containEql([6,2]);
					data.should.containEql([6,5]);
					data.should.containEql([3,5]);
					
					done();
				});
			})
		});

		/*
		Test 2 - move up
		9   _  _  _  _  _  _  _  _  _  _
		8   _  _  _  _  _  _  _  _  _  _
		7   _  _  _  _  _  _  _  _  _  _
		6   _  _  _  #  _  _  #  _  _  _
		5   _  _  X  _  _  X  _  _  _  _
		4   _  _  _  _  _  _  _  _  _  _
		3   _  _  _  #  _  _  #  _  _  _
		2   _  _  X  _  _  X  _  _  _  _
		1   _  _  _  _  _  _  _  _  _  _
		0   _  _  _  _  _  _  _  _  _  _
			0  1  2  3  4  5  6  7  8  9
		*/
		it('up', function(done){
			movement.moveBy(s, [0, 1], function(){
				s.render(function(data){
					// Check length of 4
					data.should.have.length(4);
					
					// get only coordinates
					data = helper.getCoordinates(data);
					
					// points
					data.should.containEql([3,3]);
					data.should.containEql([6,3]);
					data.should.containEql([6,6]);
					data.should.containEql([3,6]);
					
					done();
				});
			})
		});

		/*
		Test 2 - move up
		9   _  _  _  _  _  _  _  _  _  _
		8   _  _  _  _  _  _  _  _  _  _
		7   _  _  _  _  _  _  _  _  _  _
		6   _  _  _  _  _  _  _  _  _  _
		5   _  #  X  _  #  X  _  _  _  _
		4   _  _  _  _  _  _  _  _  _  _
		3   _  _  _  _  _  _  _  _  _  _
		2   _  #  X  _  #  X  _  _  _  _
		1   _  _  _  _  _  _  _  _  _  _
		0   _  _  _  _  _  _  _  _  _  _
			0  1  2  3  4  5  6  7  8  9
		*/
		it('2 left, 1 down', function(done){
			movement.moveBy(s, [-2, -1], function(){
				s.render(function(data){
					// Check length of 4
					data.should.have.length(4);
					
					// get only coordinates
					data = helper.getCoordinates(data);
					
					// points
					data.should.containEql([1,2]);
					data.should.containEql([4,2]);
					data.should.containEql([4,5]);
					data.should.containEql([1,5]);
					
					done();
				});
			})
		});
		
	});
	
	describe('with lines and without fills on a matrix should be replaced after moveBy', function(){
		var s =  new polygon([2,2],[5,2],[5,5],[2,5]);
		/*
		Test 1 - move right
		9   _  _  _  _  _  _  _  _  _  _
		8   _  _  _  _  _  _  _  _  _  _
		7   _  _  _  _  _  _  #  O  O  #
		6   _  _  _  _  _  _  O  _  _  O
		5   _  _  X  _  _  X  O  _  _  O
		4   _  _  _  _  _  _  #  O  O  #
		3   _  _  _  _  _  _  _  _  _  _
		2   _  _  X  _  _  X  _  _  _  _
		1   _  _  _  _  _  _  _  _  _  _
		0   _  _  _  _  _  _  _  _  _  _
			0  1  2  3  4  5  6  7  8  9
		*/
		s.enableLines();
		it('4 right, 2 up', function(done){
			movement.moveBy(s, [4, 2], function(){
				s.render(function(data){
					// Check length of 12
					data.should.have.length(12);
					
					// get only coordinates
					data = helper.getCoordinates(data);
					
					// points
					data.should.containEql([6,4]);
					data.should.containEql([9,4]);
					data.should.containEql([9,7]);
					data.should.containEql([6,7]);
					
					// lines
					data.should.containEql([7,7]);
					data.should.containEql([8,7]);
					data.should.containEql([9,5]);
					data.should.containEql([9,6]);
					data.should.containEql([8,7]);
					data.should.containEql([7,7]);
					data.should.containEql([6,6]);
					data.should.containEql([6,5]);
					
					done();
				});
			})
		});
	});
	
	describe('with lines and fills on a matrix should be replaced after moveBy', function(){
		var s =  new polygon([2,2],[5,2],[5,5],[2,5]);
		/*
		Test 1 - move right
		9   _  _  _  _  _  _  _  _  _  _
		8   _  _  _  _  _  _  _  _  _  _
		7   _  _  _  _  _  _  #  O  O  #
		6   _  _  _  _  _  _  O  F  F  O
		5   _  _  X  _  _  X  O  F  F  O
		4   _  _  _  _  _  _  #  O  O  #
		3   _  _  _  _  _  _  _  _  _  _
		2   _  _  X  _  _  X  _  _  _  _
		1   _  _  _  _  _  _  _  _  _  _
		0   _  _  _  _  _  _  _  _  _  _
			0  1  2  3  4  5  6  7  8  9
		*/
		
		s.enableLines();
		s.enableFill();
		
		it('4 right, 2 up', function(done){
			movement.moveBy(s, [4, 2], function(d){
				s.render(function(data){
					// Check length of 16
					data.should.have.length(16);
					
					// get only coordinates
					data = helper.getCoordinates(data);
					
					// points
					data.should.containEql([6,4]);
					data.should.containEql([9,4]);
					data.should.containEql([9,7]);
					data.should.containEql([6,7]);
					
					// lines
					data.should.containEql([7,7]);
					data.should.containEql([8,7]);
					data.should.containEql([9,5]);
					data.should.containEql([9,6]);
					data.should.containEql([8,7]);
					data.should.containEql([7,7]);
					data.should.containEql([6,6]);
					data.should.containEql([6,5]);
					
					// fill
					data.should.containEql([7,5]);
					data.should.containEql([8,5]);
					data.should.containEql([7,6]);
					data.should.containEql([8,6]);
					
					done();
				});
			})
		});
	});	

	describe('without lines and without fills on a matrix should be replaced after moveTo', function(){
		var s =  new polygon([2,2],[6,2],[6,6],[2,6]);
		/*
		Test 1 - move right
		9   _  _  _  _  _  _  _  _  _  _
		8   _  _  _  _  _  _  _  _  _  _
		7   _  _  _  _  _  #  _  _  _  #
		6   _  _  X  _  _  _  X  _  _  _
		5   _  _  _  _  _  _  _  +  _  _
		4   _  _  _  _  +  _  _  _  _  _
		3   _  _  _  _  _  #  _  _  _  #
		2   _  _  X  _  _  _  X  _  _  _
		1   _  _  _  _  _  _  _  _  _  _
		0   _  _  _  _  _  _  _  _  _  _
			0  1  2  3  4  5  6  7  8  9
		*/
		it('right to 7,5', function(done){
			movement.moveTo(s, [7, 5], function(){
				s.render(function(data){
					// Check length of 4
					data.should.have.length(4);
					
					// get only coordinates
					data = helper.getCoordinates(data);
					
					// points
					data.should.containEql([5,3]);
					data.should.containEql([9,3]);
					data.should.containEql([5,7]);
					data.should.containEql([9,7]);
					
					done();
				});
			})
		});
	});

});