<template>
  <!-- ### position of the gallery ### -->
  <div id="nanogallery2" data-nanogallery2='{
        "kind": "flickr",
        "thumbnailHeight": 150,
        "thumbnailWidth": 150,
      }'>
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
        data() {
            return {
            };
        },
    }
</script>

<style scoped>

</style>