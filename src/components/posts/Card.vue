<template>
    <div class="page page-post">
        <div class="container">
            <h1>{{ post.title }}</h1>
            <hr>

            <div class="post-content">
                {{ post.body }}

                <br />
                <br />

                <div class="post-author">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="col"><i class="icon icon-eye"></i> {{ post.views }}</div>
                        <div class="col">
                            <likes :count="post.likes"
                                   :key-like="`post${post.id}`"
                                   @clickHeart="toggleHeart"
                            ></likes>
                        </div>
                        <div class="col">Created: {{ post.created_at }}</div>
                        <div class="col">Author: <router-link :to="`/user/${ownerPost.id}`">{{ ownerPost.username }}</router-link></div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-6">
                    <add-comment action="http://localhost:3000/comments"
                                 related-field="postId"
                                 :parent-id="0"
                    ></add-comment>
                </div>
            </div>
            <comments v-if="comments.length" :comments="comments"></comments>
        </div>

        <overlay-loader :visibility="showLoader"></overlay-loader>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Post from '../../models/Post';

import comments from '../comments/List';
import addComment from '../comments/Add';
import likes from '../Likes';
import OverlayLoader from '../OverlayLoader';

export default {
  name: 'Card',
  props: ['id'],
  data() {
    return {
      post: {
        id: this.$route.params.id,
        title: '',
        body: '',
        views: '',
        likes: '',
        created_at: '',
      },
      ownerPost: {
        id: '',
        username: '',
      },
      showLoader: false,
    };
  },
  components: {
    comments,
    addComment,
    likes,
    OverlayLoader,
  },
  watch: {
    $route() {
      this.setDataForPost();
      this.setOwnerPost();
      this.getCommentsByPostId(this.id);
    },
  },
  computed: {
    ...mapState({
      comments: state => state.PostsStore.comments,
    }),
  },
  methods: {
    async setDataForPost() {
      this.showLoader = true;
      this.post = await Post.getPostById(this.id);
      this.showLoader = false;

      this.changeCountViews();
    },

    async setOwnerPost() {
      this.ownerPost = await Post.getOwnerByPostId(this.id);
    },

    async changeCountViews() {
      const post = { ...this.post };
      post.views += 1;
      this.post = await Post.updatePost(post);
    },

    async toggleHeart(liked) {
      const post = { ...this.post };
      post.likes += liked ? 1 : -1;
      this.post = await Post.updatePost(post);
    },

    ...mapActions({
      getCommentsByPostId: 'getCommentsByPostId',
    }),
  },
  created() {
    this.setDataForPost();
    this.setOwnerPost();
    this.getCommentsByPostId(this.id);
  },
};
</script>

<style lang="scss" scoped>
</style>
