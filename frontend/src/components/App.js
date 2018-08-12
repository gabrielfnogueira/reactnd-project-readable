import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled, { injectGlobal } from 'styled-components';
import PostList from './PostList';
import Sidebar from './Sidebar';

injectGlobal`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    font-size: 100%;
    font-family: sans-serif;
  }
  body {
    background: #1a1a1a;
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 25rem 1fr;
  height: 100vh;
`;

export const Content = styled.div`
  padding: 2rem;
`;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <GridContainer>
          <Sidebar />
          <Content>
            <Switch>
              <Route
                path="/:category?"
                render={props => {
                  return <PostList selectedCategory={props.match.params.category} />;
                }}
              />
            </Switch>
          </Content>
        </GridContainer>
      </BrowserRouter>
    );
  }
}

export default App;
