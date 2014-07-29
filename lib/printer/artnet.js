
// Consoleprinter
// prints the matrix to the screen
 
var _ 			= require('underscore')
	, clc 		= require('cli-color')
	, console	= require('better-console')
	, S			= require('string')
	, artnet 	= require('artnet-node').Client;
	;
	
ArtNetPrinter = module.exports = function artnetprinter(matrix) {
	var printer = this;
	var client = artnet.createClient('192.168.121.110', 6454);
	
	return function write(data){
		var send = [];
		for(y=0;y < matrix.dimension.y; y++){
			for(x=0;x < matrix.dimension.x;x++){
				var test = _.find(data, function(e){ 
					if(e[0]==x && e[1]==y) return 1;
				});			
				if( test ){
					send.push(255);
				} else {
					send.push(0);
				}				
			}
		}
		client.send(send);
	}
}
