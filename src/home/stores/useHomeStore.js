// -----------UTILS-----------//
import { ref } from "vue";
import { defineStore } from "pinia";

export default defineStore("useHomeStore", () => {
  //----------STATES----------//
  const listOfPosts = ref([]);
  const listOfCategories = ref([]);
  const createPostModal = ref(false);
  const modeEdition = ref(false);
  const homeLoadingHttp = ref({
    loading: false,
    title: "",
    description: "",
  });
  const createPostForm = ref({
    title: null,
    content: null,
    miniature: null,
    published: true,
    category: null,
    slug: null,
  });

  //----------FUNCTIONS-----------//
  const fillListOfPosts = (data) => {
    listOfPosts.value = data;
  };

  const fillListOfCategories = (data) => {
    listOfCategories.value = data;
  };

  const openCreatePostModal = (show = true) => {
    createPostModal.value = show;
  };

  const toggleModeEdition = (toggle = true) => {
    modeEdition.value = toggle;
  };

  return {
    // States
    listOfPosts,
    listOfCategories,
    homeLoadingHttp,
    createPostModal,
    createPostForm,
    modeEdition,
    // Functions
    fillListOfPosts,
    fillListOfCategories,
    openCreatePostModal,
    toggleModeEdition
  };
});
