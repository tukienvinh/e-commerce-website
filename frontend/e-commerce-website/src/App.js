import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NotFound from './components/404page';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Category from './components/Category';
import Product from './components/Product';
import CategoryProducts from './components/CategoryProducts';
import ProductDetail from './components/ProductDetail';
import ManageCategory from './components/ManageCategory';
import AddCategory from './components/AddCategory';
import EditCategory from './components/EditCategory';
import ManageUsers from './components/ManageUsers';
import ManageProducts from './components/ManageProducts';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import EditProfile from './components/EditProfile';
import EditPassword from './components/EditPassword';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ShoppingCart from './components/ShoppingCart';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchKey= this.handleSearchKey.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  state = {
    username: "",
    password: "",
    role: "",
    isLoggedIn: false
  };

  handleSearchKey(e) {
    console.log(e.target.value);
  };

  async handleSignIn(e) {
    await this.setState({ username: localStorage.getItem("username"), password: e.target.password.value, isLoggedIn: true});
    console.log(this.state.username);
    console.log(this.state.password);
  };

  render() {
    return (
      <Router>
          <div className="App">
            <Navbar onSearchKey={(e) => this.handleSearchKey(e)} isLoggedIn={this.state.isLoggedIn}/>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/signin">
                <SignIn onSignIn={ (e) => this.handleSignIn(e) }/>
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/categories">
                <Category />
              </Route>
              <Route exact path="/categories/:categoryName">
                <CategoryProducts />
              </Route>
              <Route exact path="/products">
                <Product />
              </Route>
              <Route exact path="/products/:productId">
                <ProductDetail />
              </Route>
              <Route exact path="/edit/categories">
                <ManageCategory />
              </Route>
              <Route exact path="/edit/categories/add">
                <AddCategory />
              </Route>
              <Route exact path="/edit/categories/edit/:categoryId">
                <EditCategory />
              </Route>
              <Route exact path="/edit/profile">
                <EditProfile />
              </Route>
              <Route exact path="/edit/password">
                <EditPassword />
              </Route>
              <Route exact path="/manage/users">
                <ManageUsers />
              </Route>
              <Route exact path="/manage/products">
                <ManageProducts />
              </Route>
              <Route exact path="/manage/products/add">
                <AddProduct />
              </Route>
              <Route exact path="/manage/products/edit/:productId">
                <EditProduct />
              </Route>
              <Route exact path="/shopping-cart">
                <ShoppingCart />
              </Route>
              <Route path = "**" render = {() => <NotFound/>}></Route>
            </Switch>
          </div>
      </Router>
    );
  }
    
}

export default App;
