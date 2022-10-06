<template>
  <div>
    <form id="list" @submit.prevent="onSubmit(det)">
      <custom-headline-2 text="Bijlage" />
      <div class="mb-2">
        <file-upload @removeUploadedFile="removeUploadedFile()" :inscuranceType="inscuranceType" :file="det.participant_list_file" :message="'Deelnemerslijst kan hier opgeladen worden.'" />
      </div>
      <div class="mb-5">
        <div v-if="displayMessage" class="p-3 w-72 rounded-lg bg-lightGreen">
          Bijlage succesvol ingediend!
        </div>
        <custom-button v-if="!det.participant_list_file" :loadingSubmit="isUploadingFile" text="Bijlage indienen" />
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
import { defineComponent, PropType, ref, toRefs } from 'vue'
import { useForm } from 'vee-validate'
import { useRoute } from 'vue-router'


export default defineComponent({
  name: 'ParticipantsFileSection',
  components: {
    CustomHeadline2,
    FileUpload,
    CustomButton,
  },
  props: {
    details: {
      type: Object as PropType<any>,
      required: true
    },
    inscuranceType: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const det = ref<any>(props.details)
    const { handleSubmit } = useForm<any>({})
    const route = useRoute()

    const removeUploadedFile = () => {
      det.value.participant_list_file = undefined;
    }
    
    const onSubmit = async (details: any) => {
      handleSubmit(async (values: any) => {
        if (!isUploadingFile.value) {
          isUploadingFile.value = true
          postFile(values, details)
        }
      })()
    }
    const isUploadingFile = ref<boolean>(false)
    const displayMessage = ref<boolean>(false)

    const postFile = async (values: any, details: any) => {
      await RepositoryFactory.get(FileRepository).uploadParticipantsFile(values.file, route.params.id.toString(), props.inscuranceType).then((x) => {
        details.participant_list_file = FileDeserializer(x)
      })
      isUploadingFile.value = false
      displayMessage.value = true 
    }

    return {
      isUploadingFile,
      removeUploadedFile,
      onSubmit,
      det,
      displayMessage,
    }
  },
})
</script>
