<template>
    <div class="page user-page">
        <div v-if="this.$route.name === 'user'" class="container">
            <div class="row">
                <div class="col-sm-4">
                    <img :src="getPhoto" :alt="fullName" class="img-fluid">
                </div>
                <div class="col-sm-8">
                    <table class="table">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{{ fullName }}</td>
                            </tr>
                            <tr>
                                <th>Username</th>
                                <td>{{ user.username }}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td><a :href="`mailto:${user.email}`">{{ user.email }}</a></td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td><a :href="`tel:${user.phone}`">{{ user.phone }}</a></td>
                            </tr>
                        </tbody>
                    </table>

                    <gmap-map :center="{lat: user.geo.lat, lng: user.geo.lng}"
                              :zoom="13"
                              map-type-id="terrain"
                              style="width: 100%; height: 300px"
                    ></gmap-map>

                </div>

                <div class="col-sm-12">
                    <div class="tab-group">
                        <div v-if="userPosts.length" class="tab-posts">
                            <h3 class="center">Last user's posts</h3>

                            <user-posts :posts="userPosts"></user-posts>
                        </div>

                        <hr>

                        <div v-if="userAlbums.length" class="tab-albums">
                            <h3 class="center">Last user's albums</h3>

                            <user-albums :albums="userAlbums"></user-albums>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <router-view></router-view>

        <overlay-loader :visibility="showLoader"></overlay-loader>
    </div>
</template>

<script>
import User from '../../models/User';
import defaultImage from '../../assets/images/default-user.png';

import UserPosts from '../posts/List';
import UserAlbums from '../albums/List';
import OverlayLoader from '../OverlayLoader';

export default {
  name: 'Card',
  props: ['id'],
  data() {
    return {
      userId: this.$route.params.id,
      user: {
        id: this.$route.params.id,
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        phone: '',
        photo: defaultImage,
        geo: {
          lat: 49.4091621,
          lng: 30.5940756,
        },
        created_at: '',
      },
      userPosts: [],
      userAlbums: [],
      showLoader: false,
      defaultImage,
    };
  },
  components: {
    UserPosts,
    UserAlbums,
    OverlayLoader,
  },
  watch: {
    $route() {
      this.setUser();
      this.setUserPosts();
      this.setUserAlbums();
    },
  },
  computed: {
    fullName() {
      return `${this.user.firstName} ${this.user.lastName}`;
    },
    getPhoto() {
      return this.user.photo ? this.user.photo : this.defaultImage;
    },
  },
  methods: {
    async setUser() {
      this.showLoader = true;
      this.user = await User.getUserByField('id', this.id);
      this.showLoader = false;
    },

    async setUserPosts() {
      this.userPosts = await User.getPostsByUserId(this.id);
    },

    async setUserAlbums() {
      const albums = await User.getAlbumsByUserId(this.id);

      albums.map(album => {
        album.user = {
          id: this.id,
          username: this.user.username,
        };

        return album;
      });

      this.userAlbums = albums;
    },
  },
  created() {
    this.setUser();
    this.setUserPosts();
    this.setUserAlbums();
  },
};
</script>

<style scoped>

</style>
