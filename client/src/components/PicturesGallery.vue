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
          <h5>{{this.$store.state.monuments.selectedItem ? this.$store.state.monuments.selectedItem['cod_lmi'] : ''}}: {{this.$store.state.monuments.selectedItem ? this.$store.state.monuments.selectedItem['denumire'] : ''}}</h5>
          <q-space/>
          <q-btn type="button" @click="dialog = false">Close</q-btn>
        </q-card-section>

      <nano-gallery-2/>

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
        },
    }
</script>

<style lang="sass" scoped>
  .my-card
    width: 150px
    height: 150px
</style>