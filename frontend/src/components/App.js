import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectGlobal } from 'styled-components';
import { getCategories } from '../redux/modules/categories';
import { getPosts } from '../redux/modules/posts';
import Sidebar from './Sidebar';

injectGlobal`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    font-size: 100%;
  }
  body {
    background: #212121;
    color: #fff;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button:focus,
  button:active {
    outline: none;
  }
`;

class App extends Component {
  componentDidMount() {
    this.props.getCategories();
    this.props.getPosts();
  }

  render() {
    const { categories } = this.props;

    return (
      <div className="App">
        <Sidebar categories={categories} />
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
