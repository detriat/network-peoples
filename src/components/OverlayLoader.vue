<template>
    <div v-show="visibility" class="overlay">
        <pacman-loader :color="colorLoader" :size="sizeLoader"></pacman-loader>
    </div>
</template>

<script>
import { PacmanLoader } from 'vue-loaders';

export default {
  name: 'OverlayLoader',
  props: {
    visibility: {
      type: Boolean,
      default: false,
    },
    colorLoader: {
      type: String,
      default: '#ffffff',
    },
    sizeLoader: {
      type: String,
      default: '40px',
    },
  },
  components: {
    PacmanLoader,
  },
};
</script>

<style scoped>
@import "~vue-loaders/dist/vue-loaders.css";
</style>

<style lang="scss" scoped>
    .overlay {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        background: rgba(0, 0, 0, .85);
    }
</style>
