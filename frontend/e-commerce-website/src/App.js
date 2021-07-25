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
import EditCategory from './components/EditCategory';
import AddCategory from './components/AddCategory';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
                <EditCategory />
              </Route>
              <Route exact path="/edit/categories/add">
                <AddCategory />
              </Route>
              <Route path = "**" render = {() => <NotFound/>}></Route>
            </Switch>
          </div>
      </Router>
    );
  }
    
}

export default App;
