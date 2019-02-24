import axios from 'axios';
import vm from '../main';

export const BASE_URL = 'http://localhost:3000/';

export default axios.create({
  baseURL: BASE_URL,
  params: {
    _limit: 3,
    _sort: 'id',
    _order: 'desc',
  },
  validateStatus(status) {
    if (status === 404) {
      vm.$router.replace('/404');
    }

    return status;
  },
});
