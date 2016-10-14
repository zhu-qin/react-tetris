import CONSTANTS from './constants.js';

class Piece {
  constructor() {
    this.pieceType = Piece.getRandomIntInclusive();
    this.coords = CONSTANTS.piecesInit[this.pieceType];
    this.fillColor = "blue";
  }

  static getRandomIntInclusive(min = 0, max = 3) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}



module.exports = Piece;
