<template>
  <div class="border border-blue p-2 rounded-lg shadow-sm bg-lighterGreen" :class="isDisplay ? 'w-64' : 'w-100'">
    <div v-if="!isDisplay">
      <div class="mb-2">
        <p>
          {{message}}
        </p>
      </div>
      <div>
        <div class="bg-grey-lighter">
          <label class="flex w-72 flex-col items-center py-2 bg-white text-black rounded-lg shadow-sm tracking-wide uppercase border border-blue cursor-pointer hover:text-lightGreen">
            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span class="mt-2 text-base leading-normal">{{!selectedFile ? 'Selecteer bestand' : 'Vervang bestand'}}</span>            
            <input ref="file" @change="selectFile($event)" type="file" name="file" id="file" class="hidden" />
          </label>
        </div>
          <span class="text-xs">Enkel pdf, jpg, jpeg, png, webp. <strong>MAX 5MB</strong></span>
      </div>
    </div>

    <div class="mt-4 mb-4">
      <div v-if="!selectedFile">
        <i>Geen bijlage geselecteerd</i>
      </div>
      <div class="w-72" v-if="selectedFile">
        <file-item-component :isDisplay="isDisplay" v-on:deleteFile="deleteFile($event)" :file="selectedFile" :isDetailView="isDetailView" />
        <span :name="id">
          <ErrorMessage :name="'file'" class="text-red text-sm block w-80" />
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FileItemComponent from '@/components/semantic/FileItemComponent.vue'
import { ErrorMessage, useField } from 'vee-validate'

export default defineComponent({
  name: 'file-upload',
  components: {
    'file-item-component': FileItemComponent,
    ErrorMessage,
  },
  props: {
    message: {
      type: String,
      default: 'Voeg hier optioneel het ingevulde geneeskundig getuigschrift, een rekening of factuur,... toe',
      required: false,
    },
    isDisplay: {
      type: Boolean,
      default: false,
      required: false,
    }
  },
  setup() {

    const { value: selectedFile } = useField<any>('file', 'fileSize', {})

    const deleteFile = () => {
      selectedFile.value = undefined
      //@ts-ignore
      document.getElementById('file').value = ''
    }
    const selectFile = (data: any) => {
      console.log('SELECTED FILE: ', data.target.files[0])
      selectedFile.value = data.target.files[0]
    }

    return {
      deleteFile,
      selectFile,
      selectedFile,
    }
  },
})
</script>

<style lang="scss" scoped>
.add-button {
  min-width: 250px;
  margin-left: 20px;
}
</style>
