<template>
  <main class="flex mt-10 md:mr-10">
    <Login @on:toggleShowLogin="toggleShowLogin" v-if="showLogin" />
    <Register @on:toggleShowLogin="toggleShowLogin" v-if="!showLogin" />

    <Spinner
      :loading="homeStore.homeLoadingHttp.loading"
      :title="homeStore.homeLoadingHttp.title"
      :description="homeStore.homeLoadingHttp.description" />
  </main>
</template>

<script setup>
// ---------UTILS----------//
import { ref } from "vue";

// ---------COMPONENTS----------//
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Spinner from "../../global/components/Spinner.vue";

// ---------UTILS----------//
import useHomeStore from "../../home/stores/useHomeStore";

// ---------CONFIG----------//
const homeStore = useHomeStore();

// ---------STATES AND VARIABLES----------//
const showLogin = ref(true);

// ---------FUNCIONES----------//
const toggleShowLogin = (show) => {
  showLogin.value = show;
};
</script>

<style lang="css" scoped></style>
