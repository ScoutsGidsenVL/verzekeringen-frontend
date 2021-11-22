<template>
  <base-detail :single-page="singlePage" :data="eventInsuranceState" :repository="EventRepository" title="evenementenverzekering">
    <template #default="{ details }">
      values: {{values}}
      <div v-if="details.status && details.status.label === 'Goedgekeurd'">
        <form id="list" @submit.prevent="onSubmit">
          <custom-headline-2 text="Bijlage" />
          <div class="mb-2">
            <file-upload :message="'Deelnemerslijst kan hier opgeladen worden.'" />
          </div>

          <div class="mb-5">
            <custom-button text="Bijlage indienen" />
          </div>
        </form>
      </div>

      <div v-if="details" class="mt-1">
        <div v-if="!(holderState === HolderStates.DETAIL)">
          <div v-if="details.comment">
            <p class="font-semibold mb-0">Opmerkingen</p>
            <div class="md:ml-20 xs:ml-5 sm:ml-5">
              <label-output :text="details.comment" />
            </div>
          </div>
        </div>

        <slot></slot>

        <responsible-member-detail :responsible-member="details.responsibleMember" />

        <div>
          <p class="font-semibold mb-0">Datum</p>
          <div class="md:ml-20 xs:ml-5 sm:ml-5">
            <label-output label="Periode" :text="formatEventDate(details.startDate, details.startTime, details.endDate, details.endTime)" />
          </div>
        </div>

        <activity-detail :nature="details.nature" :event-size="details.eventSize" :location="details.location" />
      </div>
    </template>
  </base-detail>
</template>

<script lang="ts">
import { EventRepository } from '@/repositories/insurances/eventRepository'
import ResponsibleMemberDetail from '@/components/semantic/detail/ResponsibleMemberDetail.vue'
import ActivityDetail from '@/components/semantic/detail/ActivityDetail.vue'
import BaseDetail from '@/components/semantic/detail/BaseDetail.vue'
import LabelOutput from '@/components/semantic/LabelOutput.vue'
import { formatEventDate } from '@/helpers/formatHelper'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import FileUpload from '@/components/semantic/FileUpload.vue'
import CustomButton from '@/components/CustomButton.vue'
import { useForm } from 'vee-validate'
import RepositoryFactory from '@/repositories/repositoryFactory'
import FileRepository from '@/repositories/fileRepository'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'EventInsuranceDetail',
  components: {
    'responsible-member-detail': ResponsibleMemberDetail,
    'activity-detail': ActivityDetail,
    'label-output': LabelOutput,
    'base-detail': BaseDetail,
    CustomHeadline2,
    FileUpload,
    CustomButton
  },
  props: {
    singlePage: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  setup() {
    const store = useStore()
    const route = useRoute()

    const { handleSubmit, values, validate, isSubmitting } = useForm<any>({
      initialValues: {
      },
    })

    const eventInsuranceState = computed(() => {
      return store.state.insurance.eventState
    })

    const holderState = computed((): HolderStates => {
      return store.state.insurance.holderState
    })

    const onSubmit = async () => {
      handleSubmit(async (values: any) => {
        console.log("doing submit handle: ", values)
        postFile(values)
      })()
    }

    const postFile = async (values: any) => {
      await RepositoryFactory.get(FileRepository).uploadParticipantsFile(values.file, route.params.id.toString())
    }

    return {
      eventInsuranceState,
      EventRepository,
      formatEventDate,
      CustomHeadline2,
      HolderStates,
      holderState,
      InputTypes,
      FileUpload,
      onSubmit,
      values
    }
  },
})
</script>
