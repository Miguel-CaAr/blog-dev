// ------------UTILS----------//
import { computed } from "vue";
import useRequest from "../../services/useRequest";
import { createDiscreteApi } from "naive-ui";

// ------------STORES----------//
import useHomeStore from "../stores/useHomeStore";

// ------------CONFIG----------//
const homeStore = useHomeStore();
const { notification, message } = createDiscreteApi(
  ["notification", "message"],
  {
    notificationProviderProps: {
      max: 10,
      keepAliveOnHover: true,
    },
    messageProviderProps: {
      max: 10,
      keepAliveOnHover: true,
    },
  }
);
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
      console.error("🚀 ~ file: useHome.js:25 ~ getAllPosts ~ error:", error);
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
      console.error(
        "🚀 ~ file: useHome.js:45 ~ getAllPostsByCategory ~ error:",
        error
      );
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
      console.error(
        "🚀 ~ file: useHome.js:65 ~ getAllCategories ~ error:",
        error
      );
    }
  } finally {
    homeStore.homeLoadingHttp.loading = false;
  }
};

const OPCIONES_CATEGORIES = computed(() => {
  return homeStore.listOfCategories.map((_category) => {
    return {
      label: _category.title,
      value: _category.id,
      datosCompletos: _category,
    };
  });
});

const createPost = async (data) => {
  try {
    const payload = {
      title: data.title,
      category: data.category,
      content: data.content,
      miniature: data.miniature,
      published: data.published,
      slug: generateSlug(data.title),
    };
    const response = await useRequest.postPost(payload);
    if (response) {
      notification.success({
        title: "Creacion exitosa",
        content: "La publicacion ha sido creada",
        duration: 3000,
      });
    }
  } catch (error) {
    if (error) {
      notification.error({
        title: error.name,
        content: error.message,
        type: error.type,
        description: error.naiveDesc,
        duration: error.naiveDuration,
      });
    }
  } finally {
  }
};

const generateSlug = (title) => {
  // Convertir a minúsculas
  let slug = title.toLowerCase();

  // Normalizar y eliminar caracteres especiales
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Reemplazar espacios por guiones
  slug = slug.replace(/\s+/g, "-");

  // Reemplazar cualquier caracter que no sea alfanumérico o guión por nada
  slug = slug.replace(/[^\w-]+/g, "");

  // Eliminar guiones dobles o más y guiones al principio o final
  slug = slug.replace(/--+/g, "-").replace(/^-+|-+$/g, "");

  return slug;
};

export default {
  getAllPosts,
  getAllPostsByCategory,
  getAllCategories,
  OPCIONES_CATEGORIES,
  createPost,
};
