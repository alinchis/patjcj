<template>
  <!-- ### position of the gallery ### -->
  <div id="nanogallery2" data-nanogallery2></div>
</template>

<script>
    export default {
        mounted() {
            const $ = window.jQuery;
            const fullPathImageArray = [...this.$store.state.monuments.selectedItem.images].map(imgPath => ({
                src: imgPath,
                srct: imgPath.replace('.jpg', '_thumb.jpg'),
            }));
            $('#nanogallery2').nanogallery2({
                // ### gallery settings ###
                thumbnailHeight: 150,
                thumbnailWidth: "auto",
                thumbnailBorderHorizontal: 0,
                thumbnailBorderVertical: 0,
                thumbnailGutterWidth: 2,
                thumbnailGutterHeight: 5,
                thumbnailLabel:   { "display" : false },
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
