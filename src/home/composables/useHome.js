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
/**
 * !Hacer .env
 */
// Configuración de Cloudinary
const cloudName = "duobjlhl9"; // Reemplaza con tu cloud name
const uploadPreset = "ml_default"; // Reemplaza con tu upload preset

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
    //Se sube la imagen al cloud y se obtiene la url
    const miniature = await uploadImage(data.miniature);
    const payload = {
      title: data.title,
      category: data.category,
      content: data.content,
      miniature: miniature,
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
    homeStore.listOfPosts.unshift(response.data);
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
    homeStore.openCreatePostModal(false);
  }
};

// Función para subir la imagen a Cloudinary
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Error al subir la imagen a Cloudinary");
    }

    const data = await response.json();

    //Se corta la url para retornar unicamente el identificador de la imagen
    const imageId = data.url.split(
      "http://res.cloudinary.com/duobjlhl9/image/upload/"
    )[1];

    return imageId;
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
