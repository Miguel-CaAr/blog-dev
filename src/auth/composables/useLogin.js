// ---------UTILS---------//
import useRequest from "../../services/useRequest";
import { createDiscreteApi } from "naive-ui";

// ------------STORES----------//
import useLoginStore from "../stores/useLoginStore";
import useHomeStore from "../../home/stores/useHomeStore";

// ---------CONFIG---------//
const loginStore = useLoginStore();
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
const loginUser = async (data) => {
  homeStore.homeLoadingHttp = {
    loading: true,
    title: `Iniciando sesión`,
    description: `Espere por favor...`,
  };
  try {
    const response = await useRequest.login(data);
    if (response) {
      localStorage.setItem("accessToken", response.data.access);
      loginStore.userAuth.isAuth = true;
      notification.success({
        title: "Inicio de sesion exitoso",
        content: "Se ha iniciado sesion",
        duration: 3000,
      });
      getUser();
      loginStore.cleanForm();
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
    homeStore.homeLoadingHttp.loading = false;
  }
};

const getUser = async () => {
  try {
    const response = await useRequest.getUser();
    if (response) {
      localStorage.setItem("user", JSON.stringify(response.data));
      loginStore.userAuth.email = response.data.email;
      loginStore.userAuth.username = response.data.username;
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

export default {
  // Functions
  loginUser,
};
