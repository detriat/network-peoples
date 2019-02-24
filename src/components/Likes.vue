<template>
    <div class="likes">
        <i class="icon icon-heart" :class="{'icon-heart__full': liked}" @click="toggleHeart"></i>
        {{ count }}
    </div>
</template>

<script>
import { changeLikes, isLike } from '../helpers/Likes';

export default {
  name: 'Likes',
  data() {
    return {
      liked: isLike(this.keyLike),
    };
  },
  props: {
    count: {
      required: true,
      default: 0,
    },
    keyLike: {
      type: String,
      required: true,
    },
  },
  methods: {
    toggleHeart() {
      this.liked = !this.liked;
      changeLikes(this.keyLike, this.liked);

      this.$emit('clickHeart', this.liked);
    },
  },
};
</script>

<style lang="scss" scoped>
    i.icon {

        &.icon-heart::after {
            background-image: url("../assets/images/heart-empty.png");
        }

        &.icon-heart__full::after {
            background-image: url("../assets/images/heart-full.png");
        }
    }
</style>
