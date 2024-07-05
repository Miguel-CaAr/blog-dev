<template>
    <header>
        <nav class="
          flex flex-wrap items-center justify-between
          w-full
          py-4 md:py-0 px-4
          text-lg text-gray-700
          bg-black
          fixed top-0 left-0
          z-10 ">
            <section class="flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px;fill:white;" viewBox="0 0 24 24">
                    <path :d="mdiNewspaper" />
                </svg>
                <span className="text-white text-lg font-bold">Blog</span>
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
              md:pt-0">
                    <li>
                        <a class="md:p-4 py-2 block hover:text-purple-400" href="#">Categoria</a>
                    </li>
                    <li>
                        <a class="md:p-4 py-2 block hover:text-purple-400" href="#">Categoria</a>
                    </li>
                    <li>
                        <a class="md:p-4 py-2 block hover:text-purple-400" href="#">Categoria</a>
                    </li>
                    <li>
                        <a class="md:p-4 py-2 block hover:text-purple-400" href="#">Categoria</a>
                    </li>
                    <li>
                        <a class="md:p-4 py-2 block hover:text-purple-400 text-purple-500" href="#">Iniciar sesion</a>
                    </li>
                </ul>
            </section>
        </nav>
    </header>
</template>

<script setup>
// -----------UTILS---------//
import { ref } from "vue";

// -----------COMPONENTS---------//
import { mdiNewspaper } from "@mdi/js"

// ---------FUNCIONES---------//
const menu = ref(null);


const hiddenMenu = () => {
    menu.value.classList.toggle('hidden');
};

</script>

<style lang="css" scoped></style>