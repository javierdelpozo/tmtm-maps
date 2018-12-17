import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    latitude: 52.388190699999996,
    longitude: 4.841764899999999,
    zoomLevel: 12,
    pois: [],
  },
  getters: {
    latitude: state => state.latitude,
    longitude: state => state.longitude,
    zoomLevel: state => state.zoomLevel,
    pois: state => state.pois
  },
  mutations: {
    updateLatitude(state, value) {
      state.latitude = value;
    },
    updateLongitude(state, value) {
      state.longitude = value;
    },
    updateZoom(state, value) {
      state.zoomLevel = value;
    },
    updatePois(state, value) {
      console.log(state, value);
      state.pois = value;
    }
  },
  actions: {
    updateLatitude({commit}, value) {
      commit('updateLatitude', value);
    },
    updateLongitude({commit}, value) {
      commit('updateLongitude', value);
    },
    updateZoom({commit}, value) {
      commit('updateZoom', value);
    },
    updatePois({commit}, value) {
      commit('updatePois', value);
    }
  },
  plugins: [
    createPersistedState() // persist state in local storage: settings by default.
  ]
})
