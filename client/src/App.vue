<template>
  <div>
    <!-- desktop implementation -->
    <q-layout
        view="hHh lpR fFf"
        class="aller-font"
        v-if="$q.platform.is.desktop"
    >
      <!-- photo gallery -->
      <album-dates></album-dates>
      <album-sections></album-sections>
      <album-photo-gallery></album-photo-gallery>

      <!-- header -->
      <q-header
          elevated
          id="header"
          class="bg-primary text-blue-grey-10"
          height-hint="98"
          v-if="!isHomeRoute"
      >
        <q-toolbar>
          <!-- left panel toggle icon -->
          <q-btn dense flat round icon="menu" @click="toggleLeftPanel"/>

          <q-toolbar-title class="row items-center">
            <img
                class="q-pr-xs"
                src="./assets/stema_jud-cluj.png"
                style="max-width: 300px; max-height: 30px; padding-left: 30px; padding-right: 20px"
            />
            <h4 style="margin: 0;">PATJ Cluj</h4>
          </q-toolbar-title>

          <!-- right panel toggle icon -->
          <q-btn
              v-if="monumentInfoShown && $q.platform.is.desktop"
              dense
              flat
              round
              icon="menu"
              @click="clearSelection"
          />
        </q-toolbar>

        <q-tabs align="left">
          <q-route-tab to="/lmi" label="LMI 2015"/>
          <!--        <q-route-tab to="/locuire" label="Locuire" />-->
        </q-tabs>
      </q-header>

      <q-drawer
          v-if="!isHomeRoute"
          :overlay="true"
          v-model="leftPanel"
          side="left"
          bordered
          :content-style="{ backgroundColor: '#bdbdbd' }"
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
          :content-style="{ backgroundColor: '#bdbdbd' }"
      >
        <!-- drawer content -->
        <info-panel></info-panel>
      </q-drawer>

      <q-page-container id="map-enclosure">
        <router-view/>
      </q-page-container>
    </q-layout>


    <!-- mobile implementation -->
    <q-layout
        view="hHh lpR fFf"
        class="aller-font"
        v-if="$q.platform.is.mobile"
    >
      <!-- photo gallery -->
      <album-dates></album-dates>
      <album-sections></album-sections>
      <album-photo-gallery></album-photo-gallery>

      <!-- header -->
      <q-header
          elevated
          id="header-mobile"
          class="bg-primary text-blue-grey-10"
          height-hint="98"
          v-if="!isHomeRoute"
      >
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="toggleLeftPanel"/>

          <q-toolbar-title class="row items-center">
            <img
                class="q-pr-xs"
                src="./assets/stema_jud-cluj.png"
                style="max-width: 200px; max-height: 25px; padding-left: 10px; padding-right: 10px"
            />
            <h5 style="margin: 0;">PATJ Cluj</h5>
          </q-toolbar-title>

          <q-tabs align="left">
            <q-btn-dropdown auto-close stretch flat label="Harta">
              <q-list>
                <q-route-tab
                    to="/lmi"
                    label="LMI 2015"
                    @click="this.$store.dispatch('monuments/updateCurrentTab', 'LMI 2015')"
                />
                <!-- <q-route-tab to="/locuire" label="Locuire" @click="this.$store.dispatch('monuments/updateCurrentTab', 'Locuire')"/> -->
              </q-list>
            </q-btn-dropdown>
          </q-tabs>

        </q-toolbar>
      </q-header>

      <!-- left drawer -->
      <q-drawer
          v-if="!isHomeRoute"
          :overlay="true"
          v-model="leftPanel"
          side="left"
          bordered
          :content-style="{ backgroundColor: '#bdbdbd' }"
      >
        <!-- drawer content -->
        <search-panel></search-panel>
      </q-drawer>

      <!--      <q-page-sticky z-max position="bottom-right" :offset="[18, 18]">-->
      <!--        <q-btn fab icon="add" color="accent" />-->
      <!--      </q-page-sticky>-->

      <!-- right drawer -->
      <q-drawer
          v-if="!isHomeRoute && rightPanel"
          v-model="monumentInfoShown"
          side="right"
          bordered
          :width="$q.screen.width < 640 ? $q.screen.width : 400"
          :content-style="{ backgroundColor: '#bdbdbd' }"
      >
        <!-- drawer content -->
        <info-panel></info-panel>
        <q-page-sticky position="bottom-right" :offset="[50, 50]" v-if="this.$store.state.monuments.selectedItem">
          <q-btn fab color="blue-8" icon="o_visibility_off" type="button" @click="toggleRightPanel"/>
        </q-page-sticky>
      </q-drawer>

      <q-page-container id="map-enclosure-mobile">
        <router-view/>
        <q-page-sticky position="bottom-right" :offset="[50, 50]" v-if="this.$store.state.monuments.selectedItem">
          <q-btn fab color="blue-8" icon="o_visibility" type="button" @click="toggleRightPanel"/>
        </q-page-sticky>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import SearchPanel from '@/components/SearchPanel';
import InfoPanel from '@/components/InfoPanel';
import AlbumDates from './components/AlbumDates';
import AlbumSections from './components/AlbumSections';
import AlbumPhotoGallery from './components/AlbumPhotoGallery';
import {mapState} from 'vuex';

export default {
  name: "App",

  data() {
    return {};
  },

  components: {
    SearchPanel,
    InfoPanel,
    AlbumDates,
    AlbumSections,
    AlbumPhotoGallery,
  }
  ,
  computed: {
    // if home route, hide all bars and panels
    isHomeRoute() {
      return this.$route.name === 'home';
    },
    leftPanel: {
      get() {
        // console.log('app: getLeftPanel');
        return this.$store.state.monuments.leftPanel;
      }
      ,
      set: function (value) {
        // console.log('app: setLeftPanel: ', value);
        this.$store.dispatch('monuments/setLeftPanel', value);
      },
    },
    rightPanel: {
      get() {
        // console.log('app: getRightPanel');
        return this.$store.state.monuments.rightPanel;
      }
      ,
      set: function (value) {
        // console.log('app: setRightPanel: ', value);
        this.$store.dispatch('monuments/setRightPanel', value);
      },
    },
    monumentInfoShown: {
      get() {
        return (
            this.$store.state.monuments.monumentDisplayed &&
            this.$store.state.monuments.selectedItem &&
            !!this.$store.state.monuments.selectedItem['cod_lmi']
        );
      }
      ,
      set: function (value) {
        // console.log('app: setMonumentInfoShown: ', value);
        this.$store.dispatch('monuments/setRightPanel', value);
      },
    },
    ...mapState({
      monumentDisplayed: (state) => state.monuments.monumentDisplayed,
    }),
  },
  methods: {
    toggleLeftPanel() {
      this.$store.dispatch('monuments/toggleLeftPanel');
    },
    toggleRightPanel() {
      this.$store.dispatch('monuments/toggleRightPanel');
    },
    clearSelection: function () {
      this.toggleRightPanel();
      this.$store.dispatch('monuments/clearSelection');
    },
  },
  created: async function () {
    // get monuments list
    await this.$store.dispatch('monuments/getAllMonuments');

    // get monuments photos
    this.$store.dispatch('photos/getMonumentImages', this.$store.state.photos.monumentShown.nr);

    // open the left panel
    if (this.$q.platform.is.desktop) this.leftPanel = true;
  },
};
</script>

<style lang="sass" scoped>
img
  padding: 0 60px
</style>
