import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div``;

const Title = styled.h1`
  margin-bottom: 2rem;
`;

const HomeLink = styled(Link)`
  font-weight: bold;
  text-decoration: underline;
`;

const Post404 = () => {
  return (
    <Wrapper>
      <Title>Post not found :(</Title>
      <p>
        Why don't you go back <HomeLink to="/">home</HomeLink> and check the other posts?
      </p>
    </Wrapper>
  );
};

export default Post404;
