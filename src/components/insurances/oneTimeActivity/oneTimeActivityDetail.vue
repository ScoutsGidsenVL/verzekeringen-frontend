<template>
  <Form @submit="setHolderState()">
    <base-detail :data="oneTimeActivityState" :repository="OneTimeActivityRepository" title="Eenmalige activiteit">
      <template #default="{ details }">
        <div v-if="error">
          <p class="text-red">Er is iets mis gegaan.</p>
        </div>
        <div v-if="details && !error" class="mt-1">
          <responsible-member-detail :responsible-member="details.responsibleMember" />

          <div>
            <p class="font-semibold">Datum</p>
            <div class="px-5">
              <label-output label="Periode" :text="formatDate(details.startDate, details.endDate)" />
            </div>
          </div>

          <activity-detail :nature="details.nature" :group-amount="details.groupAmount" :location="details.location" />

          <div>
            <p class="font-semibold">Opmerkingen</p>
            <div class="px-5">
              <custom-input :disabled="holderState === HolderStates.COMPLETED" :value="comment" :type="InputTypes.TEXT_AREA" name="comment" label="" @onChange="commentChanged($event)" />
            </div>
          </div>
        </div>
      </template>
    </base-detail>

    <div v-if="holderState === HolderStates.DETAIL" class="mt-5">
      <custom-button text="Bevestig" />
    </div>
  </Form>
</template>

<script lang="ts">
import { OneTimeActivityRepository } from '@/repositories/insurances/oneTimeActivityRepository'
import ResponsibleMemberDetail from '@/components/semantic/detail/ResponsibleMemberDetail.vue'
import ActivityDetail from '@/components/semantic/detail/ActivityDetail.vue'
import { OneTimeActivity } from '@/serializer/insurances/OneTimeActivity'
import BaseDetail from '@/components/semantic/detail/BaseDetail.vue'
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
    const error = ref<boolean>(false)

    const oneTimeActivityState = computed(() => {
      return store.state.insurance.oneTimeActivityState
    })

    const holderState = computed((): HolderStates => {
      return store.state.insurance.holderState
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
        .then((completed: OneTimeActivity) => {
          store.dispatch('setHolderState', HolderStates.COMPLETED)
          store.dispatch('setOneTimeActivityState', completed)
          window.scrollTo(0, 0)
        })
        .catch(() => {
          error.value = true
        })
    }

    const asd = () => {
      router.push('/home').then(() => {})
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
      holderState,
      HolderStates,
      error,
    }
  },
})
</script>
