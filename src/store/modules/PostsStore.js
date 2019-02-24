import axios from 'axios';

const state = {
  comments: [],
};

const mutations = {
  UPDATE_FIELDS(state, newValues) {
    state[newValues.field] = newValues.value;
  },
};

const actions = {
  async getCommentsByPostId({ commit }, postId) {
    const comments = await axios.get(`http://localhost:3000/posts/${postId}/comments`, {
      params: {
        _sort: 'id',
        _order: 'desc',
      },
    })
      .then(res => res.data)
      .catch(error => console.log(error));

    commit('UPDATE_FIELDS', {
      field: 'comments',
      value: comments,
    });
  },

  pushComment({ commit }, comment) {
    const comments = [...state.comments];

    comments.unshift(comment);

    commit('UPDATE_FIELDS', {
      field: 'comments',
      value: comments,
    });
  },

};

const getters = {
  parentComments: state => state.comments.filter(comment => comment.parentId === 0),

  childrenComments: state => parentId => state.comments.filter(comment => comment.parentId === parentId),
};

export default {
  state,
  actions,
  mutations,
  getters,
};
