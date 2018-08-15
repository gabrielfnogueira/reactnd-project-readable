import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { setOrderBy } from '../redux/modules/orderBy';
import { getPosts, getPostsByCategory, postsSelector, createPost } from '../redux/modules/posts';
import Modal from './Modal';
import OrderBy from './OrderBy';
import Post from './Post';
import PostForm from './PostForm';

const Wrapper = styled.div``;

const Header = styled.div`
  position: relative;
  width: 100%;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  display: inline-block;
`;

const NewPost = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: 1px solid #444;
  background-color: transparent;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  padding: 0.5rem 1rem;

  > .svg-inline--fa {
    margin-right: 1rem;
  }
`;

const List = styled.ul`
  list-style: none;
`;

const ListItem = styled.li``;

const EmptyItem = styled.li``;

const PostLink = styled(Link)`
  border: 1px solid #000;
  display: block;
  margin-bottom: 2rem;
  border-radius: 0.2rem;

  > div {
    border: none;
    margin-bottom: 0;
  }

  &:hover {
    border-color: #444;
  }
`;

class PostList extends PureComponent {
  state = {
    posts: [],
    showModal: false
  };

  newPost = {
    title: '',
    author: '',
    category: '',
    body: ''
  };

  componentDidMount() {
    this.fetchPosts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedCategory !== this.props.selectedCategory) {
      this.fetchPosts();
    }
  }

  fetchPosts() {
    const { selectedCategory } = this.props;

    if (selectedCategory) {
      this.props.getPostsByCategory(selectedCategory);
    } else {
      this.props.getPosts();
    }
  }

  handleModalOpen = () => {
    this.setState({ showModal: true });
  };

  handleModalClose = () => {
    this.setState({ showModal: false });
  };

  handleFormSubmit = post => {
    this.props.createPost(post, this.handleModalClose);
  };

  render() {
    const { showModal } = this.state;
    const { selectedCategory, posts, postsList, orderBy, setOrderBy } = this.props;
    const title = `all the posts ${selectedCategory ? `in the '${selectedCategory}' category` : ''}`;

    return (
      <Wrapper>
        <Header>
          <Title>{title}</Title>
          <OrderBy orderBy={orderBy} setOrderBy={setOrderBy} />
          <NewPost onClick={this.handleModalOpen}>
            <FontAwesomeIcon icon={faPlus} />
            new post
          </NewPost>
        </Header>
        <List>
          {postsList.length > 0 ? (
            postsList.map(postId => (
              <ListItem key={postId}>
                <PostLink to={`/${selectedCategory || posts[postId].category}/${postId}`}>
                  <Post postId={postId} />
                </PostLink>
              </ListItem>
            ))
          ) : (
            <EmptyItem>No posts in this category yet.</EmptyItem>
          )}
        </List>
        <Modal isOpen={showModal} onRequestClose={this.handleModalClose} shouldCloseOnOverlayClick={true}>
          <PostForm onClose={this.handleModalClose} initialValues={this.newPost} onSubmit={this.handleFormSubmit} />
        </Modal>
      </Wrapper>
    );
  }
}

PostList = connect(
  (state, props) => ({
    posts: state.posts,
    postsList: postsSelector(state, props),
    orderBy: state.orderBy
  }),
  {
    getPosts,
    getPostsByCategory,
    setOrderBy,
    createPost
  }
)(PostList);

export default PostList;
