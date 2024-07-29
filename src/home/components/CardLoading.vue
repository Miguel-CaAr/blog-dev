<template>
  <article class="flex flex-col shadow my-4 w-full">
    <div class="">
      <NSkeleton width="100%" height="460px" />
    </div>
    <div class="bg-white flex flex-col justify-start p-6">
      <div class="flex justify-between">
        <a class="text-blue-700 text-sm font-bold uppercase pb-4">
          <NSkeleton width="100px" />
        </a>
        <div class="text-xs font-medium text-gray-500 flex flex-row items-center mr-2">
          <NSkeleton width="1rem" height="1rem" rounded />
        </div>
      </div>
      <!-- TITLE -->
      <a class="cursor-pointer text-3xl font-bold hover:text-gray-700 pb-4"></a>
      <p class="text-sm pb-3">
        <a class="font-semibold hover:text-gray-800">
          <NSkeleton :repeat="2" />
        </a>
      </p>
      <p class="text-sm pb-3">
        <NSkeleton width="100px" />
      </p>
      <a class="pb-6 ellipsis flex flex-col gap-2">
        <NSkeleton :repeat="4" />
      </a>
    </div>
  </article>
</template>

<script setup>
import {
  NSkeleton
} from "naive-ui";
</script>

<style lang="css" scoped></style>