<template>
    <div class="card">
        <div class="card-header">
            <img :src="getImage" class="img-fluid" :alt="fullName">
        </div>
        <div class="card-body">
            <h5 class="card-title">{{ fullName }}</h5>
            <p class="card-text"></p>
            <router-link :to="userLink(id)" class="btn btn-primary">Read more</router-link>
        </div>
    </div>
</template>

<script>

import defaultImage from '../../assets/images/default-user.png';

export default {
  name: 'CardPreview',
  props: {
    id: {
      type: Number,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: defaultImage,
    },
  },
  data() {
    return {
      defaultImage,
    };
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    getImage() {
      return this.image ? this.image : defaultImage;
    },
  },
  methods: {
    userLink(userId) {
      return `/user/${userId}`;
    },
  },
};
</script>

<style lang="scss" scoped>

    .card {
        margin-bottom: 15px;

        .card-header {
            text-align: center;
        }

        img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
        }
    }

</style>
