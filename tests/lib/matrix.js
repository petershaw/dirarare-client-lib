
var   assert = require('assert')
	, _		 = require('underscore')
	, matrix = require('../../lib/matrix')
	;

describe('Matrix', function(){
  describe('countLights', function(){
    it('should return 64 when the array is a 8x8', function(done){
    	var m = new matrix(8, 8);
		assert.equal(64, m.countLights);
		done();
    });
    it('should return 24 when the array is a 4x6', function(done){
    	var m = new matrix(4, 6);
		assert.equal(24, m.countLights);
		done();
    });
  });
  
  describe('blackout', function(){
    it('should return 64 elements, all zero valued when the array is a 8x8', function(done){
    	var m = new matrix(8, 8);
		var sum = _.reduce(m.blackout(), function(memo, num){ return memo + num; }, 0);
		assert.equal(64, m.blackout().length);
		assert.equal(0, sum);
		
		var sum = _.reduce(m.current, function(memo, num){ return memo + num; }, 0);
		assert.equal(64, m.current.length);
		assert.equal(0, sum);
		
		done();
    });
    it('should return 24 elements, all zero valued when the array is a 4x6', function(done){
    	var m = new matrix(4, 6);
		var sum = _.reduce(m.blackout(), function(memo, num){ return memo + num; }, 0);
		assert.equal(24, m.blackout().length);
		assert.equal(0, sum);

		var sum = _.reduce(m.current, function(memo, num){ return memo + num; }, 0);
		assert.equal(24, m.current.length);
		assert.equal(0, sum);

		done();
    });
  });
  
  describe('dimensions', function(){
    it('should return the right dimension after initialisation', function(done){
    	var m = new matrix(10, 4);
		assert.equal('object', typeof m.dimension);
		assert.equal(10, m.dimension.x);
		assert.equal(4, m.dimension.y);
		
		done();
    });
  });
  
  
})
