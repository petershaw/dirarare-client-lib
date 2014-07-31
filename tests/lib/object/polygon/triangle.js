
var   assert = require('assert')
	, should = require('should')
	, _		 = require('underscore')
	, polygon = require('../../../../lib/objects/polygon')
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

describe('Simple Triangle-Polygon', function(){
	describe('in nulled position', function(){
		describe('with disabledLine and disabledFill mode', function(){
 			var s =  new polygon([0,0],[4,0],[2,4]);
			/*
			test s - should have lines between the points
			Test 1 - lines
			9   _  _  _  _  _  _  _  _  _  _
			8   _  _  _  _  _  _  _  _  _  _
			7   _  _  _  _  _  _  _  _  _  _
			6   _  _  _  _  _  _  _  _  _  _
			5   _  _  _  _  _  _  _  _  _  _
			4   _  _  X  _  _  _  _  _  _  _
			3   _  _  _  _  _  _  _  _  _  _
			2   _  _  _  _  _  _  _  _  _  _
			1   _  _  _  _  _  _  _  _  _  _
			0   X  _  _  _  X  _  _  _  _  _
				0  1  2  3  4  5  6  7  8  9
			*/
			s.disableLines();
			s.disableFill();
			it('should return three points', function(done){
				s.render(function(data){

					data.should.be.an.Array;
					data.should.have.length(3);
					done();
				});
			});

			it('should return 0,0; 4,0; and 2,4', function(done){
				s.render(function(data){
					// get only coordinates
					data = helper.getCoordinates(data);
				
					data.should.containEql([0,0]);
					data.should.containEql([4,0]);
					data.should.containEql([2,4]);
					done();
				});
				
			});
		});
		
		describe('with enabledLine and disabledFill mode', function(){
			var s =  new polygon([0,0],[4,0],[2,4]);
			/*
			test s - should have lines between the points
			Test 1 - lines
			9   _  _  _  _  _  _  _  _  _  _
			8   _  _  _  _  _  _  _  _  _  _
			7   _  _  _  _  _  _  _  _  _  _
			6   _  _  _  _  _  _  _  _  _  _
			5   _  _  _  _  _  _  _  _  _  _
			4   _  _  X  _  _  _  _  _  _  _
			3   _  _  O  O  _  _  _  _  _  _
			2   _  O  _  O  _  _  _  _  _  _
			1   _  O  _  _  O  _  _  _  _  _
			0   X  O  O  O  X  _  _  _  _  _
				0  1  2  3  4  5  6  7  8  9
			*/		
			s.enableLines();
			s.disableFill();
			it('should return eight points', function(done){
				s.render(function(data){
					data.should.be.an.Array;
					data.should.have.length(12);
					done();
				});
			});

			it('should return a list of combines points', function(done){
				s.render(function(data){	
				
					// get only coordinates
					data = helper.getCoordinates(data);
						
					// Points
					data.should.containEql([0,0]);
					data.should.containEql([4,0]);
					data.should.containEql([2,4]);

					// bottom Line
					data.should.containEql([1,0]);
					data.should.containEql([2,0]);
					data.should.containEql([3,0]);
					
					// right up
					data.should.containEql([3,2]);
					
					// left down
					data.should.containEql([1,2]);
					
					done();
				});
				
			});
		});
		
		describe('with enabledLine and enabledFill mode', function(){
			var s =  new polygon([0,0],[4,0],[2,4]);
			/*
			test s - should have lines between the points
			Test 1 - lines
			9   _  _  _  _  _  _  _  _  _  _
			8   _  _  _  _  _  _  _  _  _  _
			7   _  _  _  _  _  _  _  _  _  _
			6   _  _  _  _  _  _  _  _  _  _
			5   _  _  _  _  _  _  _  _  _  _
			4   _  _  X  _  _  _  _  _  _  _
			3   _  _  F  _  _  _  _  _  _  _
			2   _  O  F  O  _  _  _  _  _  _
			1   _  F  F  F  _  _  _  _  _  _
			0   X  O  O  O  X  _  _  _  _  _
				0  1  2  3  4  5  6  7  8  9
			*/		
			s.enableLines();
			s.enableFill();
			it('should return thirteen points', function(done){
				s.render(function(data){
					data.should.be.an.Array;
					data.should.have.length(15);
					done();
				});
			});

			it('should return a full filled element', function(done){

				s.render(function(data){		
				
					// get only coordinates
					data = helper.getCoordinates(data);

					// Points
					data.should.containEql([0,0]);
					data.should.containEql([4,0]);
					data.should.containEql([2,4]);

					// bottom Line
					data.should.containEql([1,0]);
					data.should.containEql([2,0]);
					data.should.containEql([3,0]);
					
					// right up
					data.should.containEql([3,2]);
					
					// left down
					data.should.containEql([1,2]);
					
					// fill
					data.should.containEql([1,1]);
					data.should.containEql([2,1]);
					data.should.containEql([3,1]);
					data.should.containEql([2,2]);
					data.should.containEql([2,3]);
					
					done();
				});
			});
		});
	});

});
