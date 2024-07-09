// -----------UTILS-----------//
import { ref } from "vue";
import { defineStore } from "pinia";

export default defineStore("useHomeStore", () => {
  //----------STATES----------//
  const listOfPosts = ref([]);
  const listOfCategories = ref([]);
  const modeEdition = ref(false);
  const createPostModal = ref(false);
  const deleteConfirmationModal = ref({
    show: false,
    post: null,
  });
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
    modeEdition.value = false;
  };

  const openDeleteConfirmationModal = (show = true, post = []) => {
    deleteConfirmationModal.value = {
      show: show,
      post: post,
    };
  };

  const updatePostModal = (data) => {
    const category = listOfCategories.value.find(
      (_category) => _category.title === data.category
    );
    createPostModal.value = true;
    createPostForm.value = {
      title: data.title,
      content: data.content,
      miniature: data.miniature,
      published: data.published,
      category: category.id,
      slug: data.slug,
    };
  };

  const clearFormCreatePostModal = () => {
    createPostForm.value = {
      title: null,
      content: null,
      miniature: null,
      published: true,
      category: null,
      slug: null,
    };
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
    deleteConfirmationModal,
    // Functions
    fillListOfPosts,
    fillListOfCategories,
    openCreatePostModal,
    openDeleteConfirmationModal,
    toggleModeEdition,
    clearFormCreatePostModal,
    updatePostModal,
  };
});
