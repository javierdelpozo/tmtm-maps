<template>
  <div class="mapbox">
    <div id="map-container" class="mapbox__container" @dblclick="zoomIn()"
        :style="{
          'transform': `translate(-${originX}px, -${originY}px) scale(${zoomLevel})`
        }">
      <img src="https://api.tomtom.com/map/1/staticimage?key=k75KXr4my1Ttkfh44qW2ep3lGywgjgEG&zoom=10&center=13.567893,46.112341&format=jpg&layer=basic&style=main&width=2000&height=2000&view=Unified">
    </div>
    <PanControls/>
    <div class="mapbox__zoom-buttons">
      <div class="mapbox__zoom-buttons__button in" @click="zoomIn()">+</div>
      <div class="mapbox__zoom-buttons__button out" @click="zoomOut()">-</div>
    </div>
  </div>
</template>

<script>
  import PanControls from '@/components/PanControls';

  export default {
    name: 'MapBox',
    components: {
      PanControls
    },
    data() {
      return {
        originY: null,
        originX: null,
        nTilesX: 4,
        nTilesY: 4,
        zoomLevel: 0.5,
        tile: null,
        appId: 'rG5bBkQ2eMml2trmr8u9',
        appCode: 'BZru1LVte9US9eymzGE5ZQ'
      };
    },
    props: {
      msg: String
    },
    methods: {
      generatePanorama() {
        const mapContainer = document.getElementById('map-container');
        if (mapContainer) {
          this.nTilesY = mapContainer.clientHeight / 256 * 2;
          this.nTilesX = mapContainer.clientWidth / 256 * 2;
        }
        //console.log('tiles', mapContainer.clientHeight, mapContainer.clientWidth, this.nTilesY, this.nTilesX);
      },
      getOrigins() {
        const mapImage = document.getElementById('map-image');
        console.log(mapImage, mapImage.clientHeight);
        if (mapImage) {
          this.originY = mapImage.clientHeight / 2;
          this.originX = mapImage.clientWidth / 2;
        }
      },
      setOrigins() {

      },
      zoomIn() {
        this.zoomLevel = this.zoomLevel++;
        this.getOrigins();
      },
      zoomOut() {
        this.zoomLevel = this.zoomLevel--;
        this.getOrigins();
      },
      showPosition(position) {
        console.log(position.coords.latitude); 
      }
    },
    mounted() {
      window.addEventListener('load', this.generatePanorama);
      this.generatePanorama();
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition);
      } else { 
          console.log("Geolocation is not supported by this browser.");
      }
    }
  }
</script>

<style scoped lang="scss">
  .mapbox {
    position: relative;
    overflow: hidden;
    height: 80vh;
    margin-bottom: 30px;
    width: 100%;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid black;
    cursor: pointer;

    &__container {
      display: inline-block;
      height: 100%;
      background-repeat: no-repeat;
      background-size: 100%;
      height: 65vw;
      //position: absolute;

      img {
        margin-bottom: -6px;
      }
    }

    &__zoom-buttons {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: space-between;
      width: 40px;
      height: 50px;
      cursor: pointer;
      bottom: 20px;
      right: 20px;

      &__button {
        background-color: #FFF;
        width: 20px;
        height: 20px;
        user-select: none;
      }
    }
  }
</style>
