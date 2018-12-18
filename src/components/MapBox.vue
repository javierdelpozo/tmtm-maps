<template>
  <div class="mapbox">

    <div ref="mapContainer"
         class="mapbox__container"
         @dblclick="zoomIn()"
         :style="{ 'transform': `translate(${originX}px, ${originY}px)` }">

      <img ref="mapImage" :src="this.mapImageUrl" v-on:load="isLoaded()" @click="createPoi()">

      <div v-for="(poi, index) in clientPois"
           :key="index"
           class="mapbox__poi"
           :id="index"
           :style="{
             'top': `${poi.top + 15}px`,
             'left': `${poi.left - 60}px`
            }">

        <div v-if="!clientPois[index].saved">
          <input type="text"
                 autofocus placeholder="Title"
                 v-model="clientPois[index].title">
          <textarea placeholder="Description" v-model="clientPois[index].description"></textarea>
          <div v-if="!clientPois[index].saved">
            <button class="btn btn--default" @click="savePoi(), clientPois[index].saved = true">Save</button>
            <button class="btn btn--cancel" @click="cancelPoi(index)">Cancel</button>
          </div>          
        </div>

        <div v-if="clientPois[index].saved">
          <h4>{{poi.title}}</h4>
          <div class="mapbox__poi__description">{{poi.description}}</div>
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
  import { mapGetters, mapActions } from 'vuex';

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
        clientPois: [],
        timeout: null
      };
    },
    computed: {
      ...mapGetters([
        'latitude',
        'longitude',
        'zoomLevel',
      ]),
      ...mapActions([
        'updatePois',
        'updateZoom'
      ]),
      mapImageUrl() {
        this.isLoading()
        return `${this.baseUrl}?key=${this.apiKey}&zoom=${this.zoomLevel}&center=${this.longitude},${this.latitude}&format=jpg&layer=basic&style=main&width=2000&height=2000&view=Unified`;
      }
    },
    methods: {
      // Shows loading overlay
      isLoading() {
        this.loaded = false;
      },
      // Hides loading overlay
      isLoaded() {
        this.loaded = true;
      },
      // Creates POI
      createPoi() {
        // Creates poi with single click and avoids to create it with double click
        const clickEvent = event;
        if (this.timeout === null) {
            this.timeout = window.setTimeout(() => {
            this.timeout = null;
            this.clientPois.push({
              title: null,
              description: null,
              top: clickEvent.offsetY,
              left: clickEvent.offsetX,
              saved: false
            })
          }, 300);
        }
      },
      // Saves POI
      savePoi(id) {
        // add or remove only item received by param ID not the whole block.
        // send id and position and change only that object
        this.$store.dispatch('updatePois', this.clientPois);
      },
      // Edits POI
      editPoi() {

      },
      // cancel POI
      cancelPoi(id) {
        this.clientPois.splice(id, 1);
      },
      // Removes POI
      removePoi(id) {
        this.clientPois.splice(id, 1);
        this.$store.dispatch('updatePois', this.clientPois);
      },
      // Zooms in with double click
      zoomIn() {
        window.clearTimeout(this.timeout);
        this.timeout = null;    
        this.updateZoom(this.zoomLevel + 1);
      },
      // Centers map by dimensions in screen
      getOrigins() {
        if (this.$refs.mapImage) {
          this.originY = -(2000 - this.$refs.mapContainer.clientHeight) / 2;
          this.originX = -(2000 - document.documentElement.clientWidth) / 2;
        }
      },
      // Moves/pans map with gaming(arrow) keys
      onKeyEvent() {
        const activeElement = document.activeElement.tagName === 'BODY' ? 'move' : document.activeElement.tagName;
        if (event.target.tagName !== activeElement) {
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
      width: 120px;
      padding: 8px;
      background-color: #FFF;
      box-shadow: $shadow-default;
      cursor: initial;
      z-index: 1;

      &:after {
        bottom: 100%;
        left: 50%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-bottom-color: #fff;
        border-width: 12px;
        margin-left: -12px;
      }

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

      &__description {
        text-align: initial;
        font-size: 12px;
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
