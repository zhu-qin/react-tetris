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
          <a href="https://github.com/zhu-qin/react-tetris" target="_blank" className="game-buttons">Github</a>
          <a href="http://www.linkedin.com/in/qin-zhu" target="_blank" className="game-buttons">LinkedIn</a>
          <a href="http://qin-zhu.com/assets/docs/resume.pdf" target="_blank" className="game-buttons">Resume</a>
        </div>
      </div>
    );
  }
}

module.exports = RightPanel;
