<template>
    <form class="form-inline">
        <vue-bootstrap-typeahead
                v-model="query"
                :data="results"
                :serializer="s => s.title"
                size="lg"
                placeholder="search"
                @hit="selectPost"
        />
    </form>
</template>

<script>
import axios from 'axios';
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
import { BASE_URL } from '../../settings/server';

export default {
  name: 'Search',
  data() {
    return {
      query: '',
      results: [],
    };
  },
  components: {
    VueBootstrapTypeahead,
  },
  methods: {
    async searchPosts(query) {
      this.results = await axios.get(`${BASE_URL}posts?q=${query}`)
        .then(res => res.data)
        .catch(error => console.log(error));
    },
    selectPost(post) {
      this.$router.push({
        name: 'post',
        params: {
          id: post.id,
        },
      });

      this.query = '';
    },
  },
  watch: {
    query() {
      this.searchPosts(this.query);
    },
  },
};
</script>

<style scoped>

</style>
