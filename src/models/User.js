import axios from 'axios';
import { BASE_URL } from '../settings/server';

export default class User {
  static async create(data) {
    return axios.post(`${BASE_URL}users`, data)
      .then(res => res.data)
      .catch(error => console.log(error));
  }

  static async getUserByField(field = 'id', value) {
    return axios.get(`${BASE_URL}users`, {
      params: {
        [field]: value,
      },
    })
      .then(res => (res.data.length ? res.data[0] : null))
      .catch(error => console.log(error));
  }

  static getUsers(filter = { _limit: 3, _sort: 'id', _order: 'desc' }) {
    return axios.get(`${BASE_URL}users`, {
      params: {
        ...filter,
      },
    })
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  static getPostsByUserId(userId, limit = 3) {
    return axios.get(`${BASE_URL}users/${userId}/posts`, {
      params: {
        _limit: limit,
        _sort: 'id',
        _order: 'desc',
      },
    })
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  static getAlbumsByUserId(userId, limit = 3) {
    return axios.get(`${BASE_URL}users/${userId}/albums`, {
      params: {
        _limit: limit,
        _sort: 'id',
        _order: 'desc',
      },
    })
      .then(res => res.data)
      .catch(err => console.log(err));
  }
}
