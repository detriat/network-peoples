<template>
    <div class="comments-block">
        <h3>Comments</h3>

        <div class="list-comments">
            <tree-comments :comments="parentComments"></tree-comments>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TreeComments from './TreeComments';

export default {
  name: 'List',
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
  components: {
    TreeComments,
  },
  computed: {
    ...mapGetters({
      parentComments: 'parentComments',
    }),
  },
};
</script>

<style lang="scss" scoped></style>
