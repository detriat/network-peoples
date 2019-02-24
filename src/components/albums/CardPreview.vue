<template>
    <div class="album-preview">
        <div class="album-preview__image">
            <img v-if="image" :src="image" :alt="title">
            <img v-else src="../../assets/images/network-bg.jpg" :alt="title">
        </div>
        <div class="preview-overlay" @click="getImageByAlbumId(id)">
            <div class="album-preview__title">{{ title }}</div>
            <div class="album-preview__author">
                Author:
                <router-link v-if="author"
                             :to="`/user/${author.id}`"
                             class="">
                 {{ author.username }}
                </router-link>
            </div>
            <div class="album-preview__date">{{ publication }}</div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';

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
    image: {
      default: '../../assets/images/network-bg.jpg',
    },
    publication: {
      type: String,
      required: true,
    },
    author: {
      type: Object,
    },
  },
  computed: {
    getImage() {
      return this.image ? this.image : '../../assets/images/network-bg.jpg';
    },
  },
  methods: {
    async getImageByAlbumId(id) {
      const albumImages = await axios.get(`http://localhost:3000/albums/${id}/photos`)
        .then(res => res.data)
        .catch(error => console.log(error));

      this.$emit('openGallery', albumImages);
    },
  },
};
</script>

<style lang="scss" scoped>

    .album-preview {
        position: relative;
        width: 100%;
        height: 190px;
        overflow: hidden;
        cursor: pointer;

        img {
            max-width: 100%;
        }

        a {
            color: inherit;
        }

        .preview-overlay {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            padding: 8px;
            box-sizing: border-box;
            background: rgba(0, 0, 0, .5);
            transform: translate(0, 80%);
            transition: transform 0.25s linear;
            color: #ffffff;
        }

        &:hover .preview-overlay {
            transform: translate(0, 0);
        }

        .album-preview__title {
            font-size: 16px;
            font-weight: 700;
        }

    }

</style>
