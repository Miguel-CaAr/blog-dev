<template>
  <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
    <h1 class="font-bold text-center text-2xl mb-5">Registrarse</h1>
    <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
      <div class="px-5 py-7">
        <NFormItem label="Correo">
          <NInput v-model:value="registerStore.form.email" type="email" placeholder="Ingrese correo"
            class="border rounded-lg px-3 py-2 mt-1 text-sm w-full" />
        </NFormItem>
        <NFormItem label="Nombre de usuario">
          <NInput v-model:value="registerStore.form.username" type="text" placeholder="Ingrese su nombre de usuario"
            class="border rounded-lg px-3 py-2 mt-1 text-sm w-full" />
        </NFormItem>
        <NFormItem label="Contraseña">
          <NInput @keydown.enter.prevent="useRegister.registerUser(registerStore.form)"
            v-model:value="registerStore.form.password" type="password" placeholder="Ingrese contraseña"
            class="border rounded-lg px-3 py-2 mt-1 text-sm w-full" />
        </NFormItem>
        <NButton @click="useRegister.registerUser(registerStore.form)" size="large" type="info"
          class="rounded-lg text-sm text-center w-full">
          <span class="inline-block mr-2">Registrarse</span>
        </NButton>
      </div>
      <div class="py-5">
        <div class="grid grid-cols-2 gap-1">
          <div class="text-center sm:text-left whitespace-nowrap">
          </div>
          <div class="text-center sm:text-right  whitespace-nowrap">
            <button
              class="transition duration-200 mx-1 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
              <span @click="onToggleShowLogin(true)" class="inline-block ml-1">Iniciar sesion</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="py-5">
      <div class="grid grid-cols-2 gap-1">
        <div class="text-center sm:text-left whitespace-nowrap">
          <button
            class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              class="w-4 h-4 inline-block align-text-top">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span @click="returnToHome" class="inline-block ml-1">Regresar al inicio</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// ---------UTILS----------//
import { ref, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

// ---------COMPONENTS----------//
import {
  NFormItem,
  NInput,
  NButton,
} from 'naive-ui';

// ---------STORE----------//
import useRegisterStore from '../stores/useRegisterStore.js'

// ---------COMPOSABLES----------//
import useRegister from "../composables/useRegister.js"

// ---------CONFIG----------//
const registerStore = useRegisterStore();
const router = useRouter();
const emit = defineEmits(['on:toggleShowLogin'])

// ---------STATES AND VARIABLES----------//

// ---------FUNCIONES----------//
const returnToHome = () => {
  router.push("/");
};

const onToggleShowLogin = (show) => {
  emit('on:toggleShowLogin', show);
}

</script>

<style lang="css" scoped></style>