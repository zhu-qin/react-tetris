import CONSTANTS from './constants.js';

class Piece {
  constructor() {
    this.pieceType = Piece.getRandomIntInclusive();
    this.coords = CONSTANTS.pieces[this.pieceType].init;
    // this.pivot = CONSTANTS.piecesInit.pivot;
    this.fillColor = CONSTANTS.colors[Piece.getRandomIntInclusive()];
  }

  static getRandomIntInclusive(min = 0, max = 6) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}



module.exports = Piece;
