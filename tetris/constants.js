const CONSTANTS = {

  gameWidth:14,

  gameSpeed: 1000,

  pieces: {
    // square piece
    0: {init:[ [1, 6], [1, 7], [0, 6], [0, 7] ]},
    // Line piece
    1: {init:[ [1, 5], [1, 6], [1, 7], [1, 8] ]},
    // T piece
    2: {init:[ [1, 6], [1, 7], [1, 8], [0, 7] ]},
    // Z piece
    3: {init:[ [1, 6], [0, 7], [1, 7], [0, 8] ]},
    // Z piece
    4: {init:[ [1, 6], [0, 6], [1, 7], [0, 5] ]},
    // L piece
    5: {init:[ [0, 6], [1, 6], [1, 7], [1, 8] ]},
    // L piece
    6: {init:[ [0, 8], [1, 8], [1, 7], [1, 6] ]},
  },

  colors: [
    "red",
    "blue",
    "orange",
    "teal",
    "purple",
    "green",
    "red"
  ],

  translateLeft:  [ 0,-1],
  translateRight: [ 0, 1],
  translateDown:  [ 1, 0],


  rotateClockwise:   [ [0, 1 ],
                       [-1, 0] ],

  rotateCounterClockwise:   [ [0,-1],
                              [1, 0] ]

};

module.exports = CONSTANTS;
