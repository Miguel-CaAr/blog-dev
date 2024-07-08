<template>
    <main class="flex mt-10 ml-10 md:mr-10">
        <Login @on:toggleShowLogin="toggleShowLogin" v-if="showLogin" />
        <Register @on:toggleShowLogin="toggleShowLogin" v-if="!showLogin" />
    </main>
</template>

<script setup>
// ---------UTILS----------//
import { ref } from 'vue';

// ---------COMPONENTS----------//
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';

// ---------CONFIG----------//

// ---------STATES AND VARIABLES----------//
const showLogin = ref(true);

// ---------FUNCIONES----------//
const toggleShowLogin = (show) => {
    showLogin.value = show;
}
</script>

<style lang="css" scoped></style>