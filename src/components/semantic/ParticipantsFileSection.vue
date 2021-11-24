<template>
  <div>
    <form id="list" @submit.prevent="onSubmit(details)">
      <custom-headline-2 text="Bijlage" />
      <div class="mb-2">
        <file-upload :file="details.participant_list_file" :message="'Deelnemerslijst kan hier opgeladen worden.'" />
      </div>
      <div class="mb-5">
        <custom-button :loadingSubmit="isUploadingFile" @click="isUploading()" text="Bijlage indienen" />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import FileUpload from '@/components/semantic/FileUpload.vue'
import FileRepository from '@/repositories/fileRepository'
import { FileDeserializer } from '@/serializer/FileItem'
import CustomButton from '@/components/CustomButton.vue'
import { defineComponent, PropType, ref } from 'vue'
import { useForm } from 'vee-validate'
import { useRoute } from 'vue-router'


export default defineComponent({
  name: 'ParticipantsFileSection',
  components: {
    CustomHeadline2,
    FileUpload,
    CustomButton
  },
  props: {
    details: {
      type: Object as PropType<any>,
      required: true
    }
  },
  setup(props) {
    const { handleSubmit } = useForm<any>({})
    const route = useRoute()
    
    const onSubmit = async (details: any) => {
      handleSubmit(async (values: any) => {
        if (!isUploadingFile.value) {
          isUploadingFile.value = true
          postFile(values, details)
        }
      })()
    }

    const isUploadingFile = ref<boolean>(false)

    const postFile = async (values: any, details: any) => {
      await RepositoryFactory.get(FileRepository).uploadParticipantsFile(values.file, route.params.id.toString()).then((x) => {
        details.participant_list_file = FileDeserializer(x)
      })
      isUploadingFile.value = false
    }

    return {
      isUploadingFile,
      onSubmit,
    }
  },
})
</script>
