<template>
    <div class="container">
        <h1>Hi, {{ user.firstName }}!</h1>
        <hr>



        <overlay-loader :visibility="showLoader"></overlay-loader>
    </div>
</template>

<script>
import User from '../../models/User';
import OverlayLoader from '../OverlayLoader';

export default {
  name: 'Profile',
  components: {
    OverlayLoader,
  },
  data() {
    return {
      user: {
        id: this.$route.params.id,
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        phone: '',
        photo: '',
        geo: {
          lat: 49.4091621,
          lng: 30.5940756,
        },
        created_at: '',
      },
      showLoader: false,
    };
  },
  methods: {
    async setUser() {
      this.showLoader = true;
      this.user = await User.getUserByField('id', this.$route.params.id);
      this.showLoader = false;
    },
  },
  created() {
    this.setUser();
  },
};
</script>

<style scoped>

</style>
