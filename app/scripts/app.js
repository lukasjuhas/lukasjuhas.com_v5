import React, { PropTypes, Component } from 'react';
import { RouteHandler } from 'react-router';
import Nav from './components/Nav';

export default class App extends Component {
  static propTypes: {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  }
  render() {
    return (
      <div>
        <Nav />
        <RouteHandler {...this.props} />
      </div>
    );
  }
}
