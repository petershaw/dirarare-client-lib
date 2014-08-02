
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
describe('A polygon midpoint', function(){
	describe('on a matrix should be replaced after moveBy', function(){
		var s =  new polygon([2,2],[6,2],[6,6],[2,6]);
		/*
		Test 1 - move right
		9   _  _  _  _  _  _  _  _  _  _
		8   _  _  _  _  _  _  _  _  _  _
		7   _  _  _  _  _  _  _  _  _  _
		6   _  _  X  _  #  _  X  _  #  _
		5   _  _  _  _  _  _  _  _  _  _
		4   _  _  _  _  +  _  M  _  _  _
		3   _  _  _  _  _  _  _  _  _  _
		2   _  _  X  _  #  _  X  _  #  _
		1   _  _  _  _  _  _  _  _  _  _
		0   _  _  _  _  _  _  _  _  _  _
			0  1  2  3  4  5  6  7  8  9
		*/
		it('right', function(done){
			movement.moveBy(s, [2, 0], function(sa){
				sa.render(function(data){
					// Check length of 4
					data.should.have.length(4);
					
					// get only coordinates
					data = helper.getCoordinates(data);
					
					// points
					data.should.containEql([4,2]);
					data.should.containEql([8,2]);
					data.should.containEql([8,6]);
					data.should.containEql([4,6]);
					
					[sa.midPoint].should.not.containEql([4,4]);
					[sa.midPoint].should.containEql([6,4]);
					
					
					done();
				});
			})
		});
	});		
});