<template>
  <aside class="menu-lateral" :class="{ 'menu-lateral--closed' : menuVisible }">
    <div class="menu-lateral__toggle-button" :class="{'menu-lateral__toggle-button--closed' : menuVisible}" @click="toggleLateralMenu()">
      <img src="@/assets/icons/left-chevron.svg">
    </div>
  </aside>
</template>

<script>
  export default {
    name: 'ToolBox',
    data() {
      return {
        menuVisible: false
      }
    },
    methods: {
      toggleLateralMenu() {
        this.menuVisible = !this.menuVisible;
      }
    }
  }
</script>

<style scoped lang="scss">
  .menu-lateral {
    position: absolute;
    background-color: #fff;
    box-shadow: $shadow-default;
    width: 300px;
    height: 100%;
    left: 0px;
    bottom: 0;
    transition: all .2s ease-out;

    &--closed {
      transform: translateX(-300px);
    }

    &__toggle-button {
      display: flex;
      align-content: center;
      justify-content: center;
      position: relative;
      left: 100%;
      top: 10px;
      height: 50px;
      width: 25px;
      background-color: #3CA0E6;
      box-shadow: $shadow-to-right;
      color: white;

      &:hover {
        background-color: #2b98e5; 
      }

      img {
        width: 15px;
      }

      &--closed {
        img {
          transform: rotate(180deg);
        }
      }
    }
  }
</style>
