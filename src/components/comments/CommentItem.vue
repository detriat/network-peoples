<template>
    <div class="card-body">
        <h5 class="card-title">{{ comment.author }} {{ comment.created_at }} </h5>
        <p class="card-text">{{ comment.comment }}</p>
        <button type="button" class="btn btn-primary" @click="showCommentForm">Reply</button>

        <add-comment v-if="isShowCommentForm"
                     action="http://localhost:3000/comments"
                     related-field="postId"
                     :parent-id="comment.id"
                     @hideForm="hideCommentForm"
        ></add-comment>

        <tree-comments :comments="childrenComments(comment.id)"></tree-comments>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import addComment from './Add';

export default {
  name: 'CommentItem',

  data() {
    return {
      isShowCommentForm: false,
    };
  },

  props: {
    comment: {
      type: Object,
      required: true,
    },
  },

  components: {
    TreeComments: () => import('./TreeComments.vue'),
    addComment,
  },

  computed: {
    ...mapGetters({
      childrenComments: 'childrenComments',
    }),
  },

  methods: {
    showCommentForm() {
      this.isShowCommentForm = true;
    },

    hideCommentForm() {
      this.isShowCommentForm = false;
    },

  },
};
</script>

<style lang="scss" scoped>
    .card {
        margin-top: 15px;
    }
</style>
