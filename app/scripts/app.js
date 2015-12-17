import React from 'react';
import ReactDOM from 'react-dom';

const mountNode = document.getElementById('app');
const Thing = require('./ui/Thing');

class Testing extends React.Component {
  render() {
    return (
      <div>
        <h1>lukasjuhas.com</h1>
        <Thing />
      </div>
    );
  }
}

ReactDOM.render(<Testing />, mountNode);
