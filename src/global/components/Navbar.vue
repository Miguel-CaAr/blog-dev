<template>
    <nav class="flex bg-black justify-between px-5">
        <section class="w-full h-[50px] flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px;fill:white;" viewBox="0 0 24 24">
                <path :d="mdiNewspaper" />
            </svg>
            <span className="text-white text-lg font-bold">Blog</span>
        </section>
        <section class="w-full h-[50px] flex justify-end items-center gap-5">
            <a href="#" class="text-white hover:underline">
                Categoria
            </a>
            <a href="#" class="text-white hover:underline">
                Categoria
            </a>
            <a href="#" class="text-white hover:underline">
                Categoria
            </a>
            <a href="#" class="text-white hover:underline">
                Categoria
            </a>
            <a href="#" class="text-white hover:underline">
                Categoria
            </a>
        </section>
    </nav>
</template>

<script setup>
import { mdiNewspaper } from "@mdi/js"

</script>

<style lang="css" scoped></style>