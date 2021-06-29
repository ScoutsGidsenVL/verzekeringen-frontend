<template>
  <base-detail :data="materialInsuranceState" :repository="MaterialInsuranceRepository" title="Materiaal">
    <template #default="{ details }">
      <div v-if="details" class="mt-1">
        <div v-if="!(holderState === HolderStates.DETAIL) && details.comment">
          <p class="font-semibold">Opmerkingen</p>
          <div class="px-5">
            <label-output :text="details.comment" />
          </div>
        </div>

        <slot></slot>

        <responsible-member-detail :responsible-member="details.responsibleMember" />

        <div>
          <p class="font-semibold">Datum</p>
          <div class="px-5">
            <label-output label="Periode" :text="formatDate(details.startDate, details.endDate)" />
          </div>
        </div>

        <activity-detail
          :nature="details.nature"
          :location="details.postCodeCity"
          :country="details.postCodeCity && details.postCodeCity.city ? 'België' : details.country ? details.country.name : undefined"
        />

        <p class="font-semibold">Materiaal</p>
        <div class="px-5 py-4">
          <equipment-list :equipmentList="details.equipment" />
        </div>
      </div>
    </template>
  </base-detail>
</template>

<script lang="ts">
import { MaterialInsuranceRepository } from '@/repositories/insurances/materialInsuranceRepository'
import ResponsibleMemberDetail from '@/components/semantic/detail/ResponsibleMemberDetail.vue'
import ActivityDetail from '@/components/semantic/detail/ActivityDetail.vue'
import BaseDetail from '@/components/semantic/detail/BaseDetail.vue'
import LabelOutput from '@/components/semantic/LabelOutput.vue'
import { formatDate } from '@/helpers/formatHelper'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import EquipmentList from '@/components/insurances/materialInsurance/equipmentList.vue'

export default defineComponent({
  name: 'MaterialInusranceDetail',
  components: {
    'responsible-member-detail': ResponsibleMemberDetail,
    'activity-detail': ActivityDetail,
    'label-output': LabelOutput,
    'base-detail': BaseDetail,
    'equipment-list': EquipmentList,
  },
  setup() {
    const store = useStore()

    const materialInsuranceState = computed(() => {
      return store.state.insurance.materialInsuranceState
    })

    const holderState = computed((): HolderStates => {
      return store.state.insurance.holderState
    })

    return {
      MaterialInsuranceRepository,
      materialInsuranceState,
      formatDate,
      InputTypes,
      HolderStates,
      holderState,
    }
  },
})
</script>
