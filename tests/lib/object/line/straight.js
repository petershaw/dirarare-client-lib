
var   assert = require('assert')
	, should = require('should')
	, _		 = require('underscore')
	, polygon = require('../../../../lib/objects/line')
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
		var s =  new polygon([2,2],[8,2]);
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
			s.render(function(data){
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

	});
		
});
