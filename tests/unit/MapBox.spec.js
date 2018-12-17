import { createLocalVue, shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import MapBox from '@/components/MapBox.vue';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('MapBox.vue', () => {
  it('renders a map box container', () => {
    const store = getStore({}, {});
    const wrapper = shallowMount(MapBox, {
      store,
      localVue,
      data: {
        baseUrl: 'https://api.tomtom.com/map/1/staticimage',
        apiKey: 'k75KXr4my1Ttkfh44qW2ep3lGywgjgEG',
        originY: null,
        originX: null,
        menuVisible: false,
        loaded: false,
      }
    })
    // Map Box
    expect(wrapper.contains('.mapbox')).to.equal(true);

    // Map container
    expect(wrapper.contains('.mapbox__container')).to.equal(true);
  })
});

describe('MapBox.vue', () => {
  it('renders a map image', () => {
    const store = getStore({}, {});
    const wrapper = shallowMount(MapBox, {
      store,
      localVue,
      data: {
        baseUrl: 'https://api.tomtom.com/map/1/staticimage',
        apiKey: 'k75KXr4my1Ttkfh44qW2ep3lGywgjgEG',
        originY: null,
        originX: null,
        menuVisible: false,
        loaded: false,
      }
    })
    // Map image
    expect(wrapper.contains('img')).to.equal(true);
  })
});

function getStore(state, getters) {
  return new Vuex.Store({
      state: {
        ...state
      },
      getters: {
        latitude: () => 52.388190699999996,
        longitude: () => 4.841764899999999,
        zoomLevel: () => 12,
        ...getters
      }
  });
}
