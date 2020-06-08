<template>
  <q-layout view="hHh lpR fFf" class="aller-font">
    <q-header
      elevated
      id="header"
      class="bg-primary text-blue-grey-10"
      height-hint="98"
      v-if="!isHomeRoute"
    >
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title class="row">
          <img
            class="q-pr-xs"
            src="./assets/logo_bucuresti_2050.svg"
            style="max-width: 600px; max-height: 40px;"
          />
          <img
            class="q-pl-xs"
            src="./assets/logo_bucuresti_2050_text_fara-subtitlu_bicrom_linie.svg"
            style="max-width: 600px; max-height: 40px;"
          />
        </q-toolbar-title>

        <q-btn
          v-if="monumentInfoShown"
          dense
          flat
          round
          icon="menu"
          @click="
            $store.commit(
              'monuments/setMonumentDisplay',
              !$store.state.monuments.monumentDisplayed
            )
          "
        />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/lmi" label="LMI" />
        <q-route-tab to="/locuire" label="Locuire" />
      </q-tabs>
    </q-header>

    <q-drawer
      v-if="!isHomeRoute"
      :overlay="true"
      v-model="left"
      side="left"
      bordered
    >
      <!-- drawer content -->
      <search-panel></search-panel>
    </q-drawer>

    <q-drawer
      v-if="!isHomeRoute"
      v-model="monumentInfoShown"
      side="right"
      bordered
      :width="400"
    >
      <!-- drawer content -->
      <info-panel></info-panel>
    </q-drawer>

    <q-page-container id="map-enclosure">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import SearchPanel from '@/components/SearchPanel';
import InfoPanel from '@/components/InfoPanel';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      left: true,
    };
  },
  components: {
    SearchPanel,
    InfoPanel,
  },
  computed: {
    // if home route, hide all bars and panels
    isHomeRoute() {
      return this.$route.name === 'home';
    },

    ...mapState({
      monumentDisplayed: (state) => state.monuments.monumentDisplayed,
      monumentInfoShown: (state) =>
        state.monuments.monumentDisplayed &&
        !!state.monuments.selectedItem['cod_lmi'],
    }),
  },
  created: async function () {
    // get monuments list
    await this.$store.dispatch('monuments/getAllMonuments');

    // get monuments photos
    this.$store.dispatch(
      'photos/getMonumentImages',
      this.$store.state.photos.monumentShown.nr
    );
    // open the left panel
    this.left = true;
  },
};
</script>

<style lang="sass" scoped>
img
  padding: 0 60px
</style>
