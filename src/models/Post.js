import axios from 'axios';
import { BASE_URL } from '../settings/server';

export default class Post {
  static getPostById(id) {
    return axios.get(`${BASE_URL}posts/${id}`)
      .then(res => res.data)
      .catch(error => console.log(error));
  }

  static getPosts(filter = { _limit: 3, _sort: 'id', _order: 'desc' }) {
    return axios.get(`${BASE_URL}posts`, {
      params: {
        ...filter,
      },
    })
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  static getOwnerByPostId(id) {
    return axios.get(`${BASE_URL}posts/${id}?_expand=user`)
      .then(res => res.data.user)
      .catch(error => console.log(error));
  }

  static updatePost(post) {
    return axios.put(`${BASE_URL}posts/${post.id}`, post)
      .then(res => res.data)
      .catch(error => console.log(error));
  }
}
