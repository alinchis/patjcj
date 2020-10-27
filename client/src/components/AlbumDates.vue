<template>
  <div class="">
    <q-dialog
        v-model="dialog"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
        class="transparent"
    >
      <!--  WRAPPER ITEM   -->
      <q-layout class="bg-grey-9 text-white hide-scrollbar" view="lHr LpR lfr">
        <!-- HEADER -->
        <q-header reveal class="bg-transparent row justify-center">
          <div v-if="$q.platform.is.desktop" class="bg-transparent no-border q-ma-md gt-sm">
            <div style="width: 54px; height: 54px"></div>
          </div>

          <q-btn-group rounded class="q-ma-md header-btn-group">
            <q-btn
                color="grey"
                rounded
                no-caps
                :ripple="false"
                class="text-h6 no-pointer-events"
                :label="this.$store.state.monuments.selectedItem ? this.$store.state.monuments.selectedItem['cod_lmi'] : ''"
            />
            <q-btn
                color="amber-14"
                rounded
                no-caps
                :ripple="false"
                class="text-h6 no-pointer-events"
                :label="this.$store.state.monuments.selectedItem ? this.$store.state.monuments.selectedItem['denumire'] : ''"
            />
            <q-btn
                round
                type="button"
                size="18px"
                color="deep-orange"
                @click="dialog = false"
                icon="clear"
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
                @click="dialog = false"
                icon="clear"
                class="q-ma-md"
            />
          </div>
        </q-header>

        <!-- PAGE -->
        <q-page-container v-if="$q.platform.is.desktop" class="q-gutter-md q-ma-xl bg-transparent"
                          style="min-width: 360px">
          <div
              v-for="(album) in photoAlbums"
              :key="album.date"
              class="q-pa-xs q-ma-none row items-start q-gutter-md justify-center"
          >
            <q-responsive :ratio="4/3" class="col q-ma-none" style="max-height: 170px; max-width: 500px">
              <q-card
                  v-ripple
                  class="column cursor-pointer"
                  :ratio="4/3"
                  @click="openNext(album.date)"

              >
                <q-img
                    :src="album.sections[0].thumbnails[0]"
                    class="col dimmed"
                    @mouseenter="$event.target.classList.toggle('dimmed')"
                    @mouseleave="$event.target.classList.toggle('dimmed')"
                >
                </q-img>
                <div
                    class="text-h5 absolute-bottom text-center q-pa-sm"
                    style="background-color: rgba(0,0,0, 0.5)"
                >
                  {{ album.date }}
                </div>
                <q-btn
                    rounded
                    color="blue"
                    icon="photo_camera"
                    class="absolute no-pointer-events"
                    style="top: 30px; right: 12px; transform: translateY(-50%);"
                    :label="album.sections[0].images.length"
                    :ripple="false"
                />
              </q-card>
            </q-responsive>
          </div>
        </q-page-container>

      </q-layout>
    </q-dialog>
  </div>
</template>

<script>

export default {
  name: "AlbumDates",

  data() {
    return {
      maximizedToggle: true,
      slide: 1,
      carousel: false,
    };
  },

  components: {},

  computed: {
    dialog: {
      get() {
        return this.$store.state.monuments.albumDatesDialog;
      },
      set: function () {
        this.$store.dispatch("monuments/toggleAlbumDatesDialog");
      }
    },

    photoAlbums() {
      return this.$store.getters["monuments/getSelectedItemPhotoAlbums"];
    },
  },

  methods: {
    selectedDateAlbum(selectedDate) {
      // console.log('@AlbumDates.vue :: @selectedDateAlbum >> selected date: ', selectedDate);
      return this.photoAlbums.filter(item => item.date === selectedDate)[0];
    },

    openAlbumSections: (vueStore, selectedDate) => {
      // console.log('@AlbumDates.vue :: @openAlbumSections >> selectedDate: ', selectedDate);
      vueStore.dispatch("monuments/toggleAlbumSectionsDialog", selectedDate);
    },

    openAlbumPhotoGallery: (vueStore) => {
      // console.log('@AlbumDates.vue :: @openAlbumPhotoGallery');
      vueStore.dispatch("monuments/toggleAlbumPhotoGalleryDialog");
    },

    openNext: function (selectedDate) {
      // console.log('@AlbumDates.vue :: @openNext >> selected date: ', selectedDate);
      // set new date
      this.$store.dispatch("monuments/setAlbumSelectedDate", selectedDate);

      // next step for selected date
      // console.log('selectedDateAlbum: ', this.selectedDateAlbum(selectedDate));
      const sectionsLength = this.selectedDateAlbum(selectedDate).sections.length;
      // console.log('@AlbumDates.vue :: @openNext >> selectedItem.PhotoAlbums.sections.length: ', sectionsLength);
      if (sectionsLength === 1) {
        this.openAlbumPhotoGallery(this.$store);
      } else {
        this.openAlbumSections(this.$store);
      }
    },

  },
}
</script>

<style lang="sass" scoped>

.header-btn-group
  max-width: 80%
</style>