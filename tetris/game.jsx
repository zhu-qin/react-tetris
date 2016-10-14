import Piece from './piece';

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
        [coord[0] - center[0],
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
        [coord[0] + center[0],
        coord[1] + center[1]
        ]
      );
    });

    return finalPos;
  }

  rotateCounterClockwise() {
    if (this.currentPiece.pieceType !== 0) {
      return this.rotate(
        [ [0,-1],
          [1, 0] ]
        );
      }
  }

  rotateClockwise() {
    if (this.currentPiece.pieceType !== 0) {
      return this.rotate(
        [ [0, 1 ],
          [-1, 0] ]
        );
      }
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
    if (typeof delta === 'function') {
      temp = delta();
    } else {
      temp = this.translate(delta);
    }
    let checkBorder = this.checkValid(temp);
    if (!checkBorder) {
      this.currentPiece.coords = temp;
      return;
    } else if (checkBorder === 'left') {
      this.currentPiece.coords = temp;
      this.updatePosition([0,1]);
      return;
    } else if (checkBorder === 'right'){
      this.currentPiece.coords = temp;
      this.updatePosition([0,-1]);
      return;
    } else if (checkBorder && callback) {
      callback();
      return;
    }
  }

  moveDown() {
    this.updatePosition([1,0], () => {
      this.currentPiece.coords.forEach((coord) => {
        this.grid[coord[0]][coord[1]].filled = this.currentPiece.fillColor;
      });
      this.makeNewPiece();
    });
    this.view.forceUpdate();
  }

  moveLeft() {
    this.updatePosition([0,-1]);
  }

  moveRight() {
    this.updatePosition([0,1]);
  }

  checkCompleteRows(){
    
  }

  addListeners(){
    document.addEventListener("keypress", (e) =>{
      if (e.key === 'a') {
        this.moveLeft();
      } else if (e.key === 'd') {
        this.moveRight();
      } else if (e.key === 's') {
        this.moveDown();
      }
      if (e.key === 'q') {
        this.updatePosition(this.rotateCounterClockwise.bind(this));
      } else if (e.key === 'e') {
        this.updatePosition(this.rotateClockwise.bind(this));
      }
      this.view.forceUpdate();
    });
  }

  makeNewPiece() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.currentPiece = null;
    this.currentPiece = new Piece();
    this.startPiece();
  }

  startPiece() {
    this.interval = setInterval(this.moveDown.bind(this), 500);
  }

  static makeGrid() {
    let grid = [];
    for(let i = 0; i < 22; i += 1){
      let row = [];
      for(let j = 0; j < 12; j += 1 ){
        if (j === 0 ) {
          row.push({filled: 'left'});
        } else if (j === 11) {
          row.push({filled: 'right'});
        } else if (i === 0 || i === 21) {
          row.push({filled: 'border'});
        } else {
          row.push({});
        }
      }
      grid.push(row);
    }
    return grid;
  }
}




module.exports = Game;
