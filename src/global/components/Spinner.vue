<template>
  <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 spinner-container"
    v-if="loading">
    <div
      class="bg-gray-100 p-6 rounded-lg shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <NSpin class="flex justify-self-center mb-3" size="large" />
      <p class="flex items-center justify-center gap-x-2 text-lg font-semibold text-gray-800">
        {{ title }}
      </p>
      <template v-if="description">
        <p class="text-gray-600 text-sm flex justify-center">{{ description }}</p>
      </template>
    </div>
  </div>
</template>

<script setup>
// ---------UTILS----------//
import { toRefs } from "vue";

// ---------COMPONENTS----------//
import { NSpin } from "naive-ui";

// ---------STATES AND VARIABLES-----------//
/**
 * @typedef {Object} Props
 * @property {Boolean} loading Muestra el spinner si es true
 * @property {String} title Titulo del spinner
 * @property {String} description Descripcion del spinner
 */


/**
 * @type {Props} props
 */
const props = defineProps(
  {
    loading: {
      type: Boolean,
      required: true,
      default: false,
    },
    title: {
      type: [String, null],
      required: true,
      default: 'Cargando...',
    },
    description: {
      type: String,
      default: '',
    },
  }
)
const { loading, description, title } = toRefs(props)
</script>


<style scoped lang="css">
.spinner-container {
  z-index: 10;
}
</style>