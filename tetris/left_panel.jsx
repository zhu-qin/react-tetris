import React from 'react';

class LeftPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  makeGrid() {
    return Array(4).fill().map((el) => {
      return Array(4).fill({});
    });
  }

  changeGameSpeed(e) {
    let game = this.props.game;
    game.speed = Math.abs(1000 - e.target.value);
    if (game.running) {
      game.stopGame();
      game.startGame();
    }
    this.forceUpdate();
  }

  toggleGame(e){
    if (this.props.game.running) {
      this.props.game.stopGame();
    } else {
      this.props.game.startGame();
    }
    this.forceUpdate();
  }

  render() {
    let game = this.props.game;
    let sideDisplayNext;
    if (!game.gameLost){
      let grid = this.makeGrid();
      game.nextPiece.coords.forEach((coord) => {
        grid[coord[0] + 1][coord[1] - 5] = game.nextPiece.fillColor;
      });

      let rows = grid.map((row, rowIdx) => {
        let units = row.map((unit, unitIdx) => {

          return (
            <div key={unitIdx} className={`display-block ${unit}`}>
            </div>
          );
        });

        return (
          <div key={rowIdx} className="row">
            {units}
          </div>
        );
      });

      sideDisplayNext = <div className="nextpiece-display">
                          Next Piece:
                          <div className="nextpiece-display-block">
                            {rows}
                          </div>
                        </div>;
    } else {
      sideDisplayNext = <div className="nextpiece-display">
                          <div className="nextpiece-display-gameover">
                            GAME OVER
                          </div>
                        </div>;
    }

    let gameState = "START";
    if (game.running) {
      gameState = "PAUSE";
    }

    return (
      <div className="left-panel">
        <div className="scores">
          High Score: <br></br>
          {localStorage.tetrisHighScore}<br></br>
          Current Score:<br></br>
          {game.score}
        </div>
        {sideDisplayNext}
        <div className="game-buttons-wrapper">
          <label>Speed: {1000 - game.speed}
            <input className="slide-bar" onChange={this.changeGameSpeed.bind(this)} value={1000 - game.speed} type="range" min="1" max="1000">
            </input>
          </label>
          <div className={`game-buttons ${gameState}`} onClick={this.toggleGame.bind(this)}>
            {gameState}
          </div>
          <div className="game-buttons" onClick={this.props.makeNewGame}>
            RESET
          </div>
        </div>
      </div>
    );
  }
}


module.exports = LeftPanel;
