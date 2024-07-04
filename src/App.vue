<template>
  <Navbar v-if="!isLoginOrRegisterRoute" />
  <RouterView />
  <Footer v-if="!isLoginOrRegisterRoute" />
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
const isLoginOrRegisterRoute = computed(() => route.meta.hideNavbar);

</script>


<style scoped></style>
