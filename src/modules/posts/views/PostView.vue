<template>
  <main v-if="!postStore.postLoadingHttp.loading" class="flex mt-20 mb-10 ml-10 mr-10 min-h-screen container-main">
    <div class="max-w-screen-lg mx-auto">

      <main class="mt-10">

        <div class="mb-4 md:mb-0 w-full mx-auto relative">
          <div class="px-4 lg:px-0">
            <h2 class="text-4xl font-semibold text-gray-800 leading-tight">
              {{ postStore?.post?.title }}
            </h2>
            <div class="py-2 text-green-700 flex items-center justify-between mb-2 w-full">
              <p>{{ postStore?.post?.user }}</p>
              <p>{{ formatDate(postStore?.post?.created_at) }}</p>
            </div>
          </div>
          <div class="w-full">
            <img :src="'https://res.cloudinary.com/duobjlhl9/' + postStore?.post?.miniature" alt="post image"
              class="w-full object-cover lg:rounded" style="height: 28em;" />
          </div>
        </div>

        <div class="flex flex-col lg:flex-row lg:space-x-12">

          <div class="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
            {{ postStore?.post?.content }}
          </div>

          <section class="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm flex flex-col gap-2 max-h-lvh overflow-auto">
            <h1 class="text-2xl font-bold sticky top-0 bg-white">Comentarios</h1>
            <section v-if="loginStore.userAuth.isAuth">
              <NInputGroup>
                <NInput v-model:value="postStore.comment" placeholder="Comentario" />
                <NButton @click="usePost.createComment(postStore.comment)">Enviar</NButton>
              </NInputGroup>
            </section>
            <template v-for="(comment, index) in postStore?.commentsByPost" :key="index">

              <div class="p-4 border-t border-b md:border md:rounded">
                <div class="flex py-2">
                  <img
                    src="https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-icon-eps-file-easy-to-edit-default-avatar-photo-placeholder-profile-icon-124557887.jpg"
                    class="h-10 w-10 rounded-full mr-2 object-cover" />
                  <div>
                    <p class="font-semibold text-gray-700 text-sm"> {{ comment?.user }} </p>
                    <p class="font-semibold text-gray-600 text-xs"> {{ formatDate(comment.created_at) }} </p>
                  </div>
                </div>
                <p class="text-gray-700 py-3">
                  {{ comment?.content }}
                </p>
              </div>

            </template>
          </section>
        </div>
      </main>
      <!-- main ends here -->
    </div>
  </main>
  <Spinner :loading="postStore.postLoadingHttp.loading" :title="postStore.postLoadingHttp.title"
    :description="postStore.postLoadingHttp.description" />
</template>

<script setup>
// ---------UTILS----------//
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { formatDate } from "../../../global/utils/formatDate.js";

// ---------COMPOSABLES-----------//
import usePost from "../composables/usePost.js";

// ---------STORES-----------//
import usePostStore from "../stores/usePostStore.js";
import useLoginStore from '../../../auth/stores/useLoginStore.js'

// ---------COMPONENTS-----------//
import Spinner from '../../../global/components/Spinner.vue'
import {
  NInputGroup,
  NInput,
  NButton,
} from 'naive-ui'

// ---------CONFIG-----------//
const router = useRoute();
const postStore = usePostStore();
const loginStore = useLoginStore();

// ---------STATES AND VARIABLES-----------//
const postSlug = router.query.slug; //Slug obtenido de la ruta

// ---------FUNCTIONS----------//
onMounted(async () => {
  await Promise.all([
    usePost.getPostBySlug(postSlug),
    usePost.getCommentsByPost(postSlug),
  ]);
});
</script>

<style lang="css" scoped></style>