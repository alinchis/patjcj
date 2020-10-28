<template>
  <div class="">
    <q-dialog
        v-model="paDialog"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
        class="transparent"
    >
      <!--  DESKTOP - WRAPPER ITEM   -->
      <q-layout v-if="$q.platform.is.desktop" class="bg-grey-9 text-white hide-scrollbar" view="lHr LpR lfr">
        <!-- HEADER -->
        <q-header reveal class="bg-transparent row justify-center">
          <div class="bg-transparent no-border q-ma-md gt-sm">
            <div style="width: 54px; height: 54px"></div>
          </div>

          <q-btn-group rounded class="q-ma-md header-btn-group">
            <q-btn
                color="grey"
                rounded
                no-caps
                :ripple="false"
                class="text-h6"
                @click="paDialog = false"
                :label="this.$store.state.monuments.selectedItem ? this.$store.state.monuments.selectedItem['denumire'] : ''"
            />
            <q-btn
                color="amber"
                rounded
                no-caps
                :ripple="false"
                class="text-h6 no-pointer-events"
                :label="this.$store.state.monuments.selectedItem ? this.$store.state.monuments.selectedItem['albumDate'] : ''"
            />
            <q-btn
                round
                type="button"
                size="18px"
                color="deep-orange"
                @click="paDialog = false"
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
                @click="paDialog = false"
                icon="clear"
                class="q-ma-md"
            />
          </div>
        </q-header>

        <!-- PAGE -->
        <q-page-container class="q-gutter-md q-ma-xl bg-transparent"
                          style="min-width: 360px">
          <div
              v-for="(section, index) in currentDateAlbum"
              :key="index"
              class="q-pa-xs q-ma-none row items-start q-gutter-md justify-center"
          >
            <q-responsive :ratio="4/3" class="col q-ma-none" style="max-height: 170px; max-width: 500px">
              <q-card
                  v-ripple
                  class="column cursor-pointer"
                  :ratio="4/3"
                  @click="openNext(index)"

              >
                <q-img
                    :src="section.thumbnails[0]"
                    class="col dimmed"
                    @mouseenter="$event.target.classList.toggle('dimmed')"
                    @mouseleave="$event.target.classList.toggle('dimmed')"
                >
                </q-img>
                <div
                    class="text-h5 absolute-bottom text-center q-pa-sm"
                    style="background-color: rgba(0,0,0, 0.5)"
                >
                  {{ section.title }}
                </div>
                <q-btn
                    rounded
                    color="blue"
                    icon="photo_camera"
                    class="absolute no-pointer-events"
                    style="top: 30px; right: 12px; transform: translateY(-50%);"
                    :label="section.images.length"
                    :ripple="false"
                />
              </q-card>
            </q-responsive>
          </div>
        </q-page-container>
      </q-layout>
      <!--  DESKTOP - WRAPPER ITEM   -->


      <!--  MOBILE - WRAPPER ITEM   -->
      <q-layout v-if="$q.platform.is.mobile" class="bg-grey-9 text-white hide-scrollbar" view="lHr LpR lfr">
        <!-- HEADER -->
        <q-header reveal class="bg-transparent row justify-center">
          <div class="bg-transparent no-border q-ma-sm gt-sm">
            <div style="width: 54px; height: 54px"></div>
          </div>

          <q-btn-group rounded class="q-ma-sm header-btn-group">
            <q-btn
                color="grey"
                rounded
                no-caps
                :ripple="false"
                class="text-h7"
                @click="paDialog = false"
                :label="this.$store.state.monuments.selectedItem ? this.$store.state.monuments.selectedItem['denumire'] : ''"
            />
            <q-btn
                color="amber"
                rounded
                no-caps
                :ripple="false"
                class="text-h7 no-pointer-events"
                :label="this.$store.state.monuments.selectedItem ? this.$store.state.monuments.selectedItem['albumDate'] : ''"
            />
            <q-btn
                round
                type="button"
                size="15px"
                color="deep-orange"
                @click="paDialog = false"
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
                @click="paDialog = false"
                icon="arrow_back"
                class="q-ma-sm"
            />
          </div>
        </q-header>

        <!-- PAGE -->
        <q-page-container class="q-gutter-md q-ma-sm bg-transparent"
                          style="min-width: 300px">
          <div
              v-for="(section, index) in currentDateAlbum"
              :key="index"
              class="q-pa-xs q-ma-none row items-start q-gutter-md justify-center"
          >
            <q-responsive :ratio="16/9" class="col q-ma-none" style="max-height: 150px; max-width: 400px">
              <q-card
                  v-ripple
                  class="column cursor-pointer"
                  :ratio="16/9"
                  @click="openNext(index)"

              >
                <q-img
                    :src="section.thumbnails[0]"
                    class="col"
                >
                </q-img>
                <div
                    class="text-h6 absolute-bottom text-center q-pa-sm"
                    style="background-color: rgba(0,0,0, 0.5)"
                >
                  {{ section.title }}
                </div>
                <q-btn
                    rounded
                    color="blue"
                    icon="photo_camera"
                    class="absolute no-pointer-events"
                    style="top: 30px; right: 12px; transform: translateY(-50%);"
                    :label="section.images.length"
                    :ripple="false"
                />
              </q-card>
            </q-responsive>
          </div>
        </q-page-container>
      </q-layout>
      <!--  MOBILE - WRAPPER ITEM   -->

    </q-dialog>
  </div>
</template>

<script>

export default {
  name: "AlbumSections",

  data() {
    return {
      maximizedToggle: true,
    };
  },

  computed: {
    paDialog: {
      get() {
        return this.$store.state.monuments.albumSectionsDialog;
      },
      set: function () {
        this.$store.dispatch("monuments/toggleAlbumSectionsDialog");
      }
    },

    photoAlbums() {
      return this.$store.getters["monuments/getSelectedItemPhotoAlbums"];
    },

    selectedDate() {
      // console.log('selectedDate()...');
      // return this.$store.getters["monuments/getSelectedPhotoDate"];
      return this.$store.state.monuments.selectedItem.albumDate;
    },

    currentDateAlbum() {
      const returnItem = this.$store.state.monuments.selectedItem && this.$store.state.monuments.selectedItem.images.length > 0 ?
          this.photoAlbums.filter(item => item.date === this.$store.state.monuments.selectedItem.albumDate)[0].sections : [];
      // console.log('@Carousel.vue :: @currentAlbumSection >> ', returnItem);
      return returnItem;
    },
  },

  methods: {

    openNext: function (selectedSection) {
      // console.log('@AlbumSections.vue :: @openNext >> selected section: ', selectedSection);
      // set new section
      this.$store.dispatch("monuments/setAlbumSelectedSection", selectedSection);
      // next step for selected date
      // console.log('@AlbumSections.vue :: @openAlbumPhotoGallery');
      this.$store.dispatch("monuments/toggleAlbumPhotoGalleryDialog");

    },
  },

  mounted() {
  },
}
</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>