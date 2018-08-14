import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { saveCommentVote } from '../redux/modules/comments';
import Info from './Info';

const Wrapper = styled.div`
  /* padding-left: 1rem; */
`;

const List = styled.ul`
  list-style: none;
  background: #222;
  border: 1px solid #000;
  border-top: none;
  border-radius: 0 0 0.2rem 0.2rem;
  color: #444;
`;

const ListItem = styled.li`
  border-bottom: 1px solid #000;
  padding: 1rem 0.5rem 0.5rem;
`;

let CommentList = ({ comments, saveCommentVote }) => {
  return (
    <Wrapper>
      <List>
        {comments &&
          Object.keys(comments).map(commentId => (
            <ListItem key={comments[commentId].id}>
              <Info data={comments[commentId]} showBody onVote={option => saveCommentVote(commentId, option)} />
            </ListItem>
          ))}
      </List>
    </Wrapper>
  );
};

CommentList = connect(
  (state, props) => ({
    comments: state.comments[props.postId] || {}
  }),
  {
    saveCommentVote
  }
)(CommentList);

export default CommentList;
