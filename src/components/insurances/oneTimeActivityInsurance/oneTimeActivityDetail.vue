<template>
  <base-detail :single-page="singlePage" :data="oneTimeActivityState" :repository="OneTimeActivityRepository" title="Eenmalige activiteit">
    <template #default="{ details }">
      <div v-if="details" class="mt-1">
        <div v-if="!(holderState === HolderStates.DETAIL)">
          <div v-if="details.comment">
            <p class="font-semibold">Opmerkingen</p>
            <div class="ml-5">
              <label-output :text="details.comment" />
            </div>
          </div>
        </div>

        <slot></slot>

        <responsible-member-detail :responsible-member="details.responsibleMember" />

        <div>
          <p class="font-semibold">Datum</p>
          <div class="md:ml-20">
            <label-output label="Periode" :text="formatDate(details.startDate, details.endDate)" />
          </div>
        </div>

        <activity-detail :nature="details.nature" :group-size="details.groupSize" :location="details.location" />
      </div>
    </template>
  </base-detail>
</template>

<script lang="ts">
import { OneTimeActivityRepository } from '@/repositories/insurances/oneTimeActivityRepository'
import ResponsibleMemberDetail from '@/components/semantic/detail/ResponsibleMemberDetail.vue'
import ActivityDetail from '@/components/semantic/detail/ActivityDetail.vue'
import BaseDetail from '@/components/semantic/detail/BaseDetail.vue'
import LabelOutput from '@/components/semantic/LabelOutput.vue'
import { formatDate } from '@/helpers/formatHelper'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'OneTimeActivityDetail',
  components: {
    'responsible-member-detail': ResponsibleMemberDetail,
    'activity-detail': ActivityDetail,
    'label-output': LabelOutput,
    'base-detail': BaseDetail,
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

    const oneTimeActivityState = computed(() => {
      return store.state.insurance.oneTimeActivityState
    })

    const holderState = computed((): HolderStates => {
      return store.state.insurance.holderState
    })

    return {
      OneTimeActivityRepository,
      oneTimeActivityState,
      formatDate,
      InputTypes,
      HolderStates,
      holderState,
    }
  },
})
</script>
