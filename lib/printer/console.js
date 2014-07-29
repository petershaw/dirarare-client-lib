
// Consoleprinter
// prints the matrix to the screen
 
var _ 			= require('underscore')
	, clc 		= require('cli-color')
	, console	= require('better-console')
	, S			= require('string')
	;
	
ConsolePrinter = module.exports = function consoleprinter(matrix) {
	var printer = this;
	
	return function write(data){
		console.clear();
		console.log(S(clc.blue('--')).repeat(2 +matrix.dimension.x).s);
		for(y=0;y < matrix.dimension.y; y++){
	
			var row = clc.blue('| ');
			for(x=0;x < matrix.dimension.x;x++){
				var test = _.find(data, function(e){ 
					if(e[0]==x && e[1]==y) return 1;
				});			
				if( test ){
					row += clc.red('██');
				} else {
					row += clc.red('  ');
				}				
			}
			row += clc.blue(' |');
			console.log(row);

		}
		console.log(S(clc.blue('--')).repeat(2 +matrix.dimension.x).s);
	}
}
