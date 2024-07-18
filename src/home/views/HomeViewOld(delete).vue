<template>
<!-- !----------CONTENEDOR DE ARTICULOS----------- -->
<section v-if="homeStore.listOfPosts.length > 0" class="w-[75%] flex flex-wrap container-articles">
      <template v-for="(post, index) in homeStore.listOfPosts" :key="index">

        <!-- !----------CARD DEL POST----------- -->
        <div class="transition-all duration-150 flex w-full lg:max-h-[70%] sm:max-h-[90%] px-4 py-6 md:w-1/2 lg:w-1/3">
          <div
            class="flex flex-col items-stretch min-h-full pb-4 mb-6 transition-all duration-150 bg-white rounded-lg shadow-lg hover:shadow-2xl">

            <div class="md:flex-shrink-0 relative w-full">
              <span v-if="homeStore.modeEdition && loginStore.userAuth.username === post.user"
                class="absolute flex flex-col gap-2 left-2 top-2">
                <NButton @click="homeStore.updatePostModal(post)" type="info" class="rounded-full p-2"><svg
                    xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px;fill:white;" viewBox="0 0 24 24">
                    <path :d="mdiPencilOutline" />
                  </svg></NButton>
                <NButton @click="homeStore.openDeleteConfirmationModal(true, post)" type="error" class="rounded-full p-0">
                  <svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px;fill:white;" viewBox="0 0 24 24">
                    <path :d="mdiTrashCanOutline" />
                  </svg>
                </NButton>
              </span>
              <NImage :src="'https://res.cloudinary.com/duobjlhl9/' + post.miniature" alt="Blog Cover"
                class="object-cover h-full w-full rounded-lg rounded-b-none" />
            </div>

            <div class="flex items-center justify-between px-4 py-2 overflow-hidden">
              <span class="text-xs font-medium text-blue-600 uppercase">
                {{ post.category }}
              </span>
              <div class="flex flex-row items-center">
                <div class="text-xs font-medium text-gray-500 flex flex-row items-center mr-2">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z">
                    </path>
                  </svg>
                  <span>{{ countCommentsByPost(post.title) }}</span>
                </div>
              </div>
            </div>

            <hr class="border-gray-300" />

            <div class="flex flex-wrap items-center flex-1 px-4 py-1 text-center mx-auto">
              <a @click="goToPost(post.title)" class="cursor-pointer hover:underline">
                <h2 class="text-2xl md:text-xl sm:text-lg font-bold tracking-normal text-gray-800">
                  {{ post.title }}
                </h2>
              </a>
            </div>

            <hr class="border-gray-300" />

            <section class="px-4 py-2 overflow-hidden">
              <p class="text-sm text-justify text-gray-700 ellipsis">
                {{ post.content }}
              </p>
            </section>

            <hr class="border-gray-300" />

            <section class="px-4 py-2 mt-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center flex-1">
                  <img class="object-cover h-10 rounded-full"
                    src="https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-icon-eps-file-easy-to-edit-default-avatar-photo-placeholder-profile-icon-124557887.jpg"
                    alt="Avatar" />
                  <div class="flex flex-col mx-2">
                    <a @click="" class="cursor-pointer font-semibold text-gray-700 hover:underline">
                      {{ post.user }}
                    </a>
                    <span class="mx-1 text-xs text-gray-600">{{ formatDate(post.created_at) }}</span>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </template>
    </section>
    <template v-else>
      <div class="w-full flex justify-center">
        <NEmpty description="No hay publicaciones"></NEmpty>
      </div>
    </template>

    <!-- !----------SIDEBAR----------- -->
    <section class="lg:w-[25%] h-vh px-5 sidebar py-6">
      <div class="w-full h-full shadow-md rounded-xl bg-white p-5 flex flex-col gap-y-4">

        <section class="flex justify-between gap-2 flex-wrap">
          <h1 class="text-2xl font-bold">Categorias</h1>
          <NButton v-if="homeStore.listOfCategories.length > 0" :disabled="!isFilteredByCategory" size="small"
            @click="useHome.getAllPosts(), handleFilterCategory(false)">Remover filtros
          </NButton>
        </section>

        <section v-if="homeStore.listOfCategories.length > 0" class="flex flex-col gap-y-2.5 text-lg">
          <template v-for="(category, index) in  homeStore.listOfCategories " :key="index">
            <a @click="useHome.getAllPostsByCategory(category.title), handleFilterCategory(true)"
              class="cursor-pointer font-semibold text-gray-700 hover:underline">
              {{ category.title }}
            </a>
          </template>
        </section>
        <template v-else>
          <div class="h-full w-full flex justify-center">
            <NEmpty description="No hay categorias"></NEmpty>
          </div>
        </template>

      </div>
    </section>

    <Spinner :loading="homeStore.homeLoadingHttp.loading" :title="homeStore.homeLoadingHttp.title"
      :description="homeStore.homeLoadingHttp.description" />
    <CreatePostModal />
    <DeleteConfirmationModal />
</template>

<script setup>
// -----------UTILS-----------//
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { formatDate } from "../../global/utils/formatDate.js";

// -----------COMPOSABLES-----------//
import useHome from "../composables/useHome.js";

// -----------STORES-----------//
import useHomeStore from "../stores/useHomeStore.js";
import useLoginStore from "../../auth/stores/useLoginStore.js";

// -----------COMPONENTS----------//
import {
  NEmpty,
  NImage,
  NButton,
} from "naive-ui";
import Spinner from '../../global/components/Spinner.vue';
import CreatePostModal from '../components/CreatePostModal.vue';
import DeleteConfirmationModal from '../components/DeleteConfirmation.vue';
import { mdiPencilOutline, mdiTrashCanOutline } from '@mdi/js';

// ----------CONFIG----------//
const homeStore = useHomeStore();
const loginStore = useLoginStore();
const router = useRouter();

// ----------STATES AND VARIABLES----------//
const isFilteredByCategory = ref(false);

// ----------FUNCTIONS----------//
const handleFilterCategory = (param) => {
  isFilteredByCategory.value = param;
}

const goToPost = (slug) => {
  router.push({ path: '/post', query: { slug } });
};

const countCommentsByPost = (_post) => {
  const comments = homeStore.listComments.filter(comment => comment.post === _post);
  if (comments) return comments.length;
  return []
}

onMounted(async () => {
  await Promise.all([
    useHome.getAllCategories(),
    useHome.getAllPosts(),
    useHome.getComments(),
  ]);
});
</script>

<style lang="css" scoped>
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  /* Cambia esto según el número de líneas que se desee mostrar */
  -webkit-box-orient: vertical;
  height: calc(1.5em * 5);
  /* Ajusta la altura basada en el número de líneas y el tamaño de la fuente */
}

@media (width < 1126px) {
  .container-main {
    display: flex;
    flex-direction: column;
    margin-right: 2.5rem
  }

  .container-articles {
    width: 100%;
  }

  .sidebar {
    width: 100%;
  }
}
</style>