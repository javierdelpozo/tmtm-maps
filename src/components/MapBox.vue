<template>
  <div class="mapbox">
    <div id="map-container" class="mapbox__container" @dblclick="zoomIn()"
         :style="{ 'transform': `translate(-${originX}px, -${originY}px)`}">
      <img :src="this.getMapImageUrl">
    </div>
    <!-- <PanControls/> -->
    <div class="mapbox__zoom-buttons">
      <div class="mapbox__zoom-buttons__button in" @click="zoomIn()">+</div>
      <div class="mapbox__zoom-buttons__button out" @click="zoomOut()">-</div>
    </div>

    <div class="menu-lateral">

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
        latitude: 52.388190699999996,
        longitude: 4.841764899999999,
        baseUrl: 'https://api.tomtom.com/map/1/staticimage',
        apiKey: 'k75KXr4my1Ttkfh44qW2ep3lGywgjgEG',
        originY: null,
        originX: null,
        zoomLevel: 12,
        tile: null,
        map: null
      };
    },
    props: {
      msg: String
    },
    computed: {
      getMapImageUrl() {
        return `${this.baseUrl}?key=${this.apiKey}&zoom=${this.zoomLevel}&center=${this.longitude},${this.latitude}&format=jpg&layer=basic&style=main&width=2000&height=2000&view=Unified`;
      }
    },
    methods: {
      getOrigins() {
        const mapImage = document.getElementById('map-container');
        if (mapImage) {
          this.originY = mapImage.clientHeight / 2;
          this.originX = mapImage.clientWidth / 2;
        }
      },
      zoomIn() {
        this.zoomLevel = this.zoomLevel + 1;
      },
      zoomOut() {
        this.zoomLevel = this.zoomLevel - 1;
      },
      showPosition(position) {
        console.log(position.coords.latitude, position.coords.longitude);
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      }
    },
    mounted() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else { 
        console.log("Geolocation is not supported by this browser.");
      }
      this.getOrigins();
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

        &:hover {
          color: #000;
        }
      }
    }

    .menu-lateral {
      position: absolute;
      background-color: rgba(255, 255, 255, 0.95);
      width: 300px;
      height: 100%;
      left: 0;
      bottom: 0;
    }
  }
</style>
