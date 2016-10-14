import React from 'react';
import ReactDOM from 'react-dom';


// components
import View from './view';

class Entry extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <View />
      </div>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let root = document.getElementById('root');
  ReactDOM.render(<Entry />, root);
});
