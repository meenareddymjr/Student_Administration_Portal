<template>
  <sidenav
    :custom_class="color"
    :class="[isRTL ? 'fixed-end' : 'fixed-start']"
    v-if="showSidenav"
    style="font-family: -webkit-body; font-size: medium;"
  />
  <main
    class="main-content position-relative max-height-vh-100 h-100 overflow-x-hidden"
    style="font-family: -webkit-body; font-size: medium;"
  >
    <!-- nav -->
    <navbar
      :class="[isNavFixed ? navbarFixed : '', isAbsolute ? absolute : '']"
      :color="isAbsolute ? 'text-white opacity-8' : ''"
      :minNav="navbarMinimize"
      v-if="showNavbar"
    />
    <router-view />
    <app-footer v-show="showFooter" />
    <configurator
      :toggle="toggleConfigurator"
      :class="[showConfig ? 'show' : '', hideConfigButton ? 'd-none' : '']"
    />
  </main>
</template>
<script>
import Sidenav from "./views/components/Sidenav/index.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "App",
  components: {
    Sidenav,
  },
  methods: {
    ...mapMutations(["toggleConfigurator", "navbarMinimize","subjectsData"])
  },
  computed: {
    ...mapState([
      "isNavFixed",
      "navbarFixed",
      "absolute",
      "showSidenav",
      "showNavbar",
    ])
  },
  beforeMount() {
    this.$store.state.isTransparent = "bg-transparent";
    const sidenav = document.getElementsByClassName("g-sidenav-show")[0];

    if (window.innerWidth > 1200) {
      sidenav.classList.add("g-sidenav-pinned");
    }
  }
};
</script>
