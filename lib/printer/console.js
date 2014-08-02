
// Consoleprinter
// prints the matrix to the screen
 
var _ 			= require('underscore')
	, clc 		= require('cli-color')
	, console	= require('better-console')
	, S			= require('string')
	;
	
ConsolePrinter = module.exports = function consoleprinter(matrix) {
	var printer = this;
	
	dim = [
		  clc.xterm(231)
		, clc.xterm(254)
		, clc.xterm(251)
		, clc.xterm(248)
		, clc.xterm(245)
		, clc.xterm(242)
		, clc.xterm(239)
		, clc.xterm(236)
		, clc.xterm(232)
		, clc.xterm(0)
	];
	
	return function write(data){
		console.clear();
		console.log(S(clc.blue('--')).repeat(2 +matrix.dimension.x).s);
		for(y=0;y < matrix.dimension.y; y++){
	
			var row = clc.blue('| ');
			for(x=0;x < matrix.dimension.x;x++){
				var test = _.find(data, function(e){ 
					if(e[0]==x && e[1]==y) return e;
				});			

				if( test ){
					var pFn = dim[parseInt((9 / 255) * test[2])];
					row += pFn('██');
				} else {
					row += clc.white('  ');
				}				
			}
			row += clc.blue(' |');
			console.log(row);

		}
		console.log(S(clc.blue('--')).repeat(2 +matrix.dimension.x).s);
	}
}
