<template>
  <NModal class="lg:w-[60%] sm:w-[90%]" v-model:show="homeStore.createPostModal" :mask-closable="false"
    :title="'CREAR PUBLICACION'" :preset="'card'" :on-after-leave="() => { }">
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
      <NButton @click="useHome.createPost(homeStore.createPostForm)" class="w-full" type="success">Crear publicacion
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
 * !!! CAMBIAR A COMPOSABLE
 */
// Configuración de Cloudinary
const cloudName = 'duobjlhl9'; // Reemplaza con tu cloud name
const uploadPreset = 'ml_default'; // Reemplaza con tu upload preset

// Función para manejar la subida de archivo
const handleFileUpload = (event) => {
  const file = event?.file?.file; // Acceder correctamente al archivo dentro de event
  if (file) {
    uploadImage(file);
  } else {
    console.error('No se pudo obtener el archivo para subir.');
  }
};

// Función para subir la imagen a Cloudinary
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Error al subir la imagen a Cloudinary');
    }

    const data = await response.json();
    console.log('Respuesta de Cloudinary:', data);

  } catch (error) {
    console.error('Error en la subida de la imagen:', error);
  }
};
/**
 * !!! CAMBIAR A COMPOSABLE
 */

</script>

<style lang="css" scoped></style>