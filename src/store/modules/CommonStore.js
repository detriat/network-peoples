const state = {
    user: {name: 'Test'}
};

const mutations = {

};

const actions = {

};

const getters = {
    user: state => field => {
        return state.user[field];
    }
};

export default {
    state,
    actions,
    mutations,
    getters,
};
