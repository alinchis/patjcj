<template>
  <!-- ### position of the gallery ### -->
  <div :id="galleryId" data-nanogallery2></div>
</template>

<script>
    export default {
        props: ['galleryId', 'currentAlbumDate'],
        mounted() {
            const $ = window.jQuery;
            const albumImageArray = [];

            // populate albumImageArray
            this.currentAlbumDate.sections.forEach((section, albumIndex) => {
                albumImageArray.push({
                    src: section.images[0].replace('.jpg', '_thumb.jpg'),
                    title: section.title,
                    description: 'test',
                    ID: albumIndex + 1,
                    kind: 'album'
                });
                section.images.forEach((item, itemIndex) => {
                    albumImageArray.push({
                        src: item,
                        srct: item.replace('.jpg', '_thumb.jpg'),
                        ID: (albumIndex + 1) * 1000 + itemIndex + 1,
                        albumID: albumIndex + 1,
                    })
                });
            });

            console.log(albumImageArray);

            $(`#${this.galleryId}`).nanogallery2({
                // ### gallery settings ###
                thumbnailHeight: 150,
                thumbnailWidth: "auto",
                thumbnailBorderHorizontal: 0,
                thumbnailBorderVertical: 0,
                thumbnailGutterWidth: 2,
                thumbnailGutterHeight: 5,
                thumbnailLabel: {"display": true},
                locationHash: false,
                // itemsBaseURL: '/',

                // ### gallery content ###
                items: albumImageArray,
                galleryMaxRows: 20,
                galleryMaxItems: 1000,
                galleryDisplayMode: 'pagination',
            });
        },

        data() {
            return {};
        },

        beforeDestroy() {
            // console.log(`#${this.galleryId} destroyed`);
            window.jQuery(`#${this.galleryId}`).nanogallery2('destroy');
        },
    };
</script>

<style scoped></style>
