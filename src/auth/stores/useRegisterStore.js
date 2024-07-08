// -----------UTILS-----------//
import { ref } from "vue";
import { defineStore } from "pinia";

export default defineStore("useRegisterStore", () => {
  //----------STATES AND VARIABLES-----------//
  const form = ref({
    email: null,
    username: null,
    password: null,
  });

  // ----------FUNCTIONS----------//
  const cleanForm = () => {
    form.value = {
      email: null,
      username: null,
      password: null,
    };
  };

  return {
    // States
    form,
    // Functions
    cleanForm,
  };
});
