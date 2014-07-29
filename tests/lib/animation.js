
var   assert 	= require('assert')
	, _		 	= require('underscore')
	, Matrix 	= require('../../lib/matrix')
	, Animation = require('../../lib/animation')
	, Polygon 	= require('../../lib/objects/polygon')
	;

describe('Animation', function(){
	var polygon1	= new Polygon([0,0], [3,0], [3,6], [0,6]);
	var polygon2	= new Polygon([3,1], [6,5], [6,6], [3,6]);

	describe('count animations', function(){
  		var m = new Matrix(10, 10);
  	
		it('should 0 on initialisation', function(done){	
			var animation 	= new Animation(m);
		
			assert.equal(0, animation.count());
			done();
		});
		it('should return 1 after adding a animation', function(done){
			var animation 	= new Animation(m);
			m.addElement('p1', polygon1);
			
			assert.equal(0, animation.count());
			
			var a1 = animation.add(1000, 'p1'
				, function(element, matrix, elements){
					
				}
			);
			assert.equal(typeof a1, "string");
			assert.equal(a1.length, 36);

			assert.equal(1, animation.count());

			done();
		});
		it('should return 0 after adding and removing animation', function(done){
			var animation 	= new Animation(m);
			m.addElement('p1', polygon1);
			m.addElement('p2', polygon2);
			
			assert.equal(0, animation.count());
			
			var a1 = animation.add(1000, 'p1'
				, function(element, matrix, elements){
					
				}
			);
			assert.equal(typeof a1, "string");
			assert.equal(a1.length, 36);
			assert.equal(1, animation.count());

			var a2 = animation.add(1000, 'p2'
				, function(element, matrix, elements){
					
				}
			);
			assert.equal(typeof a2, "string");
			assert.equal(a2.length, 36);
			assert.equal(2, animation.count());

			animation.remove(a1);
			assert.equal(1, animation.count());

			animation.remove(a2);
			assert.equal(0, animation.count());
			
			done();
		});
		
	});

})
