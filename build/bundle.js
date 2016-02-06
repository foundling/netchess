/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var app = __webpack_require__(1);
	app.run();
	console.log('test');


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Piece = __webpack_require__(2);
	var Player = __webpack_require__(3);
	var Board = __webpack_require__(4);
	var GameEngine = __webpack_require__(5);

	var run = function() {

	  /*
	  var board = new Board(8,8);
	  var player1 = new Player('player1','near',board);
	  var player2 = new Player('player2','far',board);
	  var gameEngine = new GameEngine(board,player1,player2);
	  gameEngine.mainLoop();
	  */

	};

	module.exports = exports = {
	  run: run
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var Piece = function(name, position, pieceMoves){
	  this.name = name;
	  this.position = position;
	  this.pieceMoves = pieceMoves;
	  this.alive = true;
	  this.next = function() {};
	}; 



	module.exports = exports = Piece;


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var Player = function(name, side, board) {

	  this.name = name;
	  this.side = side;
	  this._board = board;
	  this.pieces = {
	    pawn:   8,   
	    king:   1,
	    queen:  1,
	    bishop: 2,
	    knight: 2,
	    rook:   2,
	  };
	};

	module.exports = exports = Player;


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var Board = function(height, width) {

	  this._board = new Array(height);
	  for (var i = 0; i < height; i++) {
	    this._board[i] = new Array(width);
	  }
	  this.height = height;
	  this.width = width;
	};

	Board.prototype.setPiece = function(piece) {

	  var x = piece.position[0],
	      y = piece.position[1];

	  this._board[x][y] = piece;

	};

	Board.prototype.getPiece = function(position) {
	  var x = position[0],
	      y = position[1];

	  return this._board[x][y];    
	};

	module.exports = exports = Board;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var RuleEngine = __webpack_require__(7); 

	var GameEngine = function(board, player1, player2) {
	  // duties:  
	  // handle turns, ref the game (mark players dead, determine checkmate, reverse board on each turn)

	  this.gameState = {
	    whoseMove: player1.name,    
	    gameOver: false,
	    currentMove: {
	      'from': null,
	      'to': null
	    },
	    total : 0,
	  };

	  this.ruleEngine = new RuleEngine();
	  this.board = board;
	};

	GameEngine.prototype.setup = function() {
	      this.board.initBoard();
	};

	GameEngine.prototype.getNextMove = function() {
	    process.stdout.write(this.gameState.whoseMove + ': ');
	    process.stdin.once('data', function(data) {
	      var move,
	          from,
	          to;

	      move = data.toString().split(' '); //input sample:  1,2 1,3
	      from = move[0];
	      to = move[1];
	      this.gameState.currentMove = { from: from, to: to }; 
	      this.mainLoop();
	    }.bind(this));
	};

	GameEngine.prototype.refreshDisplay = function() {
	  this.gameState.total++;
	  console.log(this.board.toString());
	  this.gameState.whoseMove = (this.gameState.whoseMove === 'player1') ? 'player2' : 'player1';
	};

	GameEngine.prototype.mainLoop = function() {
	  if (this.gameState.total == 5) /*this.gameOver)*/ process.exit();
	  this.refreshDisplay();
	  this.getNextMove();
	};

	module.exports = exports = GameEngine;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var RuleEngine = function() {

	  this.validators = {

	    pawn: {

	      single: function(startPos, endPos) {
	        var deltaX = endPos[0] - startPos[0];  
	        var deltaY = endPos[1] - startPos[1];
	        return deltaX === 0 && deltaY === 1;
	      },

	      doubleStart: function(startPos, endPos) {
	        var deltaX = endPos[0] - startPos[0];  
	        var deltaY = endPos[1] - startPos[1];
	        return deltaX === 0 && deltaY === 2;
	      },

	      capture: function(startPos, endPos) {
	        var deltaX = endPos[0] - startPos[0];  
	        var deltaY = endPos[1] - startPos[1];
	        return Math.abs(deltaX === 1) && deltaY === 1;
	      }

	    },

	    knight: {

	      lShape: function(startPos, endPos) {
	        var deltaX = Math.abs(endPos[0] - startPos[0]);
	        var deltaY = Math.abs(endPos[1] - startPos[1]);
	        var hypotenuse = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
	        return hypotenuse === Math.sqrt(5);
	      }

	    },

	    queen: {

	      straightLine: function(startPos, endPos) {
	        var startX = startPos[0];
	        var startY = startPos[1];
	        var endX = endPos[0];
	        var endY = endPos[1];
	        // do either the x coords or y coords remain the same? 
	        return  (startX === endX) || (startY === endY);  
	      },

	      diagonal: function(startPos, endPos) {
	        var deltaX = Math.abs(endPos[0] - startPos[0]);
	        var deltaY = Math.abs(endPos[1] - startPos[1]);
	        // is the absolute change in x the same as the absolute change in y?
	        return deltaX === deltaY;
	      },

	    },

	    king: {

	      oneSpace: function(startPos, endPos) {
	        var deltaX = Math.abs(startPos[0] - endPos[0]);
	        var deltaY = Math.abs(startPos[1] - endPos[1]);
	        var hypotenuse = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));       
	        console.log(deltaX,deltaY,hypotenuse);
	        return (hypotenuse === 1) || (hypotenuse === Math.sqrt(2));
	      },
	    }

	  };
	};

	module.exports = exports = RuleEngine;


/***/ }
/******/ ]);