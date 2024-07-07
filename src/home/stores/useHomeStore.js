// -----------UTILS-----------//
import { ref } from "vue";
import { defineStore } from "pinia";

export default defineStore("useHomeStore", () => {
  //----------STATES----------//
  const listOfPosts = ref([]);
  const listOfCategories = ref([]);
  const homeLoadingHttp = ref({
    loading: false,
    title: "",
    description: "",
  });

  //----------FUNCTIONS-----------//
  const fillListOfPosts = (data) => {
    listOfPosts.value = data;
  };

  const fillListOfCategories = (data) => {
    listOfCategories.value = data;
  };

  return {
    // States
    listOfPosts,
    listOfCategories,
    homeLoadingHttp,
    // Functions
    fillListOfPosts,
    fillListOfCategories,
  };
});
