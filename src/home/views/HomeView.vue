<template>
  <main class="flex flex-col h-[89vh]">
    <!-- ! ----------HEADER--------- -->
    <!-- <header class="w-full container mx-auto">
      <div class="flex flex-col items-center py-7">
        <a class="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl">
          MI-Blog
        </a>
        <p class="text-lg text-gray-600">
          Descubre, Imagina, Comparte: Pensamientos sin Límites
        </p>
      </div>
    </header> -->

    <!-- ! ------------CATEGORIES------------ -->
    <nav class="w-full py-1 border-t border-b bg-gray-100" x-data="{ open: false }">
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
    <div class="container mx-auto flex flex-wrap py-6 overflow-auto">

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
                <NButton @click="homeStore.openDeleteConfirmationModal(true, post)" type="error"
                  class="rounded-full p-0">
                  <svg xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px;fill:white;"
                    viewBox="0 0 24 24">
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
              <a @click="goToPost(post.title)"
                class="pt-2 cursor-pointer uppercase text-gray-800 hover:text-black">Continuar
                leyendo <i class="fas fa-arrow-right"></i></a>
            </div>
          </article>
        </template>

        <!-- !----------Pagination------------ -->
        <div v-if="homeStore.listOfPosts.length > 0" class="flex items-center py-8">
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
      <aside class="w-full md:w-1/3 flex flex-col items-center px-3 relative">
        <div class="w-full sticky top-0">
          <div class="w-full bg-white shadow flex flex-col my-4 p-6">
            <p class="text-xl font-semibold pb-5">Linkedin</p>
            <a href="https://www.linkedin.com/in/miguel-castro-1b99502b8/"
              class="cursor-pointer group flex justify-center items-center gap-2 group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-neutral-900 duration-500 hover:duration-500 underline underline-offset-2 hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-neutral-300 relative bg-sky-700 px-10 py-4 border text-left p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden after:absolute after:z-10 after:w-12 after:h-12 after:content[''] after:bg-sky-900 after:-left-8 after:top-8 after:rounded-full after:blur-lg hover:after:animate-pulse">
              <svg class="w-6 h-6 fill-neutral-50" height="100" preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 100 100" width="100" x="0" xmlns="http://www.w3.org/2000/svg" y="0">
                <path
                  d="M92.86,0H7.12A7.17,7.17,0,0,0,0,7.21V92.79A7.17,7.17,0,0,0,7.12,100H92.86A7.19,7.19,0,0,0,100,92.79V7.21A7.19,7.19,0,0,0,92.86,0ZM30.22,85.71H15.4V38H30.25V85.71ZM22.81,31.47a8.59,8.59,0,1,1,8.6-8.59A8.6,8.6,0,0,1,22.81,31.47Zm63,54.24H71V62.5c0-5.54-.11-12.66-7.7-12.66s-8.91,6-8.91,12.26V85.71H39.53V38H53.75v6.52H54c2-3.75,6.83-7.7,14-7.7,15,0,17.79,9.89,17.79,22.74Z">
                </path>
              </svg>
              Ir a Miguel Castro
            </a>
          </div>

          <div class="w-full bg-white shadow flex flex-col my-4 p-6">
            <p class="text-xl font-semibold pb-5">Github</p>
            <!-- Button github -->
            <a href="https://github.com/Miguel-CaAr"
              class="cursor-pointer group flex justify-center items-center gap-2 group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-neutral-900 duration-500 hover:duration-500 underline underline-offset-2 hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-neutral-300 relative bg-neutral-900 px-10 py-4 border text-left p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden after:absolute after:z-10 after:w-12 after:h-12 after:content[''] after:bg-sky-900 after:-left-8 after:top-8 after:rounded-full after:blur-lg hover:after:animate-pulse">
              <svg class="w-6 h-6 fill-neutral-50" height="100" preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 100 100" width="100" x="0" xmlns="http://www.w3.org/2000/svg" y="0">
                <path class="svg-fill-primary"
                  d="M50,1.23A50,50,0,0,0,34.2,98.68c2.5.46,3.41-1.09,3.41-2.41s0-4.33-.07-8.5c-13.91,3-16.84-6.71-16.84-6.71-2.28-5.77-5.55-7.31-5.55-7.31-4.54-3.1.34-3,.34-3,5,.35,7.66,5.15,7.66,5.15C27.61,83.5,34.85,81.3,37.7,80a10.72,10.72,0,0,1,3.17-6.69C29.77,72.07,18.1,67.78,18.1,48.62A19.34,19.34,0,0,1,23.25,35.2c-.52-1.26-2.23-6.34.49-13.23,0,0,4.19-1.34,13.75,5.13a47.18,47.18,0,0,1,25,0C72.07,20.63,76.26,22,76.26,22c2.72,6.89,1,12,.49,13.23a19.28,19.28,0,0,1,5.14,13.42c0,19.21-11.69,23.44-22.83,24.67,1.8,1.55,3.4,4.6,3.4,9.26,0,6.69-.06,12.08-.06,13.72,0,1.34.9,2.89,3.44,2.4A50,50,0,0,0,50,1.23Z">
                </path>
              </svg>
              Ir a Miguel-CaAr
            </a>

          </div>
        </div>
      </aside>

    </div>
  </main>
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