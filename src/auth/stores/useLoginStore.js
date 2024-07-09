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
    email: JSON.parse(localStorage.getItem("user"))?.email ?? null,
    username: JSON.parse(localStorage.getItem("user"))?.username ?? null,
    isAuth: localStorage.getItem("accessToken") ?? null,
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

    localStorage.clear();
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
