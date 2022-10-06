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
            <input ref="file" :accept="allowedFiles" @change="selectFile($event)" type="file" name="file" id="file" class="hidden" />
          </label>
        </div>
          <span class="text-xs">Max. 1 bestand, max. 5MB, enkel pdf, jpg, jpeg, png.</span>
      </div>
    </div>

    <div class="mt-4 mb-4">
      <div v-if="!selectedFile">
        <i>Geen bijlage geselecteerd</i>
      </div>
      <div class="w-72" v-if="selectedFile">
        <file-item-component :isDisplay="isDisplay" v-on:downloadFile="downloadFile($event)" v-on:deleteFile="deleteFile($event)" :file="selectedFile" :isDetailView="isDetailView" />
        <span :name="id">
          <ErrorMessage :name="'file'" class="text-red text-sm block w-80" />
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import FileItemComponent from '@/components/semantic/FileItemComponent.vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import FileRepository from '@/repositories/fileRepository'
import { defineComponent, PropType, watch } from 'vue'
import { ErrorMessage, useField } from 'vee-validate'
import { FileItem } from '@/serializer/FileItem'
import { saveAs } from 'file-saver'

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
    },
    file: {
      type: Object as PropType<FileItem>,
      required: false,
    },
    inscuranceType: {
      type: String,
      default: ''
    },
    allowedFiles: {
      type: String,
      default: "*",
      required: false
    }
  },
  setup(props, { emit}) {

    const { value: selectedFile } = useField<any>('file', 'fileSize', {})

    if (props.file) {
      watch(() => props.file, () => {
        if (props.file && props.file.name) {
          download()
        }
      })
    }

    const download = () => {
      if (props.file && props.file.id) {
        RepositoryFactory.get(FileRepository)
        .downloadParticipantsFile(props.file.id, props.inscuranceType)
        .then((res) => {
          selectedFile.value = res
          if (props.file && props.file.name) {
            selectedFile.value.name = props.file.name
            selectedFile.value.id = props.file.id
          }
        })
      }
    }

    download()

    const downloadFile = () => {
      if (props.file && props.file.id) {
        const savedAsFile = saveAs(selectedFile.value, selectedFile.value.name)
      }
    }

    const deleteFile = () => {
      selectedFile.value = undefined
      //@ts-ignore
      document.getElementById('file').value = ''
      if (props.file && props.file.id) {
        RepositoryFactory.get(FileRepository)
        .deleteParticipantsFile(props.file.id, props.inscuranceType)
      }
      emit('removeUploadedFile')
    }

    const selectFile = (data: any) => {
      selectedFile.value = data.target.files[0]
      emit('removeUploadedFile')
    }

    return {
      selectedFile,
      downloadFile,
      deleteFile,
      selectFile,
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
