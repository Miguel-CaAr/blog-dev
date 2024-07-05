<template>
  <main class="flex mt-20 mb-10 ml-10">
    <section class="w-[75%] grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 
      justify-items-start justify-center gap-y-10 gap-x-5">

      <template v-for="(post, index) in homeStore.listOfPosts" :key="index">
        <div class="w-72 bg-white shadow-md rounded-xl duration-300 hover:scale-1 hover:shadow-2xl">
          <a href="#">
            <NImage :src="'https://res.cloudinary.com/duobjlhl9/' + post.miniature" alt="Product"
              class="max-h-80 rounded-t-lg w-full object-cover" />
            <div class="px-4 py-3 w-72">
              <span class="text-gray-400 mr-3 uppercase text-xs">{{ post.user }}</span>
              <span class="text-gray-400 mr-3 uppercase text-xs">{{ formatDate(post.created_at) }}</span>
              <p class="text-lg font-bold text-black truncate block capitalize">{{ post.title }}</p>
              <p class="text-sm text-black h-16 overflow-hidden max-h-[4.5em]">{{ post.content }}</p>
            </div>
          </a>
        </div>
      </template>

    </section>

    <section class="w-[25%] h-vh px-5">

      <div class="w-full h-full shadow-md rounded-xl bg-white p-5 flex flex-col gap-y-4">
        <header class="flex justify-start">
          <h1 class="text-2xl font-bold">Categorias</h1>
        </header>
        <article class="flex flex-col gap-y-2.5 text-lg">
          <template v-for="(category, index) in homeStore.listOfCategories" :key="index">
            <h1>{{ category.title }}</h1>
          </template>
        </article>
      </div>

    </section>
  </main>
</template>

<script setup>
// -----------UTILS-----------//
import { onMounted } from 'vue';
import { formatDate } from "../../global/utils/formatDate.js"

// -----------COMPOSABLES-----------//
import useHome from "../composables/useHome.js";

// -----------STORES-----------//
import useHomeStore from "../stores/useHomeStore.js";

// -----------COMPONENTS----------//
import {
  NSkeleton,
  NImage,
} from "naive-ui";

// ----------CONFIG----------//
const homeStore = useHomeStore()

// ----------FUNCTIONS----------//
onMounted(async () => {
  await Promise.all([
    useHome.getAllPosts(),
    useHome.getAllCategories(),
  ]);
});
</script>

<style lang="css" scoped></style>