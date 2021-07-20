import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch } from 'react-icons/fa';

export default class index extends Component {
  render() {
    return (
      <div>
        <nav id='navbar'>
          <ul>
            <Link to="/">
              <li>RookieShop</li>
            </Link>
            <Link to="/categories">
              <li>Categories</li>
            </Link>
            <Link to="/products">
              <li>Products</li>
            </Link>
          </ul>

          <div class="search-container">
            <form action="/search">
              <input type="text" placeholder="Search for your book.." name="search"/>
              <button type="submit"><FaSearch/></button>
            </form>
          </div>

          <ul>
            <Link to="/signin">
              <li>Sign in / Sign up</li>
            </Link>
          </ul>
        </nav>
      </div>
    );
  }
}


