import { get, post } from 'axios';

const API_URL = 'http://localhost:3001';

const headers = {
  Accept: 'application/json',
  Authorization: `cmVhY3RuZC1yZWFkYWJsZTpnYWJyaWVsZm5vZ3VlaXJh`
};

export function fetchCategories(callbacks) {
  get(`${API_URL}/categories`, { headers })
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
  get(`${API_URL}/posts`, { headers })
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
  get(`${API_URL}/${category}/posts`, { headers })
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
  return get(`${API_URL}/posts/${postId}`, { headers })
    .then(response => {
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
  get(`${API_URL}/posts/${postId}/comments`, { headers })
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

export function postVote(postId, option, callbacks) {
  post(`${API_URL}/posts/${postId}`, { option }, { headers })
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

export function postCommentVote(commentId, option, callbacks) {
  post(`${API_URL}/comments/${commentId}`, { option }, { headers })
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
