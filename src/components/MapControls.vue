<template>  
  <div class="map-controls">
    <div class="map-controls__geolocation-button" @click="getGeoloaction()">o</div>
    <div class="map-controls__zoom-buttons">
      <div class="map-controls__zoom-buttons__button in" @click="zoomIn()">+</div>
      <div class="map-controls__zoom-buttons__button out" @click="zoomOut()">-</div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'MapControls',
    computed: {
      ...mapGetters([
        'latitude',
        'longitude',
        'zoomLevel',
      ])
    },
    methods: {
      zoomIn() {
        this.loaded = false;
        this.$store.dispatch('updateZoom', this.zoomLevel + 1);
      },
      zoomOut() {
        this.loaded = false;
        this.$store.dispatch('updateZoom', this.zoomLevel - 1);
      },
      showPosition(position) {
        if (this.latitude !== position.coords.latitude || this.longitude !== position.coords.longitude) {
          this.$store.dispatch('updateLatitude', position.coords.latitude);
          this.$store.dispatch('updateLongitude', position.coords.longitude);
        }
      },
      getGeoloaction() {
        this.loaded = false;
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition);
        } else { 
          console.log("Geolocation is not supported by this browser.");
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .map-controls {
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
      cursor: pointer;
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
  }

</style>
