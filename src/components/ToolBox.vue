<template>
  <aside class="menu-lateral" :class="{ 'menu-lateral--closed' : menuVisible }">
    <div class="menu-lateral__toggle-button" :class="{'menu-lateral__toggle-button--closed' : menuVisible}" @click="toggleLateralMenu()">
      <img src="@/assets/icons/left-chevron.svg">
    </div>

    <div class="menu-lateral__content">
      <div class="menu-lateral__content__pois-list">
        <h3>My Pois</h3>
        <ul v-for="(poi, index) in this.$store.state.pois" :key="index">
          <li>
            <h4>{{poi.title}}</h4>
            {{poi.description}}
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'ToolBox',
    data() {
      return {
        menuVisible: false
      }
    },
    computed: {
      ...mapGetters([
        'pois'
      ])
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
