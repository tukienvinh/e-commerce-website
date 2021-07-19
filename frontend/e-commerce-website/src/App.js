import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NotFound from './components/404page';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  state = {
    bootcamp: "Rookies",
  };

  handleSearchKey(e) {
    console.log(e.target.value);
  }

  render() {
    return (
      <Router>
          <div className="App">
            <Navbar onSearchKey={(e) => this.handleSearchKey(e)} />
            <Switch>
              <Route exact path="/">
                <Home bootcamp={this.state.bootcamp}/>
              </Route>

              <Route path = "**" render = {() => <NotFound/>}></Route>
            </Switch>
          </div>
      </Router>
    );
  }
    
}

export default App;
