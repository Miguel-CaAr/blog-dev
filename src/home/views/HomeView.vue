<template>
  <!-- <section class="mt-20 ml-10 flex flex-wrap gap-4">
    <template v-for="(post, index) in homeStore.listOfPosts" :key="index">
      <NCard title="" class="w-[250px] h-[350px]">
        <header>
          <NImage class="w-full" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
          <h1 class="text-lg font-bold">{{ post.title }}</h1>
        </header>
        <main>
          <p class="truncate text-sm">{{ post.content }}</p>
        </main>
      </NCard>
    </template> -->
  <!-- ? ----------CARTAS DE CARGANDO---------- -->
  <!-- <template v-if="homeStore.listOfPosts.length === 0">
      <NCard title="" class="w-[250px]">
        <header>
          <NImage class="w-full" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
          <NSkeleton class="my-5" width="50%" />
        </header>
        <main>
          <NSkeleton class="my-2" :repeat="6" />
        </main>
      </NCard>
    </template>
  </section> -->
  <section
    class="w-[75%] grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-start justify-center gap-y-10 gap-x-5 mt-20 mb-10 ml-10">

    <template v-for="(post, index) in homeStore.listOfPosts" :key="index">

      <div class="w-72 bg-white shadow-md rounded-xl duration-300 hover:scale-1 hover:shadow-xl">
        <a href="#">
          <NImage :src="'https://res.cloudinary.com/duobjlhl9/' + post.miniature" alt="Product" class="max-h-80 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105" />
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
  NCard,
  NSkeleton,
  NImage,
} from "naive-ui";

// ----------CONFIG----------//
const homeStore = useHomeStore()

// ----------FUNCTIONS----------//
onMounted(async () => {
  await Promise.all([
    useHome.getAllPosts(),
  ]);
});
</script>

<style lang="css" scoped></style>