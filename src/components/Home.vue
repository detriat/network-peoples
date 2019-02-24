<template>
    <div class="page page-home">
        <div class="container">
            <section class="section-advertising"></section>

            <section id="last-posts">
                <h3 class="text-center">Last posts</h3>
                <last-posts :posts="posts"></last-posts>
            </section>

        </div>
    </div>
</template>

<script>
import lastPosts from './posts/List';
import Post from '../models/Post';

export default {
  name: 'Home',
  data() {
    return {
      posts: [],
    };
  },
  components: {
    lastPosts,
  },
  methods: {
    async getLastPosts() {
      this.posts = await Post.getPosts();
    },
  },
  watch: {
    $route() {
      this.getLastPosts();
    },
  },
  created() {
    this.getLastPosts();
  },
};
</script>

<style scoped>

    .page {
        padding-top: 5px;
    }

    .section-advertising {
        background: url("../assets/images/network-bg.jpg") no-repeat center;
        height: 400px;
    }

    #last-posts {
        margin-top: 40px;
    }
</style>
