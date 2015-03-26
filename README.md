Dirarare Client Lib
===============
a node.js module for low-level animated 2D-Pixel Art

This library draw, fill, move and resize 2D-Pixel art to a grid like a LED-Matrix. 

Tests
-------
run 

```bash
npm test
```

ConsoleDebugger
-----------------------
![ConsoleDebug](https://raw.githubusercontent.com/petershaw/dirarare-client-lib/master/docs/images/consoleDebug.png) 

eg: 

```bash
node consoleDebug.js polygon 1,0 5,0 7,5 1,5
```
or

```bash
node consoleDebug.js line 1,0 5,0
```

Elements
----------------------
* Point
* Line
* Polygon

Printer
----------------------
To build and debug your animation code, use the ConsolePrinter. See examples in /examples directory

```JavaScript
var dirarare = require('dirarare-client-lib');
var matrix = new dirarare.Matrix(8, 8);
var ConsolePrinter = new dirarare.ConsolePrinter(matrix);
matrix.setTarget( ConsolePrinter );
```

To run your animation on the dirarare pixel matrix, just replace the printer with the ArtNetPrinter module.

```JavaScript
var Matrix = require('./lib/matrix')
var ArtNetPrinter = require('./lib/printer/artnet')(matrix);
matrix.setTarget( ArtNetPrinter );
```

It is possible to add two ore more printer targets to the matrix:

```JavaScript
var dirarare = require('dirarare-client-lib');
var matrix = new dirarare.Matrix(8, 8);
var ConsolePrinter = new dirarare.ConsolePrinter(matrix);
var ArtNetPrinter = new dirarare.ArtNetPrinter(matrix);
matrix.setTarget( ConsolePrinter, ArtNetPrinter );
```

## Examples
A working Pong in 155 lines of code is here: 
[Dirarare Pong](https://github.com/petershaw/dirarare-example-pong)


Supported 
----------------------
- Polygons
- Lines
- Movement
- Resizing
- Dimming

Still unsupported 
----------------------

- Multi Server Support (Multiplxing)

Contribution
-----------------
Yes, please! If you want to help, feel free! I am glad about every pull request.
