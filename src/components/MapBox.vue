<template>
  <div class="mapbox">

    <div ref="mapContainer"
         class="mapbox__container"
         @dblclick="zoomIn()"
         :style="{ 'transform': `translate(${originX}px, ${originY}px)` }">

      <img ref="mapImage" :src="this.mapImageUrl" v-on:load="isLoaded()" @click="createPoi()">

      <div v-for="(poi, index) in pois"
           :key="index"
           class="mapbox__poi"
           :id="index"
           :style="{'top': `${poi.top}px`, 'left': `${poi.left}px`}">
          <input type="text" placeholder="Title" autofocus v-model="pois[index].title">
          <textarea placeholder="Description" v-model="pois[index].description"></textarea>
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
        pois: [],
        timeout: null
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
      // Creates POI
      createPoi() {
        // Creates poi with single click and avoids to create it with double click
        let clickEvent = event;
        if (this.timeout === null) {
            this.timeout = window.setTimeout(() => {
            this.timeout = null;
            this.pois.push({
              title: null,
              description: null,
              top: clickEvent.offsetY,
              left: clickEvent.offsetX
            })
          }, 300);
        }
      },
      // Zooms in with double click
      zoomIn() {
        window.clearTimeout(this.timeout);
        this.timeout = null;    
        this.$store.dispatch('updateZoom', this.zoomLevel + 1);
      },
      // Centers map by dimensions in screen
      getOrigins() {
        const viewPortWidth = document.documentElement.clientWidth;
        const viewPortHeight = this.$refs.mapContainer.clientHeight;
        
        if (this.$refs.mapImage) {
          this.originY = -(2000 - viewPortHeight) / 2;
          this.originX = -(2000 - viewPortWidth) / 2;
        }
      },
      // Moves/pans map with keys
      onKeyEvent(event) {
        if (event.target.tagName !== 'INPUT') {
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
        } else {
          if (event.keyCode === 13 || event.key === 'Enter') { // Enter
            // save on enter
          }          
        }
      }
    },
    mounted() {
      window.addEventListener('keydown', this.onKeyEvent);
      this.getOrigins();
    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.onKeyEvent);
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

    &__poi {
      position: absolute;
      width: 100px;
      padding: 8px;
      background-color: #FFF;
      box-shadow: $shadow-default;
      cursor: initial;
      z-index: 1;

      input {
        width: 100%;
        border: none;
        border-bottom: 1px solid black;

        &:focus {
          outline: none;
        }
      }

      textarea {
        width: 100%;
        margin-top: 8px;
        border: 1px solid black;
      }
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
