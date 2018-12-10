import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    latitude: 52.388190699999996,
    longitude: 4.841764899999999,
    zoomLevel: 12
  },
  getters: {
    latitude: state => state.latitude,
    longitude: state => state.longitude,
    zoomLevel: state => state.zoomLevel
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
    }
  },
  plugins: [
    createPersistedState()
  ]
})
