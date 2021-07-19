<template>
  <div>
    <div>
      <div>
        <div class="bg-grey-lighter">
          <label class="flex w-72 flex-col items-center py-2 bg-white text-black rounded-lg shadow-sm tracking-wide uppercase border border-blue cursor-pointer hover:text-lightGreen">
            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span class="mt-2 text-base leading-normal">Selecteer bestand</span>
            <input @change="selectFile($event)" type="file" name="file" class="hidden" />
          </label>
        </div>
      </div>

      <!-- <custom-button class="mt-1" v-on:click="uploadFile(file)" text="Upload" /> -->
    </div>

    <div class="mt-4 mb-5">
      <div v-if="!selectedFile">
        <i>Geen bijlage geselecteerd</i>
      </div>
      <div class="w-72" v-else>
        <file-item-component v-on:deleteFile="deleteFile($event)" :file="selectedFile" :isDetailView="isDetailView" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import RepositoryFactory from '@/repositories/repositoryFactory'
import FileRepository from '@/repositories/fileRepository'
import { defineComponent, ref, watch } from 'vue'
import FileItemComponent from '@/components/semantic/FileItemComponent.vue'
import { FileItem } from '@/serializer/FileItem'
// import CustomButton from '@/components/CustomButton.vue'

export default defineComponent({
  name: 'file-upload',
  components: {
    'file-item-component': FileItemComponent,
    // 'custom-button': CustomButton,
  },
  props: {},
  setup(props, context) {
    const files = ref<FileItem[]>([])
    const file = ref<any>()
    const selectedFile = ref<any>()

    const uploadFile = (file: File) => {
      RepositoryFactory.get(FileRepository)
        .uploadFile(file)
        .then((res: FileItem) => {
          res.contentType = file.type
          res.name = file.name
          res.size = file.size.toString()
          files.value.push(res)
        })
    }

    const deleteFile = () => {
      selectedFile.value = undefined
    }
    const selectFile = (data: any) => {
      selectedFile.value = data.target.files[0]
    }

    watch(
      () => files.value,
      () => {
        context.emit('addFiles', files.value)
      }
    )

    return {
      files,
      file,
      uploadFile,
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
