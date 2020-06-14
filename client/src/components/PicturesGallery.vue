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
          <vue-picture-swipe :items="items"></vue-picture-swipe>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import VuePictureSwipe from 'vue-picture-swipe';

export default {
    data() {
        return {
            maximizedToggle: true,
            items: [
                {
                    src: 'http://via.placeholder.com/600x400',
                    thumbnail: 'http://via.placeholder.com/64x64',
                    w: 600,
                    h: 400,
                    alt: 'some numbers on a grey background' // optional alt attribute for thumbnail image
                },
                {
                    src: 'http://via.placeholder.com/1200x900',
                    thumbnail: 'http://via.placeholder.com/64x64',
                    w: 1200,
                    h: 900
                }
            ]
        };
    },
    components: {
        VuePictureSwipe,
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