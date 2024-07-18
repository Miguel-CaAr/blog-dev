<template>
  <!-- ! ----------HEADER--------- -->
  <header class="w-full container mx-auto">
    <div class="flex flex-col items-center py-12">
      <a class="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl">
        Blog
      </a>
      <p class="text-lg text-gray-600">
        Hola soy un blog
      </p>
    </div>
  </header>

  <!-- ! ------------CATEGORIES------------ -->
  <nav class="w-full py-4 border-t border-b bg-gray-100" x-data="{ open: false }">
    <div class="block sm:hidden">
      <a class="md:hidden text-base font-bold uppercase text-center flex justify-center items-center"
        @click="open = !open">
        Categorias <i :class="open ? 'fa-chevron-down' : 'fa-chevron-up'" class="fas ml-2"></i>
      </a>
    </div>
    <div :class="open ? 'block' : 'hidden'" class="w-full flex-grow sm:flex sm:items-center sm:w-auto">
      <div
        class="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
        <template v-for="(category, index) in  homeStore.listOfCategories " :key="index">
          <a @click="useHome.getAllPostsByCategory(category.title), handleFilterCategory(true)" class=" cursor-pointer hover:bg-gray-400
            rounded py-2 px-4 mx-2">{{ category.title }}</a>
        </template>
      </div>
    </div>
  </nav>

  <!-- ! ------------POST SECTION----------- -->
  <div class="container mx-auto flex flex-wrap py-6">

    <!-- Posts Section -->
    <section class="w-full md:w-2/3 flex flex-col items-center px-3">
      <section class="w-full flex justify-end">
        <NButton v-if="homeStore.listOfCategories.length > 0" :disabled="!isFilteredByCategory" size="small"
          @click="useHome.getAllPosts(), handleFilterCategory(false)">Remover filtros
        </NButton>
      </section>

      <template v-for="(post, index) in homeStore.listOfPosts" :key="index">
        <article class="flex flex-col shadow my-4">
          <a class="relative hover:opacity-75">
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
            <NImage :src="'https://res.cloudinary.com/duobjlhl9/' + post.miniature" alt="Blog Cover" class="" />
          </a>
          <div class="bg-white flex flex-col justify-start p-6">
            <div class="flex justify-between">
              <a class="text-blue-700 text-sm font-bold uppercase pb-4">{{ post.category }}</a>
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
            <!-- TITLE -->
            <a @click="goToPost(post.slug)" class="cursor-pointer text-3xl font-bold hover:text-gray-700 pb-4">{{
              post.title }}</a>
            <p class="text-sm pb-3">
              Por <a class="font-semibold hover:text-gray-800">{{ post.user }}</a>, {{ formatDate(post.created_at)
              }}
            </p>
            <a class="pb-6 ellipsis">{{ post.content }}</a>
            <a @click="goToPost(post.title)" class="pt-2 cursor-pointer uppercase text-gray-800 hover:text-black">Continuar
              leyendo <i class="fas fa-arrow-right"></i></a>
          </div>
        </article>
      </template>

      <!-- !----------Pagination------------ -->
      <div class="flex items-center py-8">
        <a
          class="h-10 w-10 bg-blue-800 hover:bg-blue-600 font-semibold text-white text-sm flex items-center justify-center">1</a>
        <a
          class="h-10 w-10 font-semibold text-gray-800 hover:bg-blue-600 hover:text-white text-sm flex items-center justify-center">2</a>
        <a
          class="h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center ml-3">Next
          <i class="fas fa-arrow-right ml-2"></i></a>
      </div>

    </section>

    <!-- ! -----------Sidebar Section---------- -->
    <aside class="w-full md:w-1/3 flex flex-col items-center px-3">

      <div class="w-full bg-white shadow flex flex-col my-4 p-6">
        <p class="text-xl font-semibold pb-5">Lorem ipsum</p>
        <p class="pb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mattis est eu odio sagittis
          tristique. Vestibulum ut finibus leo. In hac habitasse platea dictumst.</p>
        <a
          class="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4">
          Get to know us
        </a>
      </div>

      <div class="w-full bg-white shadow flex flex-col my-4 p-6">
        <p class="text-xl font-semibold pb-5">Instagram</p>
        <div class="grid grid-cols-3 gap-3">
          <img class="hover:opacity-75" src="https://source.unsplash.com/collection/1346951/150x150?sig=1">
        </div>
        <a
          class="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-6">
          <i class="fab fa-instagram mr-2"></i> Follow @Lorem
        </a>
      </div>

    </aside>

  </div>
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
const open = ref(false);

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