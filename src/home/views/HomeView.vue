<template>
  <section class="p-5">
    <template v-for="(post, index) in homeStore.listOfPosts" :key="index">
      <NCard title="" class=" w-[250px]">
        <header>
          <NImage class="w-full" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
          <h1 class="text-lg font-bold">{{ post.title }}</h1>
        </header>
        <main>
          <p class="text-sm">{{ post.content }}</p>
        </main>
      </NCard>
    </template>
    <template v-if="homeStore.listOfPosts.length === 0">
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
  </section>
</template>

<script setup>
// -----------UTILS-----------//
import { onMounted } from 'vue';

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