// ---------UTILS---------//
import useRequest from "../../services/useRequest";
import { createDiscreteApi } from "naive-ui";

// ------------STORES----------//
import useLoginStore from "../stores/useLoginStore";

// ---------CONFIG---------//
const loginStore = useLoginStore();
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
  }
};

export default {
  // Functions
  loginUser,
};
