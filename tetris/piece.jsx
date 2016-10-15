import CONSTANTS from './constants.js';

class Piece {
  constructor() {
    this.pieceType = Piece.getRandomIntInclusive();
    this.coords = CONSTANTS[this.pieceType].init;
    // this.pivot = CONSTANTS.piecesInit.pivot;
    this.fillColor = "blue";
  }

  static getRandomIntInclusive(min = 0, max = 6) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let result =  Math.floor(Math.random() * (max - min + 1)) + min;
    return result;
  }

}



module.exports = Piece;
