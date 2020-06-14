<template>
  <div class="q-pa-md q-gutter-sm">
    <!--        <vue-picture-swipe :items="items"></vue-picture-swipe>-->

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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
          porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro
          labore.
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
                dialog: false,
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
            // VuePictureSwipe,
        }
    }
</script>