
var   assert 	= require('assert')
	, should 	= require('should')
	, _		 	= require('underscore')
	, point 	= require('../../../../lib/objects/point')
	, helper 	= require('../../../../lib/helper/point')
	, Matrix	= require('../../../../lib/matrix')
	, matrix	= new Matrix(8,8)
	, movement	= require('../../../../lib/movement')(matrix)
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
	describe('with a single point', function(){
		var s =  new point([2,2]);
		/*
		test s - should have a point
		Test 1 - point
		9  _  _  _  _  _  _  _  _  _  _
		8  _  _  _  _  _  _  _  _  _  _
		7  _  _  _  _  _  _  _  _  _  _
		6  _  _  _  _  _  _  _  _  _  _
		5  _  _  _  _  _  _  _  _  _  _
		4  _  _  _  _  _  _  _  _  _  _
		3  _  _  _  _  _  _  _  _  _  _
		2  _  X  _  _  _  _  _  _  _  _
		1  _  _  _  _  _  _  _  _  _  _
		0  _  _  _  _  _  _  _  _  _  _
		0  1  2  3  4  5  6  7  8  9
		*/
		it('should have the point as only element', function(done){
			
			s.render(function(data){
			console.log(data);
				// count elements
				data.should.have.length(1);
				
				// points
				data.should.containEql([2,2]);

			});
			done();
		});
		
	});
		
});
