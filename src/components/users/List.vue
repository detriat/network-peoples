<template>
    <div class="page page-users">
        <div class="container">

            <div class="row list-users">
                <div v-for="user in users"
                     :key="user.id"
                     class="col-sm-6 col-md-4"
                >
                    <user-card-preview :id="user.id"
                                       :first-name="user.firstName"
                                       :last-name="user.lastName"
                                       :image="user.photo"
                    ></user-card-preview>
                </div>
            </div>

            <pagination :per-page="perPage"></pagination>

        </div>
    </div>
</template>

<script>
import User from '../../models/User';

import UserCardPreview from './CardPreview';
import Pagination from '../Pagination';

export default {
  name: 'List',
  data() {
    return {
      users: [],
      perPage: 3,
    };
  },
  components: {
    UserCardPreview,
    Pagination,
  },
  methods: {
    async setUsers() {
      const filter = {
        _limit: this.perPage,
        _sort: 'id',
        _order: 'desc',
      };

      if (this.$route.query._page) {
        filter._page = this.$route.query._page;
      }

      this.users = await User.getUsers(filter);
    },
  },
  watch: {
    $route() {
      this.setUsers();
    },
  },
  created() {
    this.setUsers();
  },
};
</script>

<style scoped>

</style>
