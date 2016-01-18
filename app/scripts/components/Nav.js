import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navOpen: false,
    };
  }
  handleClick() {
    this.setState({ navOpen: !this.state.navOpen });
  }
  render() {
    const classActive = this.state.navOpen ? 'active' : '';
    return (
        <div>
          <a onClick={this.handleClick.bind(this)} className={'hamburger ' + classActive} href="#" title="Menu">
            <span className="line-1"></span>
            <span className="line-2"></span>
            <span className="line-3"></span>
          </a>
          <ul className={'navigation ' + classActive}>
            <Link to="home"><li className="navigation-item">Home</li></Link>
            <Link to="about"><li className="navigation-item">About</li></Link>
            <Link to="feedList"><li className="navigation-item">Feed List</li></Link>
          </ul>
        </div>
    );
  }
}
