import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { get, post } from "../../httpHelper";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FaSearch } from 'react-icons/fa';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleViewProfile = this.handleViewProfile.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  state = {
    dropdownOpen: false
  }

  toggle() { 
    this.setState({dropdownOpen: !this.state.dropdownOpen})
  };

  handleViewProfile() {
    get(`/api/users`).then((response) => {
      if (response.status === 200) {
        console.log(response.data);
      }
    }).catch((response) => {
      console.log(response);
    });
  };

  handleLogOut() {
    post(`/api/users/logout`, {}).then((response) => {
      console.log(response.data);
      localStorage.clear();
    }).catch((response) => {
        console.log(response);
    });
  }

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
              <input type="text" placeholder="Search for your book.." name="search" onChange={(e) => this.props.onSearchKey(e)}/>
              <button type="submit"><FaSearch/></button>
            </form>
          </div>
          { !this.props.isLoggedIn ? (
            <ul>
            <Link to="/signin">
              <li>Sign in</li>
            </Link>
            <Link to="/signup">
              <li>Sign up</li>
            </Link>
          </ul>
          ) : (
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} id="dropdown">
              <DropdownToggle id="dropdown_toggle">
                {localStorage.getItem("name")}
              </DropdownToggle>
              {localStorage.getItem("role") === "ROLE_USER" ? (
                <DropdownMenu>
                <DropdownItem onClick={ this.handleViewProfile }>Your profile</DropdownItem>
                <DropdownItem href="/orders">Your orders</DropdownItem>
                <DropdownItem href="/edit/password">Change password</DropdownItem>
                <DropdownItem href={window.location.href} onClick={ this.handleLogOut } >Log out</DropdownItem>
              </DropdownMenu>
              ) : (
                <DropdownMenu>
                  <DropdownItem href="/edit/profile">Your profile</DropdownItem>
                  <DropdownItem href="/orders">Pending orders</DropdownItem>
                  <DropdownItem href="/edit/password">Change password</DropdownItem>
                  <DropdownItem href="/block">Manage users</DropdownItem>
                  <DropdownItem href="/logout">Log out</DropdownItem>
                </DropdownMenu>
              )}
              </ButtonDropdown>
              )
          }
        </nav>
      </div>
    );
  }
}


