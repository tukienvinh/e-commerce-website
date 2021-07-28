import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { get, post } from "../../httpHelper";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleCategory = this.toggleCategory.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.fetchCategoryList = this.fetchCategoryList.bind(this);
  }

  state = {
    dropdownOpen: false,
    dropdownCategory: false,
    categoryList: []
  }

  componentDidMount() {
    this.fetchCategoryList();
  }

  fetchCategoryList() {
    get("/api/categories").then((response) => {
      if (response.status === 200) {
        this.setState({ categoryList: response.data });
      }
    }).catch((error => {
        console.log(error.response.data.message);
    }));
  }

  toggle() { 
    this.setState({dropdownOpen: !this.state.dropdownOpen})
  };

  toggleCategory() { 
    this.setState({dropdownCategory: !this.state.dropdownCategory})
  };

  handleLogOut() {
    post(`/api/users/logout`, {}).then((response) => {
      if (response.status === 200) {
        confirmAlert({
          title: 'Notification',
          message: response.data.message,
          buttons: [
            {
                label: 'Ok',
                onClick: () => {
                  localStorage.clear();
                  window.location.href = "/";
                }
            }
          ]
        });
      }
      
    }).catch((error) => {
        console.log(error.response.data.message);
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
            <li>
              <ButtonDropdown isOpen={this.state.dropdownCategory} toggle={this.toggleCategory} id="dropdown_categories">
                <DropdownToggle id="dropdown_toggle">
                    Categories
                </DropdownToggle>
                  <DropdownMenu>
                    {this.state.categoryList.map((category) => (
                    <Link to={`/categories/${category.name}`} id="item-category"><DropdownItem key={category.id}>{category.name}</DropdownItem></Link>
                    ))}
                  </DropdownMenu>
              </ButtonDropdown>
            </li>
            <Link to="/products">
              <li>Products</li>
            </Link>
          </ul>

          {/*Search bar */}
          {/* <div class="search-container">
            <form action="/search">
              <input type="text" placeholder="Search for your book.." name="search" onChange={(e) => this.props.onSearchKey(e)}/>
              <button type="submit"><FaSearch/></button>
            </form>
          </div> */}

          <Button id="navbar-cart" href="/shopping-cart"><FaShoppingCart/></Button>
          { !localStorage.getItem("loggedIn") ? (
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
                <DropdownItem href="/edit/profile">Your profile</DropdownItem>
                <DropdownItem href="/edit/password">Change password</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={ this.handleLogOut } >Log out</DropdownItem>
              </DropdownMenu>
              ) : (
                <DropdownMenu>
                  <DropdownItem href="/edit/profile">Your profile</DropdownItem>
                  <DropdownItem href="/edit/password">Change password</DropdownItem>
                  <DropdownItem href="/edit/categories">Manage categories</DropdownItem>
                  <DropdownItem href="/manage/products">Manage products</DropdownItem>
                  <DropdownItem href="/manage/users">Manage users</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={ this.handleLogOut }>Log out</DropdownItem>
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


