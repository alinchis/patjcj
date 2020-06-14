<template>
  <div id="mapContainer" :style="cssVars()">
    <MglMap
      :accessToken="accessToken"
      :mapStyle.sync="mapStyle"
      :container="container"
      :center="center"
      :zoom="zoom"
      height="1000px"
      @load="onMapLoaded"
    >
      <MglNavigationControl position="top-left" />
      <MglGeolocateControl position="top-left" />
      <MglMarker
        v-if="!!selectedItem"
        :coordinates="[
          selectedItem && selectedItem.longitudine_x,
          selectedItem && selectedItem.latitudine_y,
        ]"
      >
        <img slot="marker" src="../assets/marker_selected.png"/>
      </MglMarker>
    </MglMap>
  </div>
</template>

<script>
import { matRoom } from "@quasar/extras/material-icons";
import "mapbox-gl/dist/mapbox-gl.css";
import constants from "@/util/constants.js";

import {
  MglMap,
  MglNavigationControl,
  MglGeolocateControl,
  MglMarker,
} from "vue-mapbox";

import { mapGetters } from "vuex";

export default {
  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
    MglMarker,
  },
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoidHVkb3Jjb25zdGFudGluIiwiYSI6ImNrM29yN2t3cjBiMDkzaG80cTdiczhzMmIifQ.fqelSp0srqiSV3qkfbE2qQ",
      mapStyle: "mapbox://styles/tudorconstantin/ckb6h17g326dr1iuz4vf53dsr",
      container: "mapContainer",
      center: [ 23.592297, 46.771315],
      zoom: 12.5,
      constants: null,
    };
  },

  created() {
    this.map = null;
    this.matRoom = matRoom;
    this.constants = constants;
  },
  computed: {
    ...mapGetters({
      selectedItem: "monuments/getSelectedItem",
      monuments: "monuments/filteredArray",
      geoJSON: "monuments/filteredGeoJSON",
    }),
  },
  watch: {
    /* eslint-disable-next-line no-unused-vars */
    geoJSON(newValue, oldValue) {
      this.filterMap();
    },
    /* eslint-disable-next-line no-unused-vars */
    selectedItem(newValue, oldValue) {
      // re-center map view
      if (newValue && newValue.longitudine_x)
        this.$store.map.flyTo({ center: [newValue.longitudine_x, newValue.latitudine_y], zoom: 18 });
    },
  },
  methods: {
    customizeMap() {
      const map = this.$store.map;
      for (const mt in constants.monumentTypes) {
        const img = constants.monumentTypes[mt];
        map.addSource(mt, {
          type: "geojson",
          data: {
            ...this.geoJSON,
            features: this.geoJSON.features.filter(
              m => m.properties.icon_code === mt
            ),
          },
          generateId: true, // This ensures that all features have unique IDs
        });
        /* eslint-disable no-unused-vars*/
        map.loadImage(img, function(error, image) {
          let symbol = "";
          if (error) {
            symbol = "music";
          } else {
            symbol = mt;
            map.addImage(mt, image);
          }
          map.addLayer({
            id: mt, // layerID,
            type: "symbol",
            source: mt,
            layout: {
              "icon-image": symbol,
              "icon-allow-overlap": false,
              // "text-field": ['get', 'denumire'],
              //"text-field": ".",
              // "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
              // "text-size": 11,
              // // "text-transform": "uppercase",
              // "text-letter-spacing": 0.05,
              // "text-offset": [0, 1.5]
            },
            paint: {
              // "icon-color": "#fff",
              // "icon-halo-blur": 2,
              // "icon-halo-width": 2,
              // "icon-halo-color": "#fb5208",
              // "text-color": "#fff",
              // "text-halo-color": "#fb5208",
              // "text-halo-width": 2
            },
            // filter: ["==", "icon_code", mt]
          });
        });

        let hoveredMonumentId = null;
        map.on("mousemove", mt, e => {
          if (e.features && e.features.length > 0) {
            hoveredMonumentId = e.features[0].id;
            map.getCanvas().style.cursor = "pointer";
          }
        });
        map.on("mouseleave", mt, e => {
          if (hoveredMonumentId) {
            hoveredMonumentId = null;
            map.getCanvas().style.cursor = "";
          }
        });
      }

      map
        .on("click", e => {
          const clickedMonument = (this.$store.map.queryRenderedFeatures(
            e.point
          ) || [])[0];
          if (clickedMonument) {
            this.onMonumentClicked(clickedMonument.properties);
          } else {
            this.$store.dispatch("monuments/selectItem", null);
          }
        })
        .on("zoomend", () => {
          this.$store.dispatch("monuments/mapViewChanged");
        })
        .on("moveend", () => {
          this.$store.dispatch("monuments/mapViewChanged");
        });
    },
    onMapLoaded(event) {
      const map = event.map;
      this.$store.map = map;
      this.customizeMap();
    },
    cssVars() {
      //https://www.telerik.com/blogs/passing-variables-to-css-on-a-vue-component
      return {
        "--height":
          window.innerHeight -
          document.getElementById("header").offsetHeight +
          "px",
        "--width": window.innerWidth + "px",
      };
    },

    onMonumentClicked(monument) {
      if (!monument) return this.$store.dispatch("monuments/selectItem", null);
      this.$store.dispatch("monuments/selectItem", monument["cod_lmi"]);
    },
    filterMap() {
      if (!this.$store.map) return;
      const filteredGeoJSON = this.$store.getters["monuments/filteredGeoJSON"];

      for (const mt in constants.monumentTypes) {
        const geoJSONByMonumentType = {
          ...filteredGeoJSON,
          features: filteredGeoJSON.features.filter(
            m => m.properties.icon_code === mt
          ),
        };

        this.$store.map.getSource(mt).setData(geoJSONByMonumentType);
      }
    },
  },
};
</script>

<style lang="sass" scoped>
#mapContainer
  text-align: left
  height: var(--height)
  width: var(--width)
</style>
