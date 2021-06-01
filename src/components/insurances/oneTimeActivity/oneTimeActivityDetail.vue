<template>
  <Form @submit="setHolderState()">
    <base-detail :data="oneTimeActivityState" :repository="OneTimeActivityRepository" title="Eenmalige activiteit">
      <template #default="{ details, isIdUrl }">
        <div v-if="details" class="mt-1">
          <responsible-member-detail :responsible-member="details.responsibleMember" />

          <div>
            <p class="font-semibold">Datum</p>
            <div class="px-5">
              <label-output label="Periode" :text="formatDate(details.startDate, details.endDate)" />
            </div>
          </div>

          <activity-detail :nature="details.nature" :group-amount="details.groupAmount" :location="details.location" />

          <div v-if="isIdUrl">
            <custom-text-area :disabled="true" label="Opmerkingen" :text="details.comment" />
          </div>

          <div v-else>
            <custom-input :value="comment" :type="InputTypes.TEXT_AREA" name="comment" label="Opmerkingen" @onChange="commentChanged($event)" />
          </div>
        </div>

        <div v-if="!isIdUrl" class="mt-5">
          <custom-button text="Bevestig" />
        </div>
      </template>
    </base-detail>
  </Form>
</template>

<script lang="ts">
import { OneTimeActivityRepository } from '@/repositories/insurances/oneTimeActivityRepository'
import ResponsibleMemberDetail from '@/components/semantic/detail/ResponsibleMemberDetail.vue'
import ActivityDetail from '@/components/semantic/detail/ActivityDetail.vue'
import { OneTimeActivity } from '@/serializer/insurances/OneTimeActivity'
import BaseDetail from '@/components/semantic/detail/BaseDetail.vue'
import CustomTextArea from '@/components/inputs/CustomTextArea.vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import LabelOutput from '@/components/semantic/LabelOutput.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import CustomButton from '@/components/CustomButton.vue'
import { computed, defineComponent, ref } from 'vue'
import { formatDate } from '@/helpers/formatHelper'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { Form } from 'vee-validate'
import { useStore } from 'vuex'
import router from '@/router'

export default defineComponent({
  name: 'OneTimeActivityDetail',
  components: {
    'responsible-member-detail': ResponsibleMemberDetail,
    'custom-text-area': CustomTextArea,
    'activity-detail': ActivityDetail,
    'custom-button': CustomButton,
    'custom-input': CustomInput,
    'label-output': LabelOutput,
    'base-detail': BaseDetail,
    Form,
  },
  setup() {
    const store = useStore()
    const comment = ref<string>('')
    const oneTimeActivityState = computed(() => {
      return store.state.insurance.oneTimeActivityState
    })

    const commentChanged = (event: any) => {
      comment.value = event
    }

    const setHolderState = () => {
      const oneTimeActivity = ref<OneTimeActivity>({ ...oneTimeActivityState.value, ...{ comment: comment.value } })
      store.dispatch('setOneTimeActivityState', oneTimeActivity)
      postOneTimeActivity()
    }

    const postOneTimeActivity = () => {
      RepositoryFactory.get(OneTimeActivityRepository)
        .create(oneTimeActivityState.value)
        .then((result: any) => {
          console.log('result: ', result)
          router.push('/home').then(() => {
            store.dispatch('setHolderState', HolderStates.GENERAL)
          })
        })
    }

    const asd = () => {
      store.dispatch('setHolderState', HolderStates.GENERAL)
      router.push('/home')
    }
    return {
      OneTimeActivityRepository,
      oneTimeActivityState,
      commentChanged,
      setHolderState,
      formatDate,
      InputTypes,
      comment,
      asd,
    }
  },
})
</script>
