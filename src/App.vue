<template>
  <Navbar v-if="isNotAuthRoute" />
  <RouterView />
  <Footer v-if="isNotAuthRoute" />
</template>

<script setup>
// ---------UTILS---------//
import { computed } from "vue";
import { RouterView, useRoute } from 'vue-router';

// --------COMPONENTS----------//
import Navbar from './global/components/Navbar.vue';
import Footer from './global/components/Footer.vue';

// ----------CONFIG----------//
const route = useRoute();

// ----------FUNCTIONS---------//
const isNotAuthRoute = computed(() => route.meta.showNavbar);

</script>


<style scoped></style>
