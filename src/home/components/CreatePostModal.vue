<template>
  <NModal class="lg:w-[60%] sm:w-[90%]" v-model:show="homeStore.createPostModal" :mask-closable="false"
    :title="homeStore.modeEdition ? 'EDITAR PUBLICACON' : 'CREAR PUBLICACION'" :preset="'card'"
    :on-after-leave="homeStore.clearFormCreatePostModal">
    <div>
      <NUpload :max="1" v-model:value="homeStore.createPostForm.miniature" :on-change="handleFileUpload">
        <NUploadDragger>
          <div style="margin-bottom: 12px">
            <NIcon size="48" :depth="3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path :d="mdiImagePlus" />
              </svg>
            </NIcon>
          </div>
          <NText style="font-size: 16px">
            Haga clic o arrastre una imagen a esta área para cargarlo
          </NText>
          <NP depth="3" style="margin: 8px 0 0 0">
            La imagen sera utilizada como portada de su publicacion
          </NP>
        </NUploadDragger>
      </NUpload>
    </div>
    <NCard>
      <section class="flex justify-between gap-2">
        <NFormItem class="flex-1" label=" Titulo">
          <NInput v-model:value="homeStore.createPostForm.title" type="text"
            placeholder="Ingrese un titulo a la publicacon" />
        </NFormItem>
        <NFormItem class="w-[25%]" label="Categoria">
          <NSelect :options="OPCIONES_CATEGORIES" v-model:value="homeStore.createPostForm.category"
            placeholder="Seleccione categoria" />
        </NFormItem>
      </section>
      <NFormItem label="Contenido">
        <NInput v-model:value="homeStore.createPostForm.content" :rows="10" type="textarea"
          placeholder="Ingrese contenido a la publicacion" />
      </NFormItem>
      <NButton v-if="homeStore.modeEdition" @click="useHome.editPost(homeStore.createPostForm)" class="w-full"
        type="info">Editar publicacion
      </NButton>
      <NButton v-else @click="useHome.createPost(homeStore.createPostForm)" class="w-full" type="success">Crear
        publicacion
      </NButton>
    </NCard>
  </NModal>
</template>

<script setup>
// ----------UTILS----------//
import { ref } from 'vue';

// ----------STORE----------//
import useHomeStore from '../stores/useHomeStore.js'

// ----------COMPOSABLES----------//
import useHome from '../composables/useHome.js'

// ----------COMPONENTS----------//
import {
  NModal,
  NCard,
  NFormItem,
  NInput,
  NSelect,
  NButton,
  NUpload,
  NUploadDragger,
  NIcon,
  NText,
  NP,
} from 'naive-ui';
import { mdiImagePlus } from '@mdi/js';

// ----------CONFIG----------//
const homeStore = useHomeStore();
const { OPCIONES_CATEGORIES } = useHome;

// ----------FUNCTIONS----------//
/**
 * Funcion para almacenar el archivo en el store
 * @param {*} event Archivo almacenado
 */
const handleFileUpload = (event) => {
  const file = event?.file?.file;
  if (file) {
    homeStore.createPostForm.miniature = file;
  } else {
    console.error('No se pudo obtener el archivo para subir.');
  }
};

</script>

<style lang="css" scoped></style>