<template>
  <!-- ### position of the gallery ### -->
  <div
      :id="galleryId"
      data-nanogallery2
  ></div>
</template>

<script>
export default {
  name: "NanoGallery2",

  props: ['galleryId'],

  mounted() {
    const $ = window.jQuery;

    $(`#${this.galleryId}`).nanogallery2({
      // ### gallery settings ###
      thumbnailHeight: 150,
      thumbnailWidth: "auto",
      thumbnailBorderHorizontal: 0,
      thumbnailBorderVertical: 0,
      thumbnailGutterWidth: 2,
      thumbnailGutterHeight: 5,
      thumbnailLabel: {"display": false},
      locationHash: false,
      // itemsBaseURL: '/',

      // ### gallery content ###
      items: this.currentAlbumSection,
      galleryMaxRows: 20,
      galleryMaxItems: 1000,
      // galleryDisplayMode: 'pagination',
    });
  },

  data() {
    return {};
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
    currentAlbumSection() {
      return this.$store.state.monuments.selectedItem ? this.$store.getters["monuments/getSelectedPhotoAlbum"].nanoGallery2Items : [];
    },
  },

  beforeDestroy() {
    // console.log(`#${this.galleryId} destroyed`);
    window.jQuery(`#${this.galleryId}`).nanogallery2('destroy');
  },
};
</script>

<style scoped></style>
