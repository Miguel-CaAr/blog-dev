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
    homeStore.homeLoadingHttp = {
      loading: true,
      title: "Cargando publicaciones",
      description: "Espere por favor, las publicaciones estan cargando...",
    };
    const response = await useRequest.getPosts();
    if (response.data) {
      homeStore.fillListOfPosts(response.data);
    }
  } catch (error) {
    if (error) {
      console.error("💩 ~ getAllPosts ~ error:", error);
    }
  } finally {
    homeStore.homeLoadingHttp.loading = false;
  }
};

const getAllPostsByCategory = async (category) => {
  try {
    homeStore.homeLoadingHttp = {
      loading: true,
      title: `Cargando publicaciones de ${category}`,
      description: `Espere por favor, las publicaciones de ${category} estan cargando...`,
    };
    const response = await useRequest.getPostByCategory(category);
    if (response.data) {
      homeStore.fillListOfPosts(response.data);
    }
  } catch (error) {
    if (error) {
      console.error("💩 ~ getAllPosts ~ error:", error);
    }
  } finally {
    homeStore.homeLoadingHttp.loading = false;
  }
};

const getAllCategories = async () => {
  try {
    homeStore.homeLoadingHttp = {
      loading: true,
      title: "Cargando categorias",
      description: "Espere por favor, las categorias estan cargando...",
    };
    const response = await useRequest.getCategories();
    if (response.data) {
      homeStore.fillListOfCategories(response.data);
    }
  } catch (error) {
    if (error) {
      console.log("💩 ~ getAllCategories ~ error:", error);
    }
  } finally {
    homeStore.homeLoadingHttp.loading = false;
  }
};

export default {
  getAllPosts,
  getAllPostsByCategory,
  getAllCategories,
};
