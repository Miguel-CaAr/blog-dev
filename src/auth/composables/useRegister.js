// ---------UTILS---------//
import useRequest from "../../services/useRequest";
import { createDiscreteApi } from "naive-ui";

// ------------STORES----------//
import useRegisterStore from "../stores/useRegisterStore";

// ---------CONFIG---------//
const registerStore = useRegisterStore();
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
const registerUser = async (data) => {
  try {
    const response = await useRequest.register(data);
    if (response.data) {
      notification.success({
        title: "Usuario registrado exitosamente",
        content: "Se ha registrado el usuario, inicie sesion por favor",
        duration: 3000,
      });
      registerStore.cleanForm();
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
      console.log(
        "🚀 ~ file: useRegister.js:38 ~ registerUser ~ error:",
        error
      );
    }
  } finally {
  }
};

export default {
  // Functions
  registerUser,
};
