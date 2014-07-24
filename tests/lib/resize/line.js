
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
	describe('on a matrix should be resized by one', function(){
		var s =  new line([2,2],[5,5]);
		/*
		Test 1 - move right
		9   _  _  _  _  _  _  _  _  _  _
		8   _  _  _  _  _  _  _  _  _  _
		7   _  _  _  _  _  _  _  _  _  _
		6   _  _  _  _  _  _  #  _  _  _
		5   _  _  _  _  _  X  _  _  _  _
		4   _  _  _  _  O  _  _  _  _  _
		3   _  _  _  O  _  _  _  _  _  _
		2   _  _  X  _  _  _  _  _  _  _
		1   _  #  _  _  _  _  _  _  _  _
		0   _  _  _  _  _  _  _  _  _  _
			0  1  2  3  4  5  6  7  8  9
		*/
		it('grow', function(done){
			s.resize(1);
			s.render(function(data){
				// Check length of 4
				data.should.have.length(6);
					
				// points
				data.should.containEql([1,1]);
				data.should.containEql([2,2]);
				data.should.containEql([3,3]);
				data.should.containEql([4,4]);
				data.should.containEql([5,5]);
				data.should.containEql([6,6]);

				done();
			});
		});

		/*
		Test 2 - move up
		9   _  _  _  _  _  _  _  _  _  _
		8   _  _  _  _  _  _  _  _  _  _
		7   _  _  _  _  _  _  _  _  _  _
		6   _  _  _  _  _  _  X  _  _  _
		5   _  _  _  _  _  _  _  _  _  _
		4   _  _  _  _  #  _  _  _  _  _
		3   _  _  _  #  _  _  _  _  _  _
		2   _  _  _  _  _  _  _  _  _  _
		1   _  X  _  _  _  _  _  _  _  _
		0   _  _  _  _  _  _  _  _  _  _
			0  1  2  3  4  5  6  7  8  9
		*/
		it('shrink', function(done){
			s.resize(-2);
			s.render(function(data){
				// Check length of 4
				data.should.have.length(2);
					
				// points
				data.should.containEql([3,3]);
				data.should.containEql([4,4]);
					
				done();
			})
		});		
	});
		
});