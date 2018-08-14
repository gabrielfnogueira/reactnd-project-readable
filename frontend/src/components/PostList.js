import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { setOrderBy } from '../redux/modules/orderBy';
import { getPosts, getPostsByCategory, postsSelector } from '../redux/modules/posts';
import OrderBy from './OrderBy';
import Post from './Post';

const Wrapper = styled.div``;

const Title = styled.h1`
  margin-bottom: 1rem;
  display: inline-block;
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
  state = { posts: [] };

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

  render() {
    const { selectedCategory, posts, orderBy, setOrderBy } = this.props;
    const title = `All the posts ${selectedCategory ? `in the '${selectedCategory}' category` : ''}`;

    return (
      <Wrapper>
        <Title>{title}</Title>
        <OrderBy orderBy={orderBy} setOrderBy={setOrderBy} />
        <List>
          {posts.length > 0 ? (
            posts.map(post => (
              <ListItem key={post.id}>
                <PostLink to={`/${selectedCategory || post.category}/${post.id}`}>
                  <Post postId={post.id} />
                </PostLink>
              </ListItem>
            ))
          ) : (
            <EmptyItem>No posts in this category yet.</EmptyItem>
          )}
        </List>
      </Wrapper>
    );
  }
}

PostList = connect(
  (state, props) => ({
    posts: postsSelector(state, props),
    orderBy: state.orderBy
  }),
  {
    getPosts,
    getPostsByCategory,
    setOrderBy
  }
)(PostList);

export default PostList;
