<template>
    <NModal class="lg:w-[30%] sm:w-[50%]" v-model:show="homeStore.deleteConfirmationModal.show" :mask-closable="false"
        :title="`Desea eliminar la publicacion?`" :preset="'card'">
        <p>La publicacion con titulo `{{ homeStore.deleteConfirmationModal.post.title }}` sera eliminada.</p>
        <div class="py-2 flex justify-between">
            <NButton type="success" @click="homeStore.openDeleteConfirmationModal(false)">Salir</NButton>
            <NButton type="error" @click="useHome.deletePost(homeStore.deleteConfirmationModal.post)">Eliminar</NButton>
        </div>
    </NModal>
</template>

<script setup>
// ---------UTILS----------//
import { defineEmits } from "vue";

// ---------STORE----------//
import useHomeStore from "../stores/useHomeStore";

// ---------COMPOSABLE----------//
import useHome from "../composables/useHome";

// ---------COMPONENTS----------//
import {
    NModal,
    NButton,
} from "naive-ui";

// ---------CONFIG----------//
const homeStore = useHomeStore();

// ---------STATES AND VARIABLES----------//
const emit = defineEmits(['on:deletePost']);

// ---------FUNCTIONS----------//

</script>

<style lang="css" scoped></style>