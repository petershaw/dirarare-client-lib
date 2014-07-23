
var   assert 	= require('assert')
	, should 	= require('should')
	, _			= require('underscore')
	, matrix 	= require('../../../lib/matrix')
	, movement 	= require('../../../lib/movement')
	, line 		= require('../../../lib/objects/line')
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
describe('A line', function(){
	describe('on a matrix should be replaced after moveBy', function(){
		var s =  new line([2,2],[5,5]);
		/*
		Test 1 - move right
		9   _  _  _  _  _  _  _  _  _  _
		8   _  _  _  _  _  _  _  _  _  _
		7   _  _  _  _  _  _  _  _  _  _
		6   _  _  _  _  _  _  _  _  _  _
		5   _  _  _  _  _  X  #  _  _  _
		4   _  _  _  _  O  O  _  _  _  _
		3   _  _  _  O  O  _  _  _  _  _
		2   _  _  X  #  _  _  _  _  _  _
		1   _  _  _  _  _  _  _  _  _  _
		0   _  _  _  _  _  _  _  _  _  _
			0  1  2  3  4  5  6  7  8  9
		*/
		it('right', function(done){
			movement.moveBy(s, [1, 0], function(){
				s.render(function(data){
					// Check length of 4
					data.should.have.length(4);
					
					// points
					data.should.containEql([3,2]);
					data.should.containEql([4,3]);
					data.should.containEql([5,4]);
					data.should.containEql([6,5]);
					
					done();
				});
			})
		});

		/*
		Test 2 - move up
		9   _  _  _  _  _  _  _  _  _  _
		8   _  _  _  _  _  _  #  _  _  _
		7   _  _  _  _  _  O  _  _  _  _
		6   _  _  _  _  O  _  _  _  _  _
		5   _  _  _  #  _  X  _  _  _  _
		4   _  _  _  _  O  _  _  _  _  _
		3   _  _  _  O  _  _  _  _  _  _
		2   _  _  X  _  _  _  _  _  _  _
		1   _  _  _  _  _  _  _  _  _  _
		0   _  _  _  _  _  _  _  _  _  _
			0  1  2  3  4  5  6  7  8  9
		*/
		it('3 up', function(done){
			movement.moveBy(s, [0, 3], function(){
				s.render(function(data){
					// Check length of 4
					data.should.have.length(4);
					
					// points
					data.should.containEql([3,5]);
					data.should.containEql([4,6]);
					data.should.containEql([5,7]);
					data.should.containEql([6,8]);
					
					done();
				});
			})
		});
		
	});
		
});