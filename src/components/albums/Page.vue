<template>
    <div class="page page-albums">
        <div class="container">
            <list-albums :albums="albums"></list-albums>
            <pagination :per-page="perPage"></pagination>
        </div>
    </div>
</template>

<script>
import axios from '../../settings/server';
import pagination from '../Pagination';
import listAlbums from './List';

export default {
  name: 'Page',
  data() {
    return {
      albums: [],
      perPage: 3,
    };
  },
  components: {
    listAlbums,
    pagination,
  },
  methods: {
    getAlbums() {
      const axiosConfig = {
        _limit: this.perPage,
        _expand: 'user',
      };

      if (this.$route.query._page) {
        axiosConfig._page = this.$route.query._page;
      }

      axios.get('albums', {
        params: {
          ...axiosConfig,
        },
      })
        .then(res => this.albums = res.data)
        .catch(err => console.log(err));
    },
  },
  watch: {
    $route() {
      this.getAlbums();
    },
  },
  created() {
    this.getAlbums();
  },
};
</script>

<style lang="scss" scoped>
    .list-albums {
       margin-bottom: 15px;
    }
</style>
