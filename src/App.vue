<template>
  <div id="app">
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

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    #nav {
      display: flex;
      justify-content: flex-start;
      align-content: center;
      padding: 20px 40px;
      background-color: #333;

      a {
        font-weight: bold;
        color: #fff;
        margin-right: 30px;

        &.router-link-exact-active {
          color: #fff;
        }
      }
    }

    .app-view {

    }
  }
</style>
