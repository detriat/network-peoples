<template>
    <div class="tree-comments">
        <div v-for="comment in comments" :key="comment.id" class="card">
            <comment-item :comment="comment"></comment-item>
        </div>
    </div>
</template>

<script>
import CommentItem from './CommentItem';

export default {
  name: 'TreeComments',
  props: {
    comments: {
      type: Array,
      default: [],
    },
  },
  components: {
    CommentItem,
  },
};
</script>

<style lang="scss" scoped>
    .tree-comments {
        .card {
            margin-top: 15px;
        }
    }
</style>
