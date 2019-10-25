<template>
  <div id="app">
    <loader v-if="showLoaderStatus" />
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import loader from "@/components/shared/loaders.vue";
export default {
  name: "app",
  components: {
    loader
  },
  computed: {
    ...mapGetters({
      showLoaderStatus: "showLoaderStatus"
    })
  },
  methods: {
    ...mapActions({
      getDataFromCookies: "getDataFromCookies",
      getSHINSTATES: "getSHINSTATES"
    })
  },
  beforeMount() {
    this.getDataFromCookies();
    this.getSHINSTATES();
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  max-width: 600px;
  margin: auto;
}
</style>
