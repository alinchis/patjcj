<template>
  <div>
    <q-dialog
        v-model="apDialog"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
        class="transparent"
    >

      <!--  DESKTOP - WRAPPER ITEM   -->
      <q-layout v-if="$q.platform.is.desktop" class="bg-grey-9 text-white" view="lHr LpR lfr">
        <!-- HEADER -->
        <q-header reveal class="bg-transparent row justify-center">
          <div class="bg-transparent no-border q-ma-md gt-sm">
            <div style="width: 54px; height: 54px"></div>
          </div>

          <q-btn-group rounded class="q-ma-md header-btn-group">
            <q-btn
                color="grey-8"
                rounded
                no-caps
                :ripple="false"
                class="text-h6"
                @click="apDialog = false"
                :label="this.$store.state.monuments.selectedItem ? this.$store.state.monuments.selectedItem['albumDate'] : ''"
            />
            <q-btn
                v-if="currentAlbumSection().title !== 'Ansamblu'"
                color="amber-14"
                rounded
                no-caps
                :ripple="false"
                class="text-h6 no-pointer-events"
                :label="currentAlbumSection().title"
            />
            <q-btn
                round
                type="button"
                size="18px"
                color="deep-orange"
                @click="apDialog = false"
                icon="arrow_back"
                class="q-ma-none"
                v-if="$q.screen.width < 1024"
            />
          </q-btn-group>

          <div class="bg-transparent no-border gt-sm">
            <q-btn
                round
                type="button"
                size="18px"
                color="deep-orange"
                @click="apDialog = false"
                icon="arrow_back"
                class="q-ma-md"
            />
          </div>
        </q-header>

        <!-- PAGE -->
        <q-page-container
            class="bg-transparent fit"
            style="min-width: 360px;"
        >
          <Carousel></Carousel>
        </q-page-container>
      </q-layout>
      <!--  DESKTOP - WRAPPER ITEM   -->


      <!--  MOBILE - WRAPPER ITEM   -->
      <q-layout v-if="$q.platform.is.mobile" class="bg-grey-9 text-white" view="lHr LpR lfr">
        <!-- HEADER -->
        <div reveal class="bg-transparent row justify-center z-fab" style="position: fixed; top: 0px;">
          <div v-if="$q.screen.width >= 640" class="bg-transparent no-border">
            <q-btn
                round
                type="button"
                size="18px"
                color="deep-orange"
                @click="apDialog = false"
                icon="arrow_back"
                class="q-ma-sm"
            />
          </div>

          <q-btn-group rounded class="q-ma-sm header-btn-group">
            <q-btn
                round
                type="button"
                size="15px"
                color="deep-orange"
                @click="apDialog = false"
                icon="arrow_back"
                class="q-ma-none"
                v-if="$q.screen.width < 640"
            />
            <q-btn
                color="amber-14"
                rounded
                no-caps
                :ripple="false"
                class="text-h7"
                @click="apDialog = false"
                :label="this.$store.state.monuments.selectedItem ? this.$store.state.monuments.selectedItem['albumDate'] : ''"
            />
            <q-btn
                v-if="currentAlbumSection().title !== 'Ansamblu'"
                color="grey-8"
                rounded
                no-caps
                :ripple="false"
                class="text-h7 no-pointer-events"
                :label="currentAlbumSection().title"
            />
          </q-btn-group>
        </div>

        <!-- PAGE -->
        <q-page-container
            class="bg-transparent fit"
            style="min-width: 300px;"
        >
          <Carousel></Carousel>
        </q-page-container>
      </q-layout>
      <!--  MOBILE - WRAPPER ITEM   -->

    </q-dialog>
  </div>
</template>

<script>
import Carousel from './Carousel';

export default {
  name: "AlbumPhotoGallery",

  data() {
    return {
      maximizedToggle: true,
      slide: 1,
      carousel: false,
    };
  },

  components: {
    Carousel,
  },

  computed: {
    apDialog: {
      get() {
        return this.$store.state.monuments.albumPhotoGalleryDialog;
      },
      set: function () {
        this.$store.dispatch("monuments/toggleAlbumPhotoGalleryDialog");
      }
    },

    photoAlbums() {
      return this.$store.getters["monuments/getSelectedItemPhotoAlbums"];
    },
  },

  methods: {
    currentAlbumSection() {
      const returnItem = this.$store.state.monuments.selectedItem && this.$store.state.monuments.selectedItem.images.length > 0 ? this.photoAlbums.filter(item => item.date === this.$store.state.monuments.selectedItem.albumDate)[0].sections[this.$store.state.monuments.selectedItem.albumSectionIndex] : [];
      // console.log('@AlbumPhotoGallery :: @currentAlbumSection >> ', returnItem);
      return returnItem;
    },
  },
}
</script>

<style lang="sass" scoped>
.my-card
  width: 150px
  height: 150px
</style>