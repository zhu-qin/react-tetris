import React from 'react';
import ReactDOM from 'react-dom';
import LeftPanel from './left_panel';
import RightPanel from './right_panel';
import Game from './game';

class View extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      game: new Game(this)
    };
  }

  makeNewGame(){
    this.state.game.removeListeners();
    this.setState({game: new Game(this)});
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
        if (unit.filled) {
          additionClass = unit.filled;
        }
        return (
          <div key={idx2} className={`block ${additionClass} ${currentPieceClass}`}>
          </div>
        );
      });
      return (
        <div key={idx1} className={`row row-index-${idx1}`}>
          {units}
        </div>
      );
    });

    return (
      <div className="app-wrapper">
        <a href="http://qin-zhu.com" target="_blank" className="game-title">{"REACT TETRIS BY QIN ZHU"}</a>
        <div className="game-wrapper">
          <LeftPanel game={this.state.game} makeNewGame={this.makeNewGame.bind(this)}/>
          <div className="gameview">
            {rows}
          </div>
          <RightPanel />
        </div>
      </div>
    );
  }
}

module.exports = View;
