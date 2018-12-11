<template>
  <div class="mapbox">

    <div id="map-container"
      class="mapbox__container"
      @dblclick="zoomIn()"
      v-on:keyup.space="panUp"
      :style="{ 'transform': `translate(-${originX}px, -${originY}px)`}">

      <img id="map" :src="this.mapImageUrl"
        v-on:load="isLoaded()"
        @click="createPoi()">

      <div v-for="poi in pois">
        <div class="poi" :style="{'top': `${poi.top}px`, 'left': `${poi.left}px`}">
          <div>{{poi.top}}</div>
        </div>    
      </div>

    </div>

    <div v-if="!loaded" class="loading"></div>

    <MapControls />

    <ToolBox />

  </div>
</template>

<script>
  import ToolBox from '@/components/ToolBox';
  import MapControls from '@/components/MapControls';
  import { mapGetters } from 'vuex';

  export default {
    name: 'MapBox',
    components: {
      ToolBox,
      MapControls
    },
    data() {
      return {
        baseUrl: 'https://api.tomtom.com/map/1/staticimage',
        apiKey: 'k75KXr4my1Ttkfh44qW2ep3lGywgjgEG',
        originY: null,
        originX: null,
        menuVisible: false,
        loaded: false,
        pois: []
      };
    },
    computed: {
      ...mapGetters([
        'latitude',
        'longitude',
        'zoomLevel',
      ]),
      mapImageUrl() {
        this.isLoading()
        return `${this.baseUrl}?key=${this.apiKey}&zoom=${this.zoomLevel}&center=${this.longitude},${this.latitude}&format=jpg&layer=basic&style=main&width=2000&height=2000&view=Unified`;
      }
    },
    methods: {
      isLoading() {
        this.loaded = false;
      },
      isLoaded() {
        this.loaded = true;
      },
      // createPoi() {
        
      // },
      // editPoi() {
      // },
      createPoi() { // Creates POI
        console.log(event);
        this.pois.push({
          title: 'POI',
          top: event.clientY,
          left: event.clientX
        })
      },
      zoomIn() { // Zooms in with double click
        this.$store.dispatch('updateZoom', this.zoomLevel + 1);
      },
      getOrigins() { // Centers map in screen
        const mapImage = document.getElementById('map');
        console.log(mapImage);
        if (mapImage) {
          this.originY = 2000 / 2;
          this.originX = 2000 / 2;
        }
      },
      onKeyEvent(event) { // Moves/pans map with keys
        if (event.keyCode === 65 || event.key === 'a' && this.originX >= 10) { // Left
          this.originX = this.originX + 10;
        }
        if (event.keyCode === 87 || event.key === 'w') { // Up
          this.originY = this.originY + 10;
        }
        if (event.keyCode === 83 || event.key === 's' && this.originY >= 10) { // Down
          this.originY = this.originY - 10;
        }
        if (event.keyCode === 68 || event.key === 'd') { // Right
          this.originX = this.originX - 10;
        }
      }
    },
    mounted() {
      window.addEventListener('keydown', this.onKeyEvent);
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

    .loading {
      background-image: url('../assets/images/spinner.svg');
      background-repeat: no-repeat;
      background-size: 100px 100px;
      background-position: center center;
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.7);
    }

    .poi {
      position: absolute;
      height: 50px;
      width: 100px;
      background-color: #FFF;
      top: 0;
      left: 0;
    }

    &__container {
      display: inline-block;
      height: 100%;
      background-repeat: no-repeat;
      background-size: 100%; 

      img {
        margin-bottom: -6px;
      }
    }
  }
</style>
