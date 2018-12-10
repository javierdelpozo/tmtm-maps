<template>
  <div id="app" v-on:keyup.space="panUp">
    <div id="nav">
      <RouterLink to="/">
        Home
      </RouterLink>
      <RouterLink to="/about">
        About
      </RouterLink>
    </div>
    <RouterView class="app-view" />
  </div>
</template>

<script>
export default {
  methods: {
    panUp() {
      console.log('panup');
      //this.originY = this.originY + 10;
    }
  }
}
</script>



<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    #nav {
      padding: 20px;
      background-color: #333;

      a {
        font-weight: bold;
        color: #fff;

        &.router-link-exact-active {
          color: #fff;
        }
      }
    }

    .app-view {
      //padding: 40px;
    }
  }
</style>
