// -----------UTILS-----------//
import { ref } from "vue";
import { defineStore } from "pinia";

export default defineStore("useHomeStore", () => {
  //----------STATES----------//
  const listOfPosts = ref([]);

  //----------FUNCTIONS-----------//
  const fillListOfPosts = (data) => {
    listOfPosts.value = data;
  };

  return {
    // States
    listOfPosts,
    // Functions
    fillListOfPosts,
  };
});
