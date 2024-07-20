<template>
    <header>
        <nav class="
          flex flex-wrap items-center justify-between
          w-full
          py-4 md:py-0 px-4
          bg-blue-800
          z-10
          shadow">
            <section class="flex gap-3 cursor-pointer" @click="goHomePage">
                <svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px;fill:white;" viewBox="0 0 24 24">
                    <path :d="mdiNewspaper" />
                </svg>
                <span className="text-white text-2xl font-bold">MI-Blog</span>
            </section>

            <svg @click="hiddenMenu" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer md:hidden block"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>

            <section ref="menu" class="hidden w-full md:flex md:items-center md:w-auto">
                <ul class="
              pt-4
              text-base text-white
              md:flex
              md:justify-between
              md:pt-0
              gap-3">
                    <li class="flex md:my-3 my-2 justify-center items-center gap-2">
                        <NButton @click="homeStore.toggleModeEdition(!homeStore.modeEdition)"
                            v-if="loginStore.userAuth.isAuth" :type="homeStore.modeEdition ? 'warning' : 'info'"
                            class="md:p-4 justify-center w-full">
                            {{ homeStore.modeEdition ? 'Desactivar modo edicion' : 'Activar modo edicion' }}
                        </NButton>
                    </li>
                    <li class="flex md:my-3 my-2 justify-center items-center gap-2">
                        <NButton v-if="!loginStore.userAuth.isAuth" @click="goAuthPage" color="#ffffff"
                            class="login-button md:p-4 text-black flex justify-center w-full">
                            Iniciar sesion
                        </NButton>
                        <template v-else>
                            <div class="flex gap-3 w-full">
                                <NButton @click="homeStore.openCreatePostModal()" type="success"
                                    class="md:p-4 flex justify-center w-1/2">
                                    Crear publicacion
                                </NButton>
                                <NButton @click="loginStore.logout();" type="error"
                                    class="md:p-4 flex justify-center w-1/2">
                                    Cerrar sesion
                                </NButton>
                            </div>
                        </template>
                    </li>
                </ul>
            </section>
        </nav>
    </header>
</template>

<script setup>
// -----------UTILS---------//
import { ref } from "vue";
import { useRouter } from "vue-router";

// -----------COMPONENTS---------//
import { mdiNewspaper } from "@mdi/js"
import {
    NButton,
} from "naive-ui"

// -----------STORES---------//
import useLoginStore from '../../auth/stores/useLoginStore.js'
import useHomeStore from '../../home/stores/useHomeStore.js'

// ---------CONFIG---------//
const loginStore = useLoginStore();
const homeStore = useHomeStore();
const router = useRouter();

// ---------STATES AND VARIABLES---------//
const menu = ref(null);

// ---------FUNCTIONS---------//
const hiddenMenu = () => {
    menu.value.classList.toggle('hidden');
};

const goHomePage = () => {
    router.push("/");
};

const goAuthPage = () => {
    router.push("/auth");
};

</script>

<style lang="css" scoped>
.login-button:hover {
    color: black;
}

.login-button:active {
    color: black;
}

.login-button:focus {
    color: black;
}
</style>