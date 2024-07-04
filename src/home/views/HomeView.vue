<template>
  <section class="p-5">
    <NCard title="" class="w-[250px]">
      <header>
        <NImage class="w-full" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"/>
        <NSkeleton class="my-5" width="50%" />
      </header>
      <main>
        <NSkeleton class="my-2" :repeat="6" />
      </main>
    </NCard>
  </section>
</template>

<script setup>
// -----------COMPONENTS----------//
import {
  NCard,
  NSkeleton,
  NImage,
} from "naive-ui";
</script>

<style lang="css" scoped></style>