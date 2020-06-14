<template>
  <q-page class="home column fullscreen justify-evenly">
    <div class="top-row column items-center">
      <img
        src="../assets/stema_jud-cluj.png"
        style="max-width: 600px; max-height: 300px;"
      >
      <h2 class="text-h2 text-blue-grey-10">PATJ Cluj</h2>
      <q-btn
        to="lmi"
        push
        rounded
        color="indigo-10"
        label="explorează"
        no-caps
        size="lg"
      />
    </div>

  </q-page>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data () {
    return {
    }
  },
};
</script>

<style lang="sass" scoped>
.home
  background-color: white
.top-row
  background-color: white
.bottom-row
  background-color: white
</style>