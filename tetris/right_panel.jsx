import React from 'react';

class RightPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="right-panel">
        <div className="instructions">
          A - move left <br></br>
          D - move right <br></br>
          S - move down <br></br>
          Q - rotate counter-clockwise <br></br>
          E - rotate clockwise <br></br>
        </div>
        <div className="social-buttons">
        </div>
      </div>
    );
  }
}

module.exports = RightPanel;
