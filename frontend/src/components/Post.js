import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { savePostVote, updatePost, removePost } from '../redux/modules/posts';
import Info from './Info';
import Modal from './Modal';
import PostForm from './PostForm';

const Wrapper = styled.div`
  padding: 1rem 1rem 0.5rem 0.5rem;
  border: 1px solid #000;
  border-radius: 0.2rem;
  background: #222;
  color: #444;
`;

class Post extends Component {
  state = {
    showModal: false
  };

  handleModalOpen = e => {
    this.setState({
      showModal: true
    });
  };

  handleModalClose = () => {
    this.setState({
      showModal: false
    });
  };

  handleFormSubmit = post => {
    this.props.updatePost(post, this.handleModalClose);
  };

  render() {
    const { showModal } = this.state;
    const { post, comments, savePostVote, removePost } = this.props;

    if (!post) {
      return null;
    }

    return (
      <Wrapper>
        <Info
          onVote={option => savePostVote(post.id, option)}
          onEdit={this.handleModalOpen}
          onRemove={() => removePost(post.id)}
          data={{ ...post, commentCount: comments ? Object.keys(comments).length : post.commentCount }}
          showBody
          authorLabel="posted by "
        />
        <Modal isOpen={showModal} onRequestClose={this.handleModalClose} shouldCloseOnOverlayClick={true}>
          <PostForm
            onClose={this.handleModalClose}
            isEditing={true}
            initialValues={post}
            onSubmit={this.handleFormSubmit}
          />
        </Modal>
      </Wrapper>
    );
  }
}

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
    savePostVote,
    updatePost,
    removePost
  }
)(Post);

export default withRouter(Post);
