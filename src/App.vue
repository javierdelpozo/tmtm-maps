<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <RouterView class="app-view" />
  </div>
</template>

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
