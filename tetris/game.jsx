import Piece from './piece';
import CONSTANTS from './constants';

class Game {
  constructor(view) {
    this.score = 0;
    this.view = view;
    this.running = false;
    this.gameLost = false;
    this.grid = Game.makeGrid();
    this.nextPiece = new Piece();
    this.currentPiece = new Piece();
    this.speed = 500;
    this.addListeners();
  }
  // INIT
  makeNewPiece() {
    this.currentPiece = this.nextPiece;
    this.nextPiece = new Piece();
  }

  stopGame(){
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.running = false;
  }

  startGame() {
    let callback = function() {
      this.updatePosition(CONSTANTS.translateDown, this.moveDownCallback.bind(this));
    };
    this.interval = setInterval(callback.bind(this), this.speed);
    this.running = true;
  }

  keyDownEvent(e) {
    if (this.running) {
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
    }
  }

  addListeners(){
    this.listener = this.keyDownEvent.bind(this);
    document.addEventListener('keydown', this.listener);
  }

  removeListeners(){
    document.removeEventListener('keydown', this.listener);
  }

// GAME LOGIC
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
      this.grid[coord[0]].fillCount += 1;
    });
    this.checkCompleteRows();
    if (this.checkGameOver()) {
      clearInterval(this.interval);
      this.gameLost = true;
      this.removeListeners();
      this.view.forceUpdate();
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
    for (let i = 21; i >= 0; i -= 1) {
      if (this.grid[i].fillCount === CONSTANTS.gameWidth){
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
      this.score += 100;
      if (this.score > localStorage.tetrisHighScore) {
        localStorage.tetrisHighScore = this.score;
      }
      this.grid.unshift(Game.buildRow());
    });
  }


  static buildRow () {
    let row = [];
    for(let j = 0; j < CONSTANTS.gameWidth; j += 1 ){
      if (j === 0 || j === 1 ) {
        row.push({filled: 'left' });
        if (!row.fillCount) {
          row.fillCount = 1;
        } else {
          row.fillCount += 1;
        }
      } else if (j === CONSTANTS.gameWidth - 2 || j === CONSTANTS.gameWidth - 1) {
        row.push({filled: 'right'});
        row.fillCount += 1;
      }  else {
        row.push({});
      }
    }
    return row;
  }

  static makeGrid() {
    let grid = [];
    for(let i = 0; i < 23; i += 1){
      if (i === 22) {
        grid.push(Array(CONSTANTS.gameWidth).fill({filled: 'bottom'}));
      } else {
        grid.push(Game.buildRow());
      }
    }
    return grid;
  }
}

module.exports = Game;
