import axios from 'axios';

const API_URL = 'http://localhost:3001';

const headers = {
  Accept: 'application/json',
  Authorization: `cmVhY3RuZC1yZWFkYWJsZTpnYWJyaWVsZm5vZ3VlaXJh`
};

export function fetchCategories(callbacks) {
  axios
    .get(`${API_URL}/categories`, { headers })
    .then(response => {
      if (callbacks && callbacks.success) {
        callbacks.success(response.data.categories);
      }
    })
    .catch(err => {
      console.log('There was an error fetching /categories', err);

      if (callbacks && callbacks.error) {
        callbacks.error(err);
      }
    });
}

export function fetchPosts(callbacks) {
  axios
    .get(`${API_URL}/posts`, { headers })
    .then(response => {
      if (callbacks && callbacks.success) {
        callbacks.success(response.data);
      }
    })
    .catch(err => {
      console.log('There was an error fetching /posts', err);

      if (callbacks && callbacks.error) {
        callbacks.error(err);
      }
    });
}

export function fetchPostsByCategory(category, callbacks) {
  axios
    .get(`${API_URL}/${category}/posts`, { headers })
    .then(response => {
      if (callbacks && callbacks.success) {
        callbacks.success(response.data);
      }
    })
    .catch(err => {
      console.log(`There was an error fetching /${category}/posts`, err);

      if (callbacks && callbacks.error) {
        callbacks.error(err);
      }
    });
}

export function fetchPostById(postId, callbacks) {
  axios
    .get(`${API_URL}/posts/${postId}`, { headers })
    .then(response => {
      let post = response.data;

      if (Object.keys(post).length === 0 && post.constructor === Object) {
        post.id = postId;
        post.deleted = true;
      }

      if (callbacks && callbacks.success) {
        callbacks.success(response.data);
      }
    })
    .catch(err => {
      console.log(`There was an error fetching /posts/${postId}`, err);

      if (callbacks && callbacks.error) {
        callbacks.error(err);
      }
    });
}

export function fetchPostComments(postId, callbacks) {
  axios
    .get(`${API_URL}/posts/${postId}/comments`, { headers })
    .then(response => {
      if (callbacks && callbacks.success) {
        callbacks.success(response.data);
      }
    })
    .catch(err => {
      console.log(`There was an error fetching /posts/${postId}/comments`, err);

      if (callbacks && callbacks.error) {
        callbacks.error(err);
      }
    });
}

export function createPost(post, callbacks) {
  axios
    .post(`${API_URL}/posts`, post, { headers })
    .then(response => {
      if (callbacks && callbacks.success) {
        callbacks.success(response.data);
      }
    })
    .catch(err => {
      console.log(`There was an error posting to /post`, err);

      if (callbacks && callbacks.error) {
        callbacks.error(err);
      }
    });
}

export function updatePost(post, callbacks) {
  axios
    .put(`${API_URL}/posts/${post.id}`, post, { headers })
    .then(response => {
      if (callbacks && callbacks.success) {
        callbacks.success(response.data);
      }
    })
    .catch(err => {
      console.log(`There was an error putting to /posts/${post.id}`, err);

      if (callbacks && callbacks.error) {
        callbacks.error(err);
      }
    });
}

export function deletePost(postId, callbacks) {
  axios
    .delete(`${API_URL}/posts/${postId}`, { headers })
    .then(response => {
      if (callbacks && callbacks.success) {
        callbacks.success(response.data);
      }
    })
    .catch(err => {
      console.log(`There was an error deleting /posts/${postId}`, err);

      if (callbacks && callbacks.error) {
        callbacks.error(err);
      }
    });
}

export function postVote(postId, option, callbacks) {
  axios
    .post(`${API_URL}/posts/${postId}`, { option }, { headers })
    .then(response => {
      if (callbacks && callbacks.success) {
        callbacks.success(response.data);
      }
    })
    .catch(err => {
      console.log(`There was an error posting your vote to /posts/${postId}`, err);

      if (callbacks && callbacks.error) {
        callbacks.error(err);
      }
    });
}

export function createComment(comment, callbacks) {
  axios
    .post(`${API_URL}/comments`, comment, { headers })
    .then(response => {
      if (callbacks && callbacks.success) {
        callbacks.success(response.data);
      }
    })
    .catch(err => {
      console.log(`There was an error posting to /comments`, err);

      if (callbacks && callbacks.error) {
        callbacks.error(err);
      }
    });
}

export function updateComment(comment, callbacks) {
  axios
    .put(`${API_URL}/comments/${comment.id}`, comment, { headers })
    .then(response => {
      if (callbacks && callbacks.success) {
        callbacks.success(response.data);
      }
    })
    .catch(err => {
      console.log(`There was an error putting to /comments/${comment.id}`, err);

      if (callbacks && callbacks.error) {
        callbacks.error(err);
      }
    });
}

export function deleteComment(commentId, callbacks) {
  axios
    .delete(`${API_URL}/comments/${commentId}`, { headers })
    .then(response => {
      if (callbacks && callbacks.success) {
        callbacks.success(response.data);
      }
    })
    .catch(err => {
      console.log(`There was an error deleting /comments/${commentId}`, err);

      if (callbacks && callbacks.error) {
        callbacks.error(err);
      }
    });
}

export function postCommentVote(commentId, option, callbacks) {
  axios
    .post(`${API_URL}/comments/${commentId}`, { option }, { headers })
    .then(response => {
      if (callbacks && callbacks.success) {
        callbacks.success(response.data);
      }
    })
    .catch(err => {
      console.log(`There was an error posting your vote to /comments/${commentId}`, err);

      if (callbacks && callbacks.error) {
        callbacks.error(err);
      }
    });
}
