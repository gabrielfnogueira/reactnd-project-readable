import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCategories } from '../redux/modules/categories';
import { getCategoryFromURL } from '../utils/url';

const Wrapper = styled.aside`
  padding: 2rem;
  background-color: #212121;
  border: 1px solid #000;
`;

const Title = styled.h1`
  color: #82aaff;
  font-size: 2rem;
`;

const CategoriesWrapper = styled.nav`
  margin-top: 2rem;
`;

const CategoriesTitle = styled.h3`
  color: #82aaff;
  margin-bottom: 1rem;
`;

const CategoriesList = styled.ul`
  list-style: none;
`;

const CategoriesListItem = styled.li`
  color: ${props => (props.active ? '#82aaff' : '#b2ccd6')};
  margin-top: 0.5rem;
`;

class Sidebar extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  handleLinkClick = () => {
    this.forceUpdate();
  };

  render() {
    const selected = getCategoryFromURL();
    const categories = [
      { name: 'all', path: '/', active: selected === '/' },
      ...this.props.categories.map(cat => ({ ...cat, path: `/${cat.path}`, active: cat.path === selected }))
    ];

    return (
      <Wrapper>
        <Link to="/" onClick={this.handleLinkClick}>
          <Title>Readable</Title>
        </Link>
        <CategoriesWrapper>
          <CategoriesTitle>Categories</CategoriesTitle>
          <CategoriesList>
            {categories.map(cat => (
              <CategoriesListItem key={cat.path} active={cat.active}>
                <Link to={cat.path} onClick={this.handleLinkClick}>
                  {cat.name}
                </Link>
              </CategoriesListItem>
            ))}
          </CategoriesList>
        </CategoriesWrapper>
      </Wrapper>
    );
  }
}

Sidebar = connect(
  state => ({
    categories: state.categories
  }),
  {
    getCategories
  }
)(Sidebar);

export default Sidebar;
