import Piece from './piece';
import CONSTANTS from './constants';

class Game {
  constructor(view) {
    this.view = view;
    this.grid = Game.makeGrid();
    this.currentPiece = undefined;
    this.makeNewPiece();
    this.addListeners();
  }

  rotate(matrix) {
    let center = this.currentPiece.coords[1];
    let relativePos = this.currentPiece.coords.map((coord) => {
      return (
        [ coord[0] - center[0],
          coord[1] - center[1]
                                ]
      );
    });

    let rotated = relativePos.map((coord) => {
      let row = matrix[0][0]*coord[0] + matrix[0][1]*coord[1];
      let col = matrix[1][0]*coord[0] + matrix[1][1]*coord[1];
      return [row, col];
    });

    let finalPos = rotated.map((coord) => {
      return (
        [ coord[0] + center[0],
          coord[1] + center[1]
                                ]
      );
    });

    return finalPos;
  }

  translate(delta) {
    let finalPos = this.currentPiece.coords.map((coord) => {
      return ([coord[0] + delta[0], coord[1] + delta[1]]);
    });
    return finalPos;
  }

  checkValid(coords) {
    let results;
    coords.forEach((coord) => {
      if (this.grid[coord[0]][coord[1]].filled) {
        results = this.grid[coord[0]][coord[1]].filled;
      }
    });
    return results;
  }

  updatePosition(delta, callback){
    let temp;
    if (Array.isArray(delta[0])) {
      if (this.currentPiece.pieceType !== 0) {
        temp = this.rotate(delta);
      } else {
        temp = this.currentPiece.coords;
      }
    } else {
      temp = this.translate(delta);
    }
    let checkBorder = this.checkValid(temp);
    if (!checkBorder) {
      this.currentPiece.coords = temp;
    } else if (checkBorder === 'left') {
      this.currentPiece.coords = temp;
      this.updatePosition(CONSTANTS.translateRight);
    } else if (checkBorder === 'right'){
      this.currentPiece.coords = temp;
      this.updatePosition(CONSTANTS.translateLeft);
    } else if (checkBorder && callback) {
      callback();
    }
    this.view.forceUpdate();
  }

  moveDownCallback(){
    this.currentPiece.coords.forEach((coord) => {
      this.grid[coord[0]][coord[1]].filled = this.currentPiece.fillColor;
    });
    this.checkCompleteRows();
    if (this.checkGameOver()) {
      clearInterval(this.interval);
    } else {
      this.makeNewPiece();
    }
  }

  checkGameOver() {
    for (let i = 2; i < 11; i += 1) {
      if (this.grid[0][i].filled) {
        return true;
      }
    }
  }

  checkCompleteRows(){
    let completedRows = [];
    for (let i = 20; i >= 0; i -= 1) {
      let emptySlots;
      for(let j = 2; j < 14; j += 1) {
        if (!this.grid[i][j].filled) {
          emptySlots = true;
        }
      }

      if(!emptySlots){
        completedRows.push(i);
      }
    }

    if (completedRows.length > 0) {
      this.deleteFullRows(completedRows);
    }

  }

  deleteFullRows(completedRows) {
    completedRows.forEach((row) => {
      delete this.grid[row];
    });

    this.grid = this.grid.filter((row) => {
      if (row) {
        return row;
      }
    });

    completedRows.forEach((el) => {
      this.grid.unshift(Game.buildRow());
    });
  }

  addListeners(){
    document.addEventListener("keydown", (e) =>{
      if (e.key === 'a') {
        this.updatePosition(CONSTANTS.translateLeft);
      } else if (e.key === 'd') {
        this.updatePosition(CONSTANTS.translateRight);
      } else if (e.key === 's') {
        this.updatePosition(CONSTANTS.translateDown, this.moveDownCallback.bind(this));
      }
      if (e.key === 'q') {
        this.updatePosition(CONSTANTS.rotateCounterClockwise);
      } else if (e.key === 'e') {
        this.updatePosition(CONSTANTS.rotateClockwise);
      }
    });
  }

  makeNewPiece() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.currentPiece = new Piece();
    this.startPiece();
  }

  startPiece() {
    let callback = function() {
      this.updatePosition(CONSTANTS.translateDown, this.moveDownCallback.bind(this));
    };
    this.interval = setInterval(callback.bind(this), CONSTANTS.gameSpeed);
  }

  static buildRow () {
    let row = [];
    for(let j = 0; j < 14; j += 1 ){
      if (j === 0 || j === 1 ) {
        row.push({filled: 'left' });
      } else if (j === 12 || j === 13) {
        row.push({filled: 'right'});
      }  else {
        row.push({});
      }
    }
    return row;
  }

  static makeGrid() {
    let grid = [];
    for(let i = 0; i < 22; i += 1){
      if (i === 21) {
        grid.push(Array(14).fill({filled: 'bottom'}));
      } else {
        grid.push(Game.buildRow());
      }
    }
    return grid;
  }
}

module.exports = Game;
