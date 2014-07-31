
var   assert 	= require('assert')
	, should 	= require('should')
	, _			= require('underscore')
	, matrix 	= require('../../../lib/matrix')
	, polygon 	= require('../../../lib/objects/polygon')
	, helper 	= require('../../../lib/helper/point')
	;

	
var matrix 		= new matrix(10, 10);	

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
describe('Brightness at a polygon', function(){
	describe('should be set', function(){
		var s =  new polygon([2,2],[5,2],[5,5],[2,5]);
		/*
		Test 1 - move right
		9   _  _  _  _  _  _  _  _  _  _
		8   _  _  _  _  _  _  _  _  _  _
		7   _  _  _  _  _  _  _  _  _  _
		6   _  _  _  _  _  _  _  _  _  _
		5   _  _  X  O  O  X  _  _  _  _
		4   _  _  O  F  F  O  _  _  _  _
		3   _  _  O  F  F  O  _  _  _  _
		2   _  _  X  O  O  X  _  _  _  _
		1   _  _  _  _  _  _  _  _  _  _
		0   _  _  _  _  _  _  _  _  _  _
			0  1  2  3  4  5  6  7  8  9
		*/
		it('to 255 initially', function(done){
			s.enableLines();
			s.enableFill();
			s.render(function(data){
				
				// Check length of 16
				data.should.have.length(16);
					
				// check each point has a brightness of 255
				_.each(data, function(e){
					(e.length).should.be.above(2);
					e[2].should.equal(255);
				});

				done();
			});
		});
		
		it('to 83', function(done){
			s.enableLines();
			s.enableFill();
			s.setGlobalBrightness(83);
			s.render(function(data){
				
				// Check length of 16
				data.should.have.length(16);
				(s.brightness).should.be.equal(83);
				
				// check each point has a brightness of 255
				_.each(data, function(e){
					(e.length).should.be.above(2);
					console.log(e);
					e[2].should.equal(83);
				});

				done();
			});
		});

	})		
});