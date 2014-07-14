
var   assert = require('assert')
	, should = require('should')
	, _		 = require('underscore')
	, polygon = require('../../../../lib/objects/polygon')
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

describe('Simple Square-Polygon', function(){
	describe('in nulled position', function(){
		describe('with disabledLine and disabledFill mode', function(){
			var s =  new polygon([0,0],[5,0],[5,4],[0,4]);
			/*
			test s - should have lines between the points
			Test 1 - lines
			9   _  _  _  _  _  _  _  _  _  _
			8   _  _  _  _  _  _  _  _  _  _
			7   _  _  _  _  _  _  _  _  _  _
			6   _  _  _  _  _  _  _  _  _  _
			5   _  _  _  _  _  _  _  _  _  _
			4   X  _  _  _  _  X  _  _  _  _
			3   _  _  _  _  _  _  _  _  _  _
			2   _  _  _  _  _  _  _  _  _  _
			1   _  _  _  _  _  _  _  _  _  _
			0   X  _  _  _  _  X  _  _  _  _
				0  1  2  3  4  5  6  7  8  9
			*/
			s.disableLines();
			s.disableFill();
			it('should return four points', function(done){
				s.render(function(data){

					data.should.be.an.Array;
					data.should.have.length(4);
					done();
				});
			});

			it('should return 0,0; 5,0; 5,4 and 0,4', function(done){
				s.render(function(data){
					data.should.containEql([0,0]);
					data.should.containEql([5,0]);
					data.should.containEql([5,4]);
					data.should.containEql([0,4]);
					done();
				});
				
			});
		});
		
		describe('with enabledLine and disabledFill mode', function(){
			var s =  new polygon([0,0],[5,0],[5,4],[0,4]);
			/*
			test s - should have lines between the points
			Test 1 - lines
			9   _  _  _  _  _  _  _  _  _  _
			8   _  _  _  _  _  _  _  _  _  _
			7   _  _  _  _  _  _  _  _  _  _
			6   _  _  _  _  _  _  _  _  _  _
			5   _  _  _  _  _  _  _  _  _  _
			4   X  O  O  O  O  X  _  _  _  _
			3   O  _  _  _  _  O  _  _  _  _
			2   O  _  _  _  _  O  _  _  _  _
			1   O  _  _  _  _  O  _  _  _  _
			0   X  O  O  O  O  X  _  _  _  _
				0  1  2  3  4  5  6  7  8  9
			*/		
			s.enableLines();
			s.disableFill();
			it('should return four points', function(done){
				s.render(function(data){
					data.should.be.an.Array;
					data.should.have.length(18);
					done();
				});
			});

			it('should return a list of combines points', function(done){
				s.render(function(data){		
					// Points
					data.should.containEql([0,0]);
					data.should.containEql([5,0]);
					data.should.containEql([5,4]);
					data.should.containEql([0,4]);
					
					// bottom Line
					data.should.containEql([1,0]);
					data.should.containEql([2,0]);
					data.should.containEql([3,0]);
					data.should.containEql([4,0]);
					
					// right up
					data.should.containEql([5,1]);
					data.should.containEql([5,2]);
					data.should.containEql([5,3]);
					
					// top Line
					data.should.containEql([4,4]);
					data.should.containEql([3,4]);
					data.should.containEql([2,4]);
					data.should.containEql([1,4]);
					
					// left down
					data.should.containEql([0,3]);
					data.should.containEql([0,2]);
					data.should.containEql([0,1]);
					
					done();
				});
				
			});
		});
		
		describe('with enabledLine and enabledFill mode', function(){
			var s =  new polygon([0,0],[5,0],[5,4],[0,4]);
			/*
			test s - should have lines between the points
			Test 1 - lines
			9   _  _  _  _  _  _  _  _  _  _
			8   _  _  _  _  _  _  _  _  _  _
			7   _  _  _  _  _  _  _  _  _  _
			6   _  _  _  _  _  _  _  _  _  _
			5   _  _  _  _  _  _  _  _  _  _
			4   X  O  O  O  O  X  _  _  _  _
			3   O  F  F  F  F  O  _  _  _  _
			2   O  F  F  F  F  O  _  _  _  _
			1   O  F  F  F  F  O  _  _  _  _
			0   X  O  O  O  O  X  _  _  _  _
				0  1  2  3  4  5  6  7  8  9
			*/		

			s.enableLines();
			s.enableFill();
			it('should return four points', function(done){
				s.render(function(data){
					data.should.be.an.Array;
					data.should.have.length(30);
					done();
				});
			});

			it('should return a full filled element', function(done){

				s.render(function(data){		
					// Points
					data.should.containEql([0,0]);
					data.should.containEql([5,0]);
					data.should.containEql([5,4]);
					data.should.containEql([0,4]);
					
					// bottom Line
					data.should.containEql([1,0]);
					data.should.containEql([2,0]);
					data.should.containEql([3,0]);
					data.should.containEql([4,0]);
					
					// right up
					data.should.containEql([5,1]);
					data.should.containEql([5,2]);
					data.should.containEql([5,3]);
					
					// top Line
					data.should.containEql([4,4]);
					data.should.containEql([3,4]);
					data.should.containEql([2,4]);
					data.should.containEql([1,4]);
					
					// left down
					data.should.containEql([0,3]);
					data.should.containEql([0,2]);
					data.should.containEql([0,1]);
					
					// fill
					data.should.containEql([1,1]);
					data.should.containEql([1,2]);
					data.should.containEql([1,3]);
					data.should.containEql([2,1]);
					data.should.containEql([2,2]);
					data.should.containEql([2,3]);
					data.should.containEql([3,1]);
					data.should.containEql([3,2]);
					data.should.containEql([3,3]);
					data.should.containEql([4,1]);
					data.should.containEql([4,2]);
					data.should.containEql([4,3]);
					
					done();
				});
			});
		});
	});
	
	describe('in initial moved position should be nulled', function(){
		describe('with disabledLine and disabledFill mode', function(){
			var s =  new polygon([2,2],[7,2],[7,6],[2,6]);
			/*
			test s - should have lines between the points
			Test 1 - lines
			9   _  _  _  _  _  _  _  _  _  _
			8   _  _  _  _  _  _  _  _  _  _
			7   _  _  _  _  _  _  _  _  _  _
			6   _  _  X  _  _  _  _  X  _  _
			5   _  _  _  _  _  _  _  _  _  _
			4   _  _  _  _  _  _  _  _  _  _
			3   _  _  _  _  _  _  _  _  _  _
			2   _  _  X  _  _  _  _  X  _  _
			1   _  _  _  _  _  _  _  _  _  _
			0   _  _  _  _  _  _  _  _  _  _
				0  1  2  3  4  5  6  7  8  9
			*/
			s.disableLines();
			s.disableFill();
			it('should return four points', function(done){
				s.render(function(data){

					data.should.be.an.Array;
					data.should.have.length(4);
					done();
				});
			});

			it('should return 0,0; 5,0; 5,4 and 0,4', function(done){
				s.render(function(data){
					data.should.containEql([0,0]);
					data.should.containEql([5,0]);
					data.should.containEql([5,4]);
					data.should.containEql([0,4]);
					done();
				});
				
			});
		});
		
		describe('with enabledLine and disabledFill mode', function(){
			var s =  new polygon([2,2],[7,2],[7,6],[2,6]);
			/*
			test s - should have lines between the points
			Test 1 - lines
			9   _  _  _  _  _  _  _  _  _  _
			8   _  _  _  _  _  _  _  _  _  _
			7   _  _  _  _  _  _  _  _  _  _
			6   _  _  X  O  O  O  O  X  _  _
			5   _  _  O  _  _  _  _  O  _  _
			4   _  _  O  _  _  _  _  O  _  _
			3   _  _  O  _  _  _  _  O  _  _
			2   _  _  X  O  O  O  O  X  _  _
			1   _  _  _  _  _  _  _  _  _  _
			0   _  _  _  _  _  _  _  _  _  _
				0  1  2  3  4  5  6  7  8  9
			*/		
			s.enableLines();
			s.disableFill();
			it('should return eighteen points', function(done){
				s.render(function(data){
					data.should.be.an.Array;
					data.should.have.length(18);
					done();
				});
			});

			it('should return a list of combines points', function(done){

				s.render(function(data){		
					// Points
					data.should.containEql([0,0]);
					data.should.containEql([5,0]);
					data.should.containEql([5,4]);
					data.should.containEql([0,4]);
					
					// bottom Line
					data.should.containEql([1,0]);
					data.should.containEql([2,0]);
					data.should.containEql([3,0]);
					data.should.containEql([4,0]);
					
					// right up
					data.should.containEql([5,1]);
					data.should.containEql([5,2]);
					data.should.containEql([5,3]);
					
					// top Line
					data.should.containEql([4,4]);
					data.should.containEql([3,4]);
					data.should.containEql([2,4]);
					data.should.containEql([1,4]);
					
					// left down
					data.should.containEql([0,3]);
					data.should.containEql([0,2]);
					data.should.containEql([0,1]);
					
					done();
				});
				
			});
		});
		
		describe('with enabledLine and enabledFill mode', function(){
			var s =  new polygon([2,2],[7,2],[7,6],[2,6]);
			/*
			test s - should have lines between the points
			Test 1 - lines
			9   _  _  _  _  _  _  _  _  _  _
			8   _  _  _  _  _  _  _  _  _  _
			7   _  _  _  _  _  _  _  _  _  _
			6   _  _  X  O  O  O  O  X  _  _
			5   _  _  O  F  F  F  F  O  _  _
			4   _  _  O  F  F  F  F  O  _  _
			3   _  _  O  F  F  F  F  O  _  _
			2   _  _  X  O  O  O  O  X  _  _
			1   _  _  _  _  _  _  _  _  _  _
			0   _  _  _  _  _  _  _  _  _  _
				0  1  2  3  4  5  6  7  8  9
			*/		
			s.enableLines();
			s.enableFill();
			it('should return thirty points', function(done){
				s.render(function(data){
					data.should.be.an.Array;
					data.should.have.length(30);
					done();
				});
			});

			it('should return a full filled element', function(done){

				s.render(function(data){		
					// Points
					data.should.containEql([0,0]);
					data.should.containEql([5,0]);
					data.should.containEql([5,4]);
					data.should.containEql([0,4]);
					
					// bottom Line
					data.should.containEql([1,0]);
					data.should.containEql([2,0]);
					data.should.containEql([3,0]);
					data.should.containEql([4,0]);
					
					// right up
					data.should.containEql([5,1]);
					data.should.containEql([5,2]);
					data.should.containEql([5,3]);
					
					// top Line
					data.should.containEql([4,4]);
					data.should.containEql([3,4]);
					data.should.containEql([2,4]);
					data.should.containEql([1,4]);
					
					// left down
					data.should.containEql([0,3]);
					data.should.containEql([0,2]);
					data.should.containEql([0,1]);
					
					// fill
					data.should.containEql([1,1]);
					data.should.containEql([1,2]);
					data.should.containEql([1,3]);
					data.should.containEql([2,1]);
					data.should.containEql([2,2]);
					data.should.containEql([2,3]);
					data.should.containEql([3,1]);
					data.should.containEql([3,2]);
					data.should.containEql([3,3]);
					data.should.containEql([4,1]);
					data.should.containEql([4,2]);
					data.should.containEql([4,3]);
					
					done();
				});
			});
		});
	});
		
});
