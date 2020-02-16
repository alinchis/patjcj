// import _ from 'lodash';
const state = {
  items: [],
  geoJSON: {},
  selectedItem: {
    cod_lmi: '',
    SIRSUP: '',
    rang: '',
    UAT: '',
    SIRUTA: '',
    localitate: '',
    SIRINF: '',
    sector: '',
    adresa: '',
    strada_nume: '',
    strada_numar: '',
    cod_lmi_jud: '',
    cod_lmi_nat: '',
    cod_lmi_grupa: '',
    cod_lmi_val: '',
    cod_lmi_num: '',
    tip_patrimoniu: '',
    program: '',
    tip_monument: '',
    denumire: '',
    observatii_adresa: '',
    fotografiat: '',
    Inexistent: '',
    constructie_noua: '',
    stare: '',
    observatii: '',
    observatii_corina: '',
    datare: '',
    x: '',
    y: '',
  },
  monumentDisplayed: false,
  filterText: '',
};

const getters = {
  getMapHeight () {
    return document.getElementById('map-enclosure').offsetHeight;
  },
  getSelectedItem () {
    return state.selectedItem;
  },
  filteredArray: (state) => {
    if (!state.filterText) return state.items.filter(m => m.x && m.y);

    // return array filtered by the search bar
    return state.items.filter(m => m.x && m.y && m['cod_lmi'] && m['cod_lmi'].toLowerCase().indexOf(state.filterText.toLowerCase()) > -1);
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
    const filteredMonuments = getters.filteredArray.map(m => m.cod_lmi);
    state.geoJSON.features.map(feature => {
      if (filteredMonuments.indexOf(feature.properties.cod_lmi) > -1) {
        res.features.push(feature);
      }
    });

    return res;
  }
};

const actions = {
  async getAllMonuments ({ commit }) {
    const res = await fetch("/api/monuments/");
    const monuments = await res.json();
    commit("setMonuments", monuments);

    const geojson = await fetch("/api/monuments.geojson");
    const geojsonMonuments = await geojson.json();
    commit("setGeoJSON", geojsonMonuments);
  },
  async selectItem ({ commit, state }, codLmi) {
    // if null value
    if (!codLmi) {
      commit("setSelectedItem", undefined);
      commit("setMonumentDisplay", false);
      return;
    }

    // get all monument data
    const fullMonument = state.items.find(
      m => m["cod_lmi"] === codLmi
    );

    // request image list
    const srvImgArrPath = `${fullMonument['SIRSUP']}_${fullMonument['UAT']}/${fullMonument['SIRUTA']}_${fullMonument['localitate']}/${fullMonument['SIRINF']}_${fullMonument['sector'].replace(' ', '-')}/${fullMonument['cod_lmi']}`;
    const imgArrReqPath = `/api/monument.images?monumentPath=${srvImgArrPath}`;
    const res = await fetch(imgArrReqPath);
    const imgArr = await res.json();

    // save full path images to array
    const fullPathImageArray = imgArr.map(photoName => `/${srvImgArrPath}/${photoName}`);

    // creat images properties
    fullMonument.images = fullPathImageArray;

    // re-center map view
    this.map.flyTo({ center: [fullMonument.x, fullMonument.y] });
    commit("setSelectedItem", fullMonument);
    commit("setMonumentDisplay", true);

  },
  setFilterText ({ commit }, text) {
    // _.debounce(function () { 
    commit('setFilterText', text);
    // }, 400)();
  }
};

const mutations = {
  setMonuments (state, monuments) {
    state.items = monuments;
  },
  setGeoJSON (state, monuments) {
    state.geoJSON = monuments;
  },
  setSelectedItem (state, item) {
    //console.log(`@mutations:: setSelectedItem ${item['cod LMI']}`);
    state.selectedItem = item;
  },
  setMonumentDisplay (state, v) {
    state.monumentDisplayed = v;
  },
  setFilterText (state, v) {
    state.filterText = v;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
