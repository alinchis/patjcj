<template>
  <!-- ### position of the gallery ### -->
  <div
    id="nanogallery2"
    data-nanogallery2='{
        "kind": "flickr",
        "thumbnailHeight": 150,
        "thumbnailWidth": 150,
      }'
  >
    <a
      v-for="image in this.$store.state.monuments.selectedItem.images"
      :key="image"
      :href="image"
      :data-ngthumb="image"
    >
    </a>
  </div>
</template>

<script>
export default {
  mounted() {
    const $ = window.jQuery;
    const fullPathImageArray = [...this.$store.state.monuments.selectedItem.images].map( imgPath => ({
      src: imgPath,
      srct: imgPath.replace('.jpg', '_thumb.jpg'),
    }));
    $('#nanogallery2').nanogallery2({
      // ### gallery settings ###
      thumbnailHeight: 150,
      thumbnailWidth: 150,
      // itemsBaseURL: '/',

      // ### gallery content ###
      items: fullPathImageArray,
    });
  },

  data() {
    return {};
  },
};
</script>

<style scoped></style>
