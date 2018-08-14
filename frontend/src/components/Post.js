import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { savePostVote } from '../redux/modules/posts';
import Info from './Info';

const Wrapper = styled.div`
  padding: 1rem 1rem 0.5rem 0.5rem;
  border: 1px solid #000;
  border-radius: 0.2rem;
  background: #222;
  color: #444;
`;

let Post = ({ post, comments, savePostVote }) => {
  if (!post) {
    return null;
  }

  return (
    <Wrapper>
      <Info
        onVote={option => savePostVote(post.id, option)}
        data={{ ...post, commentCount: comments ? Object.keys(comments).length : post.commentCount }}
        showBody
        authorLabel="posted by "
      />
    </Wrapper>
  );
};

Post.propTypes = {
  postId: PropTypes.string,
  savePostVote: PropTypes.func.isRequired
};

Post = connect(
  (state, props) => ({
    post: state.posts[props.postId],
    comments: state.comments[props.postId]
  }),
  {
    savePostVote
  }
)(Post);

export default Post;
