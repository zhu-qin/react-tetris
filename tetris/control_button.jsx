import React from 'react';

class ControlButton extends React.Component {
  constructor(props) {
    super(props);
  }

  _movePiece(e){
    this.props.game.keyDownEvent(e, this.props.control);
  }

  render() {
    return (
      <div className={`control-button move${this.props.control}`} onClick={this._movePiece.bind(this)}>
        {this.props.control}
      </div>
    );
  }
}

module.exports = ControlButton;
