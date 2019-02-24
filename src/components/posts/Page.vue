<template>
    <div class="page page-posts">
        <div class="container">
            <list-posts :posts="posts"></list-posts>
            <pagination :per-page="perPage"
                        @prevPage="setPosts"
                        @nextPage="setPosts"
            >
            </pagination>
        </div>
    </div>
</template>

<script>
import axios from '../../settings/server';
import ListPosts from './List';
import Pagination from '../Pagination';

import Post from '../../models/Post';

export default {
  name: 'Page',
  data() {
    return {
      posts: [],
      perPage: 3,
    };
  },
  components: {
    ListPosts,
    Pagination,
  },
  methods: {
    async setPosts() {
      const filter = {
        _limit: this.perPage,
        _sort: 'id',
        _order: 'desc',
      };

      if (this.$route.query._page) {
        filter._page = this.$route.query._page;
      }

      this.posts = await Post.getPosts(filter);
    },
  },
  watch: {
    $route() {
      this.setPosts();
    },
  },
  created() {
    this.setPosts();
  },
};
</script>

<style scoped>

</style>
