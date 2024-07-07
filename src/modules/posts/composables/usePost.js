// ------------UTILS----------//
import { ref } from "vue";
import useRequest from "../../../services/useRequest.js";

// ------------STORES----------//
import usePostStore from "../stores/usePostStore.js";

// ------------CONFIG----------//
const postStore = usePostStore();

// ----------FUNCTIONS----------//
const getPostBySlug = async (slug) => {
  try {
    postStore.postLoadingHttp = {
      loading: true,
      title: `Cargando publicacion ${slug}`,
      description: `Espere por favor, la publicacion ${slug} estan cargando...`,
    };
    const response = await useRequest.getPostBySlug(slug);
    if (response.data) {
      postStore.fillPost(response.data);
    }
  } catch (error) {
    if (error) {
      console.error("🚀 ~ file: usePost.js:25 ~ getPostBySlug ~ error:", error);
    }
  } finally {
    postStore.postLoadingHttp.loading = false;
  }
};

const getCommentsByPost = async (slug) => {
  try {
    postStore.postLoadingHttp = {
      loading: true,
      title: `Cargando comentarios de ${slug}`,
      description: `Espere por favor, los comentarios de ${slug} estan cargando...`,
    };
    const response = await useRequest.getCommentsByPost(slug);
    if (response.data) {
      postStore.fillCommentsByPost(response.data);
    }
  } catch (error) {
    if (error) {
      console.error(
        "🚀 ~ file: usePost.js:45 ~ getCommentsByPost ~ error:",
        error
      );
    }
  } finally {
    postStore.postLoadingHttp.loading = false;
  }
};

export default {
  getPostBySlug,
  getCommentsByPost,
};
