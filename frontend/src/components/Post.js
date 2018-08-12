import { faComments, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import Voter from './Voter';

const Wrapper = styled.div`
  padding: 1rem 1rem 0.5rem 0.5rem;
  border: 1px solid #000;
  border-radius: 0.2rem;
  background: #222;
  margin-bottom: 2rem;
  color: #444;
  display: grid;
  grid-template-columns: 3rem 1fr;
  cursor: pointer;

  &:hover {
    border-color: #444;
  }
`;

const PostInfo = styled.div``;

const Author = styled.span`
  font-size: 0.85rem;
`;

const At = styled.span`
  font-size: 0.85rem;
`;

const Title = styled.h1`
  color: #fff;
  margin-top: 0.5rem;
`;

const Button = styled.button`
  font-size: 0.85rem;
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0.5rem;
  color: inherit;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`;

const Comments = ({ commentCount }) => {
  let label = 'no comments yet';

  if (commentCount) {
    label = `${commentCount} ${commentCount === 1 ? 'comment' : 'comments'}`;
  }

  return (
    <Fragment>
      <FontAwesomeIcon icon={faComments} /> {label}
    </Fragment>
  );
};

const Post = ({ post }) => {
  const postedBy = `posted by ${post.author}`;
  const dateTime = `at ${new Date(post.timestamp).toLocaleDateString()} ${new Date(
    post.timestamp
  ).toLocaleTimeString()}`;

  return (
    <Wrapper>
      <Voter value={post.voteScore} />
      <PostInfo>
        <Author>{postedBy}</Author> <At>{dateTime}</At>
        <Title>{post.title}</Title>
        <Button>
          <Comments commentCount={post.commentCount} />
        </Button>
        <Button>
          <FontAwesomeIcon icon={faPencilAlt} /> edit
        </Button>
        <Button>
          <FontAwesomeIcon icon={faTrashAlt} /> delete
        </Button>
      </PostInfo>
    </Wrapper>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired
};

export default Post;
