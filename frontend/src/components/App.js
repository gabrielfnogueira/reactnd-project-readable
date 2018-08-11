import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../logo.svg';
import { getCategories } from '../redux/modules/categories';
import { getPosts } from '../redux/modules/posts';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.getCategories();
    this.props.getPosts();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

App = connect(
  state => ({
    categories: state.categories,
    posts: state.posts
  }),
  {
    getCategories,
    getPosts
  }
)(App);

export default App;
