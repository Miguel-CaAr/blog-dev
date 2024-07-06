// ------------UTILS----------//
import { ref } from "vue";
import useRequest from "../../services/useRequest";

// ------------STORES----------//
import useHomeStore from "../stores/useHomeStore";

// ------------CONFIG----------//
const homeStore = useHomeStore();

// ----------FUNCTIONS----------//
const getAllPosts = async () => {
  try {
    const response = await useRequest.getPosts();
    if (response.data) {
      homeStore.fillListOfPosts(response.data);
    }
  } catch (error) {
    if (error) {
      console.error("💩 ~ getAllPosts ~ error:", error);
    }
  }
};

const getAllPostsByCategory = async (category) => {
  try {
    const response = await useRequest.getPostByCategory(category);
    if (response.data) {
      homeStore.fillListOfPosts(response.data);
    }
  } catch (error) {
    if (error) {
      console.error("💩 ~ getAllPosts ~ error:", error);
    }
  }
};

const getAllCategories = async () => {
  try {
    const response = await useRequest.getCategories();
    if (response.data) {
      homeStore.fillListOfCategories(response.data);
    }
  } catch (error) {
    if (error) {
      console.log("💩 ~ getAllCategories ~ error:", error);
    }
  }
};

export default {
  getAllPosts,
  getAllPostsByCategory,
  getAllCategories,
};
