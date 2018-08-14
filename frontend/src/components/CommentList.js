import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createComment, removeComment, saveCommentVote, updateComment } from '../redux/modules/comments';
import CommentForm from './CommentForm';
import Info from './Info';
import Modal from './Modal';

const Wrapper = styled.div``;

const AddComment = styled.button``;

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

class CommentList extends Component {
  state = {
    showModal: false,
    selectedCommentId: null
  };

  emptyComment = {
    author: '',
    body: ''
  };

  handleModalOpen = commentId => {
    this.setState({ showModal: true, selectedCommentId: commentId });
  };

  handleModalClose = () => {
    this.setState({ showModal: false, selectedCommentId: null });
  };

  handleFormSubmit = comment => {
    if (this.state.selectedCommentId) {
      this.props.updateComment(comment, this.handleModalClose);
    } else {
      this.props.createComment(comment, this.props.postId, this.handleModalClose);
    }
  };

  render() {
    const { showModal, selectedCommentId } = this.state;
    const { comments, saveCommentVote, removeComment } = this.props;

    return (
      <Wrapper>
        <AddComment onClick={() => this.handleModalOpen()}>add comment</AddComment>
        <List>
          {comments &&
            Object.keys(comments).map(commentId => (
              <ListItem key={comments[commentId].id}>
                <Info
                  data={comments[commentId]}
                  showBody
                  onVote={option => saveCommentVote(commentId, option)}
                  onEdit={() => this.handleModalOpen(commentId)}
                  onRemove={() => removeComment(commentId)}
                />
              </ListItem>
            ))}
        </List>
        <Modal isOpen={showModal} onRequestClose={this.handleModalClose} shouldCloseOnOverlayClick={true}>
          <CommentForm
            onClose={this.handleModalClose}
            isEditing={!!selectedCommentId}
            initialValues={selectedCommentId ? comments[selectedCommentId] : this.emptyComment}
            onSubmit={this.handleFormSubmit}
          />
        </Modal>
      </Wrapper>
    );
  }
}

CommentList = connect(
  (state, props) => ({
    comments: state.comments[props.postId] || {}
  }),
  {
    saveCommentVote,
    createComment,
    updateComment,
    removeComment
  }
)(CommentList);

export default CommentList;
