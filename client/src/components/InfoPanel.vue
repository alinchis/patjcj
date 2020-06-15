<template>
  <div
      v-if="!!currentItem && currentItem['cod_lmi']"
      class="q-pa-md q-gutter-md bg-grey-5"
  >
    <q-card class="my-card">
      <q-img
          :src="currentItem.images[0].replace('.jpg', '_thumb.jpg')  || require('../assets/no-image.png')"
          :alt="currentItem.cod_lmi"
          @click="openPhotoGalleryDialog"
          basic
          class="cursor-pointer"
      >
        <div class="
        absolute-bottom
        text-subtitle2
        text-left">
          {{ currentItem["cod_lmi"] }}: {{ currentItem["denumire"] }}
        </div>
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
        name: "InfoBar",
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
            openPhotoGalleryDialog() {
                this.$store.dispatch("monuments/togglePhotoGalleryDialog");
            },
        },
        components: {}
    };
</script>

<style lang="sass" scoped>
  .name-column
    width: 20px

  q-img
    image-orientation: from-image
</style>
