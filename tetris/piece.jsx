import CONSTANTS from './constants.js';

class Piece {
  constructor() {
    this.pieceType = Piece.getRandomIntInclusive();
    this.coords = CONSTANTS.pieces[this.pieceType].init;
    this.fillColor = CONSTANTS.colors[this.pieceType];
  }

  static getRandomIntInclusive(min = 0, max = 6) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}



module.exports = Piece;
