const CONSTANTS = {

  gameSpeed: 300,

  pieces: {
    0: {init:[ [1, 5], [1, 6], [0, 5], [0, 6] ]},
    1: {init:[ [1, 4], [1, 5], [1, 6], [1, 7] ]},
    2: {init:[ [1, 5], [1, 6], [1, 7], [0, 6] ]},
    3: {init:[ [1, 5], [0, 6], [1, 6], [0, 7] ]},
    4: {init:[ [1, 5], [0, 5], [1, 6], [0, 4] ]},
    5: {init:[ [0, 5], [1, 5], [1, 6], [1, 7] ]},
    6: {init:[ [0, 7], [1, 7], [1, 6], [1, 5] ]},
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
