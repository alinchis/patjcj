<template>
  <div class="fit column wrap content-center">

    <!--  DESKTOP - WRAPPER ITEM   -->
    <div v-if="$q.platform.is.desktop" style="background-color: darkolivegreen; padding-bottom: 220px" class="fit column justify-center">
      <q-carousel
          swipeable
          animated
          v-model="virtualListIndex"
          infinite
          arrows
          :fullscreen.sync="fullscreen"
          class="fit"
      >
        <q-carousel-slide
            v-for="(item, index) in currentAlbumSection.images"
            :key="index"
            :name="index"
            :img-src="item"
        />

        <template v-slot:control>
          <q-carousel-control
              position="top-right"
              :offset="[18, 18]"
          >
            <q-btn
                push round dense color="blue-9" text-color="primary"
                size="lg"
                :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="fullscreen = !fullscreen"
            />
          </q-carousel-control>
        </template>
      </q-carousel>
    </div>

    <div
        v-if="$q.platform.is.desktop"
        style="height: 220px; width: 100%;"
        class="bg-grey-10 fixed-bottom q-pa-sm q-pl-lg q-pr-lg"
    >
      <q-virtual-scroll
          ref="thumbnailsScrollArea"
          virtual-scroll-horizontal
          :items="currentAlbumSection.thumbnails"
          :virtual-scroll-item-size="250"
          :virtual-scroll-sticky-size-start="48"
          :virtual-scroll-sticky-size-end="48"

      >
        <template v-slot="{ item, index }">
          <q-responsive
              :ratio="16/9"
              style="height: 180px; max-height: 180px; min-width: 240px;"
              :key="index"
              class="q-ma-xs cursor-pointer"

          >
            <q-card
                :ref="`imgStrip_${index}`"
                class="img-strip-card column"
                v-bind:class="[index === virtualListIndex ? 'img-strip-card-selected' : '']"
                v-ripple
                @click="imgCardClick($event.target, index)"
                @mouseenter="$event.target.classList.toggle('dimmed')"
                @mouseleave="$event.target.classList.toggle('dimmed')"
            >
              <q-img
                  :name="index"
                  :src="item"
                  spinner-color="white"
                  class="col"
                  style="border: #F2C037"
              ></q-img>
            </q-card>

          </q-responsive>
        </template>

      </q-virtual-scroll>

      <div class="absolute-bottom-left z-fab" style="bottom: 80px; left: 10px">
        <q-btn
            fab
            icon="keyboard_arrow_left"
            color="blue-9"
            @click="scrollLeft"
        />
      </div>

      <div class="absolute-bottom-right z-fab" style="bottom: 80px; right: 10px">
        <q-btn
            fab
            icon="keyboard_arrow_right"
            color="blue-9"
            @click="scrollRight"
        />
      </div>
    </div>
    <!--  DESKTOP - WRAPPER ITEM   -->


    <!--  MOBILE - WRAPPER ITEM   -->
    <div v-if="$q.platform.is.mobile" class="orientation-portrait fit column justify-center" style="background-color: darkolivegreen; padding-bottom: 170px">
      <q-carousel
          swipeable
          animated
          v-model="virtualListIndex"
          infinite
          arrows
          :fullscreen.sync="fullscreen"
          class="fit"
      >
        <q-carousel-slide
            v-for="(item, index) in currentAlbumSection.images"
            :key="index"
            :name="index"
            :img-src="item"
        />

        <template v-slot:control>
          <q-carousel-control
              position="top-right"
              :offset="[18, 18]"
          >
            <q-btn
                push round dense color="blue-9" text-color="primary"
                size="lg"
                :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="fullscreen = !fullscreen"
            />
          </q-carousel-control>
        </template>
      </q-carousel>
    </div>

    <div
        v-if="$q.platform.is.mobile"
        style="height: 170px; width: 100%;"
        class="bg-grey-10 fixed-bottom q-pa-sm"
    >
      <q-virtual-scroll
          ref="thumbnailsScrollArea"
          virtual-scroll-horizontal
          :items="currentAlbumSection.thumbnails"
          :virtual-scroll-item-size="250"
          :virtual-scroll-sticky-size-start="48"
          :virtual-scroll-sticky-size-end="48"
          class=""
      >
        <template v-slot="{ item, index }">
          <q-responsive
              :ratio="16/9"
              style="height: 130px; max-height: 130px; min-width: 130px;"
              :key="index"
              class="q-ma-xs cursor-pointer"

          >
            <q-card
                :ref="`imgStrip_${index}`"
                class="img-strip-card column"
                v-bind:class="[index === virtualListIndex ? 'img-strip-card-selected' : '']"
                v-ripple
                @click="imgCardClick($event.target, index)"
                @mouseenter="$event.target.classList.toggle('dimmed')"
                @mouseleave="$event.target.classList.toggle('dimmed')"
            >
              <q-img
                  :name="index"
                  :src="item"
                  spinner-color="white"
                  class="col"
                  style="border: #F2C037"
              ></q-img>
            </q-card>

          </q-responsive>
        </template>
      </q-virtual-scroll>

    </div>
    <!--  MOBILE - WRAPPER ITEM   -->

  </div>
