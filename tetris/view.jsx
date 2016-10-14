import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game';

class View extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      game: new Game(this)
    };
  }

  render() {
    let game = this.state.game;

    let rows = game.grid.map((row, idx1) => {
      let units = row.map((unit, idx2) => {
        let currentPieceClass;

        game.currentPiece.coords.forEach((coord) =>{
          if (idx1 === coord[0] && idx2 === coord[1]) {
            currentPieceClass = game.currentPiece.fillColor;
          }
        });
        let additionClass;
        if (unit) {
          additionClass = unit.filled;
        }
        return (
          <div key={idx2} className={`block ${additionClass} ${currentPieceClass}`}>

          </div>
        );
      });
      return (
        <div key={idx1} className="row">
          {units}
        </div>
      );
    });

    return (
      <div className="board">
        {rows}
      </div>
    );
  }
}

module.exports = View;
