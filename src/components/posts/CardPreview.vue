<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ title | cutString(52) }}</h5>
            <p class="card-text">{{ body | cutString(100) }}</p>
            <div class="d-flex align-items-center justify-content-between">
                <div class="date">{{ publication }}</div>
                <router-link :to="`/post/${id}`" class="btn btn-primary">Read more</router-link>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'CardPreview',
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
    },
    publication: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
    .card {
        margin-bottom: 15px;
    }
</style>