</template>


<script>
export default {
  name: "Carousel",

  data() {
    return {
      slide: 1,
      fullscreen: false,
      virtualListIndex: 0,
      previousItem: this.$refs.imgStrip_0,
    }
  },

  computed: {
    photoGalleryDialog: {
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

    currentAlbumSection() {
      const returnItem = this.photoAlbums.filter(item => item.date === this.$store.state.monuments.selectedItem.albumDate)[0].sections[this.$store.state.monuments.selectedItem.albumSectionIndex];
      // console.log('@Carousel.vue :: @currentAlbumSection >> ', returnItem);
      return returnItem;
    },
  },

  methods: {
    imgCardClick(element, cardIndex) {
      // console.log('previous element: ', this.$refs[`imgStrip_${this.virtualListIndex}`].classList);
      // this.$refs[`imgStrip_${this.virtualListIndex}`].classList.remove('img-strip-card-selected');
      // element.classList.add('img-strip-card-selected');
      this.virtualListIndex = cardIndex;
      this.$refs.thumbnailsScrollArea.scrollTo(cardIndex);
      this.previousItem = element;
    },

    virtualScrollUpdatePosition({index}) {
      this.virtualListIndex = index
      // console.log('index: ', index);
    },

    scrollLeft() {
      this.virtualListIndex = this.virtualListIndex > 0 ? this.virtualListIndex - 1 : this.virtualListIndex;
      this.$refs.thumbnailsScrollArea.scrollTo(this.virtualListIndex);
      // console.log('virtualListIndex = ', this.virtualListIndex);
    },

    // fullScrollLeft() {
    //   this.virtualListIndex = this.virtualListIndex > 5 ? this.virtualListIndex - 5 : this.virtualListIndex;
    //   this.$refs.thumbnailsScrollArea.scrollTo(this.virtualListIndex);
    //   console.log('virtualListIndex = ', this.virtualListIndex);
    // },

    scrollRight() {
      this.virtualListIndex = this.virtualListIndex < this.currentAlbumSection.thumbnails.length - 1 ? this.virtualListIndex + 1 : this.virtualListIndex;
      this.$refs.thumbnailsScrollArea.scrollTo(this.virtualListIndex);
      // console.log('virtualListIndex = ', this.virtualListIndex);
    },

    // fullScrollRight() {
    //   this.virtualListIndex = this.virtualListIndex < this.currentAlbumSection.thumbnails.length - 6 ? this.virtualListIndex + 5 : this.virtualListIndex;
    //   this.$refs.thumbnailsScrollArea.scrollTo(this.virtualListIndex);
    //   console.log('virtualListIndex = ', this.virtualListIndex);
    // },

    // imgStripHandleSwipe({evt, ...info}) {
    //   this.info = info
    //
    //   // native Javascript event
    //   // console.log(evt)
    // },

  },

}
</script>


<style lang="sass" scoped>

::-webkit-scrollbar
  width: 10px
  overflow: auto

::-webkit-scrollbar-thumb
  width: 10px
  background-color: rgba(155, 155, 155, .5)

::-webkit-scrollbar-thumb:hover
  background: rgba(255, 255, 255, .5)

.img-strip-card
  width: 100%
  max-width: 250px
  border: #1D1D1D

.img-strip-card-selected
  border: 3px solid darkorange
</style>