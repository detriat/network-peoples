<template>
    <nav class="navbar navbar-expand-lg navbar-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <router-link class="navbar-brand" to="/">
                <img src="../assets/images/logo.png" alt="Logo">
            </router-link>
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item" :class="{active: isActivePage('home')}">
                    <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li class="nav-item" :class="{active: isActivePage('users')}">
                    <router-link class="nav-link" to="/users">Users</router-link>
                </li>
                <li class="nav-item" :class="{active: isActivePage('posts')}">
                    <router-link class="nav-link" to="/posts">Posts</router-link>
                </li>
                <li class="nav-item" :class="{active: isActivePage('albums')}">
                    <router-link class="nav-link" to="/albums">Albums</router-link>
                </li>
                <li class="nav-item" :class="{active: isActivePage('register')}">
                    <router-link class="nav-link" to="/register">Sign Up</router-link>
                </li>
            </ul>
            <div class="my-2 my-lg-0">
                <search-autocomplete></search-autocomplete>
            </div>
        </div>
    </nav>
</template>

<script>
import SearchAutocomplete from './posts/Search';

export default {
  name: 'Navbar',
  components: {
    SearchAutocomplete,
  },
  methods: {
    isActivePage(pageName = 'home') {
      return this.$route.name === pageName;
    },
  },
};
</script>

<style lang="scss" scoped>
    .navbar-brand {
        img {
            width: 75px;
        }
    }

    .navbar {
        padding: 0;
    }
</style>
