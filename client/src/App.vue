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

        <q-toolbar-title class="row items-center">
          <img
            class="q-pr-xs"
            src="./assets/stema_jud-cluj.png"
            style="max-width: 300px; max-height: 30px; padding-left: 30px; padding-right: 20px"
          />
          <h4 style="margin: 0;">PATJ Cluj</h4>
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
        <q-route-tab to="/lmi" label="LMI 2015" />
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
    // open the left panel
    this.left = true;
    // get monuments list
    await this.$store.dispatch('monuments/getAllMonuments');

    // get monuments photos
    this.$store.dispatch(
      'photos/getMonumentImages',
      this.$store.state.photos.monumentShown.nr
    );
  },
};
</script>

<style lang="sass" scoped>
img
  padding: 0 60px
</style>
