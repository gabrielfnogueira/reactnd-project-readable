import { faComments, faPencilAlt, faTrashAlt, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getPostComments } from '../redux/modules/comments';
import { getPostById } from '../redux/modules/posts';
import Post from './Post';

const Wrapper = styled.div``;

const BackButton = styled(Link)`
  line-height: 1.65rem;
  margin-bottom: 1rem;
  display: block;

  > .svg-inline--fa {
    margin-right: 1rem;
  }
`;

class PostDetails extends Component {
  componentDidMount() {
    const {
      match: {
        params: { postId }
      },
      getPostById,
      getPostComments
    } = this.props;

    getPostById(postId);
    getPostComments(postId);
  }

  render() {
    const {
      match: {
        params: { postId }
      }
    } = this.props;

    return (
      <Wrapper>
        <BackButton to="/">
          <FontAwesomeIcon icon={faLongArrowAltLeft} />
          back to list
        </BackButton>
        <Post postId={postId} showBody />
      </Wrapper>
    );
  }
}

PostDetails = connect(
  (state, props) => ({
    post: state.posts[props.match.params.postId]
  }),
  {
    getPostById,
    getPostComments
  }
)(PostDetails);

export default PostDetails;
