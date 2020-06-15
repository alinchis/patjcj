<template>
  <div>
    <q-dialog
        v-model="dialog"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
    >
      <q-card class="bg-grey-9 text-white">

        <q-card-section class="q-pa-md row items-start q-gutter-md" v-if="$q.platform.is.desktop">
          <q-space/>
        </q-card-section>

        <q-card-section class="q-pa-md row items-start q-gutter-md" v-if="this.$store.state.monuments.selectedItem && !carousel">

          <q-card
              class="my-card"
              v-for="(image, index) in this.$store.state.monuments.selectedItem.images"
              :key="index"
          >
            <q-img
                :src="image"
                basic
                :ratio="1"
                @click="slide = index; carousel = true;"
            ></q-img>
          </q-card>

          <q-page-sticky z-max position="top-right" :offset="[15, -30]" v-if="$q.platform.is.mobile">
            <q-btn fab color="red" icon="clear" type="button" v-close-popup/>
          </q-page-sticky>

          <q-page-sticky z-max position="top-right" :offset="[-350, -80]" v-if="$q.platform.is.desktop">
            <q-btn fab color="red" icon="clear" type="button" v-close-popup/>
          </q-page-sticky>
        </q-card-section>

        <q-card-section class="q-pa-none fit" v-if="this.$store.state.monuments.selectedItem && carousel">
          <q-carousel
              animated
              v-model="slide"
              arrows
              navigation
              infinite
              dark
              thumbnails
          >
            <q-carousel-slide
                v-for="(image, index) in this.$store.state.monuments.selectedItem.images"
                :key="index"
                :name="index"
                :img-src="image"
                dark
            />
          </q-carousel>
          <q-page-sticky z-max position="top-right" :offset="[15, -30]" v-if="$q.platform.is.mobile">
            <q-btn fab color="grey-9" icon="clear" type="button" @click="carousel = false"/>
          </q-page-sticky>
        </q-card-section>

        <!--        <q-card-section class="q-pt-none">-->
        <!--          <nano-gallery2></nano-gallery2>-->
        <!--        </q-card-section>-->

      </q-card>
    </q-dialog>
  </div>
</template>

<script>
    // import NanoGallery2 from './NanoGallery2';

    export default {
        data() {
            return {
                maximizedToggle: true,
                slide: 1,
                carousel: false,
            };
        },
        components: {
            // NanoGallery2,
        },
        computed: {
            dialog: {
                get() {
                    return this.$store.state.monuments.photoGalleryDialog;
                },
                set: function () {
                    this.$store.dispatch("monuments/togglePhotoGalleryDialog");
                }
            },
        },
    }
</script>

<style lang="sass" scoped>
  .my-card
    width: 150px
    height: 150px
</style>