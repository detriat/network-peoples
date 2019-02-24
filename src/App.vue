<template>
    <div id="app">
        <header>
            <div class="container">
                <navbar></navbar>
            </div>
        </header>

        <router-view></router-view>

    </div>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'app',
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    header {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

    .page {
        padding: 40px 0;
    }

    i.icon {
        display: inline-block;
        position: relative;
        width: 16px;
        height: 16px;
        margin-right: 5px;
        cursor: pointer;

        &::after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-repeat: no-repeat;
            background-size: 100%;
        }

        &.icon-eye::after {
            background-image: url("./assets/images/eye.png");
        }
    }

</style>
