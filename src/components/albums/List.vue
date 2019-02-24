<template>
    <div class="list-albums">
        <div class="row">
            <div v-for="album in albums"
                 :key="album.id"
                 class="col-sm-4">
                <album-preview :id="parseInt(album.id)"
                               :title="album.title"
                               :image="album.image"
                               :publication="album.created_at"
                               :author="{ id: album.user.id, username: album.user.username }"
                               @openGallery="openLightBox"
                ></album-preview>
            </div>
        </div>
        <LightBox v-if="lightBoxImages.length" :images="lightBoxImages" ref="lightbox"></LightBox>
    </div>
</template>

<script>
import LightBox from 'vue-image-lightbox';
import albumPreview from './CardPreview';

export default {
  name: 'List',
  data() {
    return {
      lightBoxImages: [],
    };
  },
  props: {
    albums: {
      type: Array,
    },
  },
  components: {
    albumPreview,
    LightBox,
  },
  methods: {
    openLightBox(albumImages) {
      if (albumImages.length) {
        this.lightBoxImages = albumImages;
        this.$refs.lightbox.showImage(0);
      } else {
        alert('This album is empty!');
      }
    },
  },
};
</script>

<style scoped>
    @import "~vue-image-lightbox/dist/vue-image-lightbox.min.css";
</style>
