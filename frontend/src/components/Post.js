import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 1rem;
  border: 1px solid #000;
  border-radius: 0.2rem;
  background: #222;
  margin-bottom: 2rem;
`;

const Author = styled.span``;

const At = styled.span``;

const Title = styled.h1``;

const Post = ({ post }) => {
  const postedBy = `Posted by ${post.author}`;
  const dateTime = `at ${new Date(post.timestamp).toLocaleDateString()} ${new Date(
    post.timestamp
  ).toLocaleTimeString()}`;

  return (
    <Wrapper>
      <Author>{postedBy}</Author>
      <At>{dateTime}</At>
      <Title>{post.title}</Title>
    </Wrapper>
  );
};

export default Post;
