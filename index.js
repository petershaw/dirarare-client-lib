
module.exports = {

	  Matrix: 			require('./lib/matrix.js')
	, Movement:			require('./lib/movement.js')
	, Element: 			require('./lib/element.js')
	, Animation: 		require('./lib/animation.js')
	
	// Printer
	, ConsolePrinter:	require('./lib/printer/console')
	, ArtNetPrinter:	require('./lib/printer/artnet')
	
	// Objects
	, Line:				require('./lib/objects/line')
	, Polygon:			require('./lib/objects/polygon')	
}
