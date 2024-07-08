// -----------UTILS-----------//
import { ref } from "vue";
import { defineStore } from "pinia";

export default defineStore("useLoginStore", () => {
  //----------STATES AND VARIABLES-----------//
  const form = ref({
    email: null,
    password: null,
  });

  const userAuth = ref({
    email: null,
    username: null,
    isAuth: localStorage.getItem("accessToken") !== null,
  });

  // ----------FUNCTIONS----------//
  const cleanForm = () => {
    form.value = {
      email: null,
      password: null,
    };
  };

  const logout = () => {
    userAuth.value = {
      email: null,
      username: null,
      isAuth: null,
    };

    localStorage.removeItem("accessToken");
  };

  return {
    // States
    form,
    userAuth,
    // Functions
    cleanForm,
    logout,
  };
});
