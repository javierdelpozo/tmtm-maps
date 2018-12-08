<template>
  <div class="mapbox">
    <div id="map-container"
      class="mapbox__container"
      @dblclick="zoomIn()"
      v-on:keyup.space="panUp"
      :style="{ 'transform': `translate(-${originX}px, -${originY}px)`}">
      <img :src="this.getMapImageUrl">
    </div>
    <!-- <PanControls/> -->
    <div class="mapbox__geolocation-button" @click="getGeoloaction()">o</div>
    <div class="mapbox__zoom-buttons">
      <div class="mapbox__zoom-buttons__button in" @click="zoomIn()">+</div>
      <div class="mapbox__zoom-buttons__button out" @click="zoomOut()">-</div>
    </div>

    <aside class="menu-lateral" :class="{ 'menu-lateral--closed' : menuVisible }">
      <div class="menu-lateral__toggle-button" @click="toggleLateralMenu()">e</div>
    </aside>
  </div>
</template>

<script>
  export default {
    name: 'MapBox',
    components: {
    },
    data() {
      return {
        latitude: 52.388190699999996,
        longitude: 4.841764899999999,
        baseUrl: 'https://api.tomtom.com/map/1/staticimage',
        apiKey: 'k75KXr4my1Ttkfh44qW2ep3lGywgjgEG',
        originY: null,
        originX: null,
        zoomLevel: 12,
        tile: null,
        map: null,
        menuVisible: false
      };
    },
    computed: {
      getMapImageUrl() {
        return `${this.baseUrl}?key=${this.apiKey}&zoom=${this.zoomLevel}&center=${this.longitude},${this.latitude}&format=jpg&layer=basic&style=main&width=2000&height=2000&view=Unified`;
      }
    },
    mounted() {
      this.getOrigins();
      window.addEventListener('keydown', this.onKeyEvent);
    },
    methods: {
      getOrigins() {
        const mapImage = document.getElementById('map-container');
        if (mapImage) {
          this.originY = mapImage.clientHeight / 2;
          this.originX = mapImage.clientWidth / 2;
        }
      },
      onKeyEvent(event) {
        if (event.keyCode === 87 || event.key === 'w') { // Up
          this.originY = this.originY + 10;
        }
        if (event.keyCode === 83 || event.key === 's' && this.originY >= 10) { // Down
          this.originY = this.originY - 10;
        }
        if (event.keyCode === 68 || event.key === 'd') { // Right
          this.originX = this.originX + 10;
        }
        if (event.keyCode === 65 || event.key === 'a' && this.originX >= 10) { // Left
          this.originX = this.originX - 10;
        }
      },
      zoomIn() {
        this.zoomLevel = this.zoomLevel + 1;
      },
      zoomOut() {
        this.zoomLevel = this.zoomLevel - 1;
      },
      showPosition(position) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log('Geo position setted!:', position.coords.latitude, position.coords.longitude);
      },
      getGeoloaction() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition);
        } else { 
          console.log("Geolocation is not supported by this browser.");
        }
      },
      toggleLateralMenu() {
        this.menuVisible = !this.menuVisible;
        console.log('hey', this.menuVisible);
      }
    }
  }
</script>

<style scoped lang="scss">
  .mapbox {
    position: relative;
    overflow: hidden;
    width: 100vw;
    height: calc(100vh - 62px);
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;

    &__container {
      display: inline-block;
      height: 100%;
      background-repeat: no-repeat;
      background-size: 100%; 

      img {
        margin-bottom: -6px;
      }
    }

    &__geolocation-button {
      position: absolute;
      background-color: #FFF;
      bottom: 100px;
      right: 20px;
      width: 30px;
      height: 30px;
      user-select: none;
      font-weight: bold;
      font-size: 18px;
      line-height: 30px;
      color: #767676;
      border: 1px solid #bababa;
      transition: background-color 0.16s ease-out;
    }

    &__zoom-buttons {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
      justify-content: center;
      //width: 80px;
      //height: 45px;
      cursor: pointer;
      //background-color: rgba(0, 0, 0, 0.5);
      bottom: 20px;
      right: 20px;

      &__button {
        background-color: #FFF;
        width: 30px;
        height: 30px;
        user-select: none;
        font-weight: bold;
        font-size: 18px;
        line-height: 30px;
        color: #767676;
        border: 1px solid #bababa;
        transition: background-color 0.16s ease-out;
        box-shadow: $shadow-default;

        &:hover {
          color: #000;
        }
      }
    }

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
        position: relative;
        left: 100%;
        top: 10px;
        height: 50px;
        width: 25px;
        background-color: #3CA0E6;
        box-shadow: $shadow-to-right;
        color: white;
      }
    }
  }
</style>
