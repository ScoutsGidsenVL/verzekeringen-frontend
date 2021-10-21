<template>
  <div class="flex justify-content-center container rounded-lg bg-lightGreen mt-1">
    <div class="p-3" v-if="file">
      <div class="d-flex gap-4 justify-end" v-if="isDisplay === false">
        <div class="hover:text-lightGreen cursor-pointer" v-on:click="downloadFile()">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <div class="hover:text-red cursor-pointer" v-on:click="deleteFromArray()">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div class="mt-3">{{ file.name }}</div>
      <div class="mt-3">{{ (file.size / (1024 * 1024)).toFixed(2) }} MB</div>
    </div>
  </div>
</template>

<script lang="ts">
import { FileItem } from '@/serializer/FileItem'
import FileRepository from '@/repositories/fileRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { defineComponent, PropType } from 'vue'
import { saveAs } from 'file-saver'

export default defineComponent({
  name: 'file-item-component',
  props: {
    file: {
      type: Object as PropType<FileItem>,
      required: true,
    },
    isDetailView: {
      type: Boolean,
      required: false,
      default: false,
    },
    isDisplay: {
      type: Boolean,
      default: false,
      required: false,
    }
  },
  setup(props, context) {
    const downloadFile = () => {
      if (props.file && props.file.id) {
        RepositoryFactory.get(FileRepository)
          .downloadFile(props.file.id)
          .then((file: Blob) => {
            const savedAsFile = saveAs(file, props.file.name)
          })
      }
    }

    const deleteFromArray = () => {
      context.emit('deleteFile', true)
    }

    return {
      downloadFile,
      deleteFromArray,
    }
  },
})
</script>

<style lang="scss" scoped>
.container {
  padding: 5px 0px 5px 0px;
  min-width: 100%;
  border: 1px solid #ced4da;
}

.icon {
  margin-top: 3px;
  cursor: pointer;
}
</style>
