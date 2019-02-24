<template>
    <div class="list-posts">
        <div class="row">
            <div v-for="post in posts"
                 :key="post.id"
                 class="col-sm-4">
                <post-preview :id="post.id"
                              :title="post.title"
                              :body="post.body"
                              :publication="post.created_at"
                ></post-preview>
            </div>
        </div>
    </div>
</template>

<script>

import PostPreview from '../posts/CardPreview';

export default {
  name: 'List',
  props: ['posts'],
  components: {
    PostPreview,
  },
};
</script>

<style scoped>

</style>
