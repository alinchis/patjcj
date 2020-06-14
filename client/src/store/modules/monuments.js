// import _ from 'lodash';
import constants from '../../util/constants.js';

const state = {
  items: [],
  geoJSON: {},
  filtruTipPatrimoniu: '',
  filtruValoareMon: '',
  filtruScaraMon: '',

  selectedItem: {
    nr: '',
    cod_lmi: '',
    cod_lmi_jud: '',
    cod_lmi_nat: '',
    cod_lmi_grupa: '',
    cod_lmi_val: '',
    cod_lmi_num: '',
    SIRUTA_judet: '',
    judet: '',
    SIRUTA_UAT: '',
    rang: '',
    UAT: '',
    SIRUTA: '',
    localitate: '',
    denumire: '',
    adresa: '',
    longitudine_x: '',
    latitudine_y: '',
    cota: '',
    cod_postal: '',
    tip_patrimoniu: '',
    program_arhitectura: '',
    tip_monument: '',
    stare_generala: '',
    observatii: '',
    datare: '',
  },
  monumentDisplayed: false,
  filterText: '',
  photoGalleryDialog: false,
};

const getters = {
  getMapHeight() {
    return document.getElementById('map-enclosure').offsetHeight;
  },
  getSelectedItem() {
    return state.selectedItem;
  },
  filteredArray: (state) => {

    if (!state.geoJSON.features) return [];

    if (!(state.filterText || state.filtruTipPatrimoniu || state.filtruValoareMon || state.filtruScaraMon)) return state.geoJSON.features.map(f => f.properties);

    let filteredItems = [...state.items];

    if (state.filtruTipPatrimoniu) {
      filteredItems = filteredItems.filter(i => i.icon_code === state.filtruTipPatrimoniu);
    }
    if (state.filtruValoareMon) {
      filteredItems = filteredItems.filter(i => i.cod_lmi_val === state.filtruValoareMon);
    }
    if (state.filtruScaraMon) {
      filteredItems = filteredItems.filter(i => i.cod_lmi_scara === state.filtruScaraMon);
    }

    const needle = state.filterText.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    // return array filtered by the search bar, searching without diacritics
    return filteredItems.filter(m => {
      for (const field of constants.searchableFields) {
        if (m[field] && m[field].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(needle))
          return true;
      }
      return false;
    }
    );
  },

  filteredGeoJSON: (state, getters) => {
    const res = {
      type: state.geoJSON.type,
      features: [],
    };
    if (!getters.filteredArray) {
      return res;
    }
    if (!state.geoJSON.features) {
      return res;
    }

    let filteredItems = [...getters.filteredArray];

    if (state.filtruTipPatrimoniu) {
      filteredItems = filteredItems.filter(i => i.icon_code === state.filtruTipPatrimoniu);
    }
    if (state.filtruValoareMon) {
      filteredItems = filteredItems.filter(i => i.cod_lmi_val === state.filtruValoareMon);
    }
    if (state.filtruScaraMon) {
      filteredItems = filteredItems.filter(i => i.cod_lmi_scara === state.filtruScaraMon);
    }

    const filteredMonuments = filteredItems.map(m => m.cod_lmi);

    res.features = state.geoJSON.features.filter(feature => filteredMonuments.indexOf(feature.properties.cod_lmi) > -1);

    return res;
  }
};

const actions = {
  async getAllMonuments({ commit }) {

    const geojson = await fetch("/api/monuments.geojson");
    console.log(JSON.stringify(geojson));
    const geojsonMonuments = await geojson.json();
    commit("setGeoJSON", geojsonMonuments);
    commit("setMonuments", geojsonMonuments.features.map(m => m.properties));
  },
  async selectItem({ commit, state }, codLmi) {
    // if null value
    if (!codLmi) {
      commit("setSelectedItem", undefined);
      commit("setMonumentDisplay", false);
      return;
    }

    // get all monument data
    const fullMonument = state.geoJSON.features.find(
      m => m['properties']["cod_lmi"] === codLmi
    )['properties'];

    // request image list
    const srvImgArrPath = `${fullMonument['SIRUTA_UAT']}_${fullMonument['UAT']}/${fullMonument['SIRUTA']}_${fullMonument['localitate']}/${fullMonument['cod_lmi']}`;
    const imgArrReqPath = `/api/monument.images?monumentPath=${srvImgArrPath}`;
    const res = await fetch(imgArrReqPath);
    const imgArr = await res.json();

    // save full path images to array
    const fullPathImageArray = imgArr.map(photoName => `/images/${srvImgArrPath}/${photoName}`);

    // creat images properties
    fullMonument.images = fullPathImageArray;

    commit("setSelectedItem", fullMonument);
    commit("setMonumentDisplay", true);

  },
  setFilterText({ commit }, text) {
    commit('setFilterText', text);
  },
  setFiltruTipPatrimoniu({ commit, state, dispatch }, val) {
    if (val && state.selectedItem && state.selectedItem.icon_code !== val){
      dispatch('selectItem', null);
    }
    commit('setFiltruTipPatrimoniu', val);
  },

  setFiltruValoareMon({ commit, state, dispatch }, val) {
    if (val && state.selectedItem && state.selectedItem.cod_lmi_val !== val){
      dispatch('selectItem', null);
    }
    commit('setFiltruValoareMon', val);
  },

  setFiltruScaraMon({ commit, state, dispatch }, val) {
    if (val && state.selectedItem && state.selectedItem.cod_lmi_scara !== val){
      dispatch('selectItem', null);
    }
    commit('setFiltruScaraMon', val);
  },
  

  togglePhotoGalleryDialog ({ commit }, state) {
    commit('setPhotoGalleryDialog', state);
  },

  /* eslint-disable no-unused-vars*/
  mapViewChanged({ commit, state }) {
    return;
    // (?)TODO: filter the available markers based on the displayed area
    // commit('setMonuments', state.geoJSON.features.map(i => i.properties));
    // const items = this.map.queryRenderedFeatures();
    // commit('setMonuments', items.map(i => i.properties));
  }
};

const mutations = {
  setMonuments(state, monuments) {
    state.items = monuments;
  },
  setGeoJSON(state, monuments) {
    state.geoJSON = monuments;
  },
  setSelectedItem(state, item) {
    state.selectedItem = item;
  },
  setMonumentDisplay(state, v) {
    state.monumentDisplayed = v;
  },
  setFilterText(state, v) {
    state.filterText = v;
  },
  setFiltruTipPatrimoniu(state, v) {
    state.filtruTipPatrimoniu = v;
  },
  setFiltruValoareMon(state, v) {
    state.filtruValoareMon = v;
  },
  setFiltruScaraMon(state, v) {
    state.filtruScaraMon = v;
  },
  setPhotoGalleryDialog (state) {
    state.photoGalleryDialog = !state.photoGalleryDialog;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
