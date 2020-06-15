<template>
  <div>
    <q-dialog
        v-model="dialog"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space/>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <nano-gallery2></nano-gallery2>
        </q-card-section>
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
        };
    },
    components: {
        NanoGallery2,
    },
    computed: {
        dialog: {
            get () {
                return this.$store.state.monuments.photoGalleryDialog;
            },
            set: function () {
                this.$store.dispatch("monuments/togglePhotoGalleryDialog");
            }
        },
    },
}
</script>