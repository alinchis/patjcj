<template>
  <div>
    <q-dialog
        v-model="dialog"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
        class="transparent"
    >
      <q-card class="bg-grey-9 text-white">

        <q-card-section v-if="$q.platform.is.desktop" class="q-pa-md row items-start q-gutter-md">
          <q-space/>
          <h5>{{this.$store.state.monuments.selectedItem ? this.$store.state.monuments.selectedItem['cod_lmi'] : ''}}:
            {{this.$store.state.monuments.selectedItem ? this.$store.state.monuments.selectedItem['denumire'] :
            ''}}</h5>
          <q-space/>
          <q-btn round type="button" color="deep-orange" @click="dialog = false" icon="clear"/>
        </q-card-section>

        <q-card-section v-if="$q.platform.is.mobile" class="q-pa-md q-gutter-md row justify-between items-start">
          <p class="text-subtitle2 col">
            {{this.$store.state.monuments.selectedItem ? this.$store.state.monuments.selectedItem['cod_lmi'] : ''}}:
            {{this.$store.state.monuments.selectedItem ? this.$store.state.monuments.selectedItem['denumire'] : ''}}
          </p>
          <div>
            <q-btn class="col" round type="button" color="deep-orange" @click="dialog = false" icon="clear"/>
          </div>
        </q-card-section>

        <q-card
            v-for="albumDate in photoAlbums"
            :key="albumDate.date"
            class="bg-grey-7"
        >
          <q-card-section>
            <div class="text-h6 q-mt-sm q-mb-xs text-orange-9">{{albumDate.date}}</div>
          </q-card-section>

          <q-card-section>
            <nano-gallery-2 :gallery-id="`nanogallery2_${albumDate.date}`" :sections-array="albumDate.sections"/>
          </q-card-section>
        </q-card>

        <!--      <nano-gallery-2 gallery-id="nanogallery2" :images-array="photoAlbums"/>-->

      </q-card>
    </q-dialog>
  </div>
</template>

<script>
    import NanoGallery2 from './NanoGallery2';

    export default {
        data() {
            return {
                maximizedToggle: true,
                slide: 1,
                carousel: false,
            };
        },
        components: {
            NanoGallery2,
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
            photoAlbums() {
                return this.$store.getters["monuments/getSelectedItemPhotoAlbums"];
            },
            // fullPathImageArray: [...this.$store.state.monuments.selectedItem.images].map(imgPath => ({
            //     src: imgPath,
            //     srct: imgPath.replace('.jpg', '_thumb.jpg'),
            // })),
        },
        mounted() {
            // const fullPathImageArray = [...this.$store.state.monuments.selectedItem.images].map(imgPath => ({
            //     src: imgPath,
            //     srct: imgPath.replace('.jpg', '_thumb.jpg'),
            // }));
        },
    }
</script>

<style lang="sass" scoped>
  .my-card
    width: 150px
    height: 150px
</style>