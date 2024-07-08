<template>
  <NModal class="lg:w-[60%] sm:w-[90%]" v-model:show="homeStore.createPostModal" :mask-closable="false"
    :title="'CREAR PUBLICACION'" :preset="'card'" :on-after-leave="() => { }">
    <div>
      <NUpload :max="1" v-model:value="homeStore.createPostForm.miniature" :on-change="handleUploadChange">
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
      <NFormItem label=" Titulo">
        <NInput v-model:value="homeStore.createPostForm.title" type="text"
          placeholder="Ingrese un titulo a la publicacon" />
      </NFormItem>
      <NFormItem label="Contenido">
        <NInput v-model:value="homeStore.createPostForm.content" :rows="10" type="textarea"
          placeholder="Ingrese contenido a la publicacion" />
      </NFormItem>
      <NButton class="w-full" type="success">Crear publicacion</NButton>
    </NCard>
  </NModal>
</template>

<script setup>
// ----------UTILS----------//
import { ref } from 'vue';

// ----------STORE----------//
import useHomeStore from '../stores/useHomeStore.js'

// ----------COMPONENTS----------//
import {
  NModal,
  NCard,
  NFormItem,
  NInput,
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

// ----------FUNCTIONS----------//
function handleUploadChange(data) {
  const file = data.fileList[0]?.file;
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const blobData = e.target.result;
      homeStore.createPostForm.miniature = blobData;
    };
    reader.readAsDataURL(file);
  }
}

</script>

<style lang="css" scoped></style>