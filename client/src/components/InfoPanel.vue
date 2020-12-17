<!-- lmi-2015 :: infoPanel -->

<template>
  <div
      v-if="!!currentItem && currentItem['cod_lmi']"
      class="q-pa-md q-gutter-md bg-grey-5"
  >
    <q-card v-ripple>
      <q-img
          :src="currentItem.images[0] ? currentItem.images[0].replace('.jpg', '_thumb.jpg') : require('../assets/no-image.png')"
          :alt="currentItem['cod_lmi']"
          @click="openPhotoDatesDialog"
          basic
          class="cursor-pointer"
          img-class="image-class"
      >
        <div class="
        absolute-bottom
        text-subtitle2
        text-left">
          {{ currentItem["cod_lmi"] }}: {{ currentItem["denumire"] }}
        </div>
        <q-btn
            rounded
            color="blue"
            icon="photo_camera"
            class="absolute no-pointer-events"
            style="top: 30px; right: 12px; transform: translateY(-50%);"
            :label="currentItem.images.length"
            :ripple="false"
        />
      </q-img>
    </q-card>

    <q-card class="my-card bg-grey-3">
      <q-card-section>
        <div class="text-subtitle1">Localizare</div>
      </q-card-section>

      <q-markup-table wrap-cells>
        <tbody>
        <tr>
          <td class="text-left name-column">Coordonate</td>
          <td class="text-left">
            {{ formatGPSCoord(currentItem["latitudine_y"]) }},
            {{ formatGPSCoord(currentItem["longitudine_x"]) }}
          </td>
        </tr>
        <tr>
          <td class="text-left">Localitate</td>
          <td class="text-left">
            {{ currentItem["SIRUTA"] }} {{ currentItem["localitate"] }}
          </td>
        </tr>
        <tr>
          <td class="text-left">Adresa</td>
          <td class="text-left">
            {{ currentItem["adresa"] }}
          </td>
        </tr>
        </tbody>
      </q-markup-table>
    </q-card>

    <q-card class="my-card bg-grey-3">
      <q-card-section>
        <div class="text-subtitle1">Încadrare</div>
      </q-card-section>

      <q-markup-table wrap-cells>
        <tbody>
        <tr>
          <td class="text-left name-column">Patrimoniu</td>
          <td class="text-left">{{ currentItem["tip_patrimoniu"] }}</td>
        </tr>
        <tr>
          <td class="text-left name-column">Program</td>
          <td class="text-left">{{ currentItem["program_arhitectura"] }}</td>
        </tr>
        <tr>
          <td class="text-left name-column">Monument</td>
          <td class="text-left">{{ currentItem["tip_monument"] }}</td>
        </tr>
        <tr>
          <td class="text-left name-column">Datare</td>
          <td class="text-left">{{ currentItem["datare"] }}</td>
        </tr>
        </tbody>
      </q-markup-table>
    </q-card>

    <q-card class="my-card bg-grey-3">
      <q-card-section>
        <div class="text-subtitle1">Evaluare</div>
      </q-card-section>

      <q-markup-table wrap-cells>
        <tbody>
        <tr>
          <td class="text-left name-column">Stare generală</td>
          <td class="text-left">{{ currentItem["stare_generala"] }}</td>
        </tr>
        <tr>
          <td class="text-left name-column">Observații</td>
          <td class="text-left">
            {{ currentItem["observatii"] }}
          </td>
        </tr>
        </tbody>
      </q-markup-table>
    </q-card>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "InfoPanel",

  computed: {
    ...mapState({
      currentItem: state => {
        return state.monuments.selectedItem;
      }
    })
  },

  methods: {
    formatGPSCoord(number) {
      return parseFloat(number).toFixed(6);
    },
    openPhotoDatesDialog() {
      if (this.currentItem && this.currentItem.images.length > 0) this.$store.dispatch("monuments/toggleAlbumDatesDialog");
    },
  },

  components: {}
};
</script>

<style lang="sass" scoped>
.name-column
  width: 20px

.image-class
  image-orientation: from-image
</style>
