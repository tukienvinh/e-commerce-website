import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './Navbar.css'

export default class index extends Component {
  state = {
    name: "Vinh"
  };

  render() {
    return (
      <div>
        <nav id='navbar'>
        <ul>
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/contact">
                <li>Contact</li>
              </Link>
              <Link to="/about">
                <li>About</li>
              </Link>
            </ul>

          <input type="text" onChange={(e) => this.props.onSearchKey(e)} />

          <div className="nav-details">
            <p className="nav-username"> {this.state.name} </p>
          </div>
        </nav>
      </div>
    );
  }
}


