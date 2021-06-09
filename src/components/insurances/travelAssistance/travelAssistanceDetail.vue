<template>
  <base-detail :data="travelAssistanceState" :repository="TravelAssistanceRepository" title="Reisbijstand">
    <template #default="{ details }">
      <div v-if="details" class="mt-1">
        <responsible-member-detail :responsible-member="details.responsibleMember" />

        <div>
          <p class="font-semibold">Datum</p>
          <div class="px-5">
            <label-output label="Periode" :text="formatDate(details.startDate, details.endDate)" />
          </div>
        </div>

        <activity-detail :country="details.country.name" />

        <div class="mb-3">
          <p class="font-semibold">Deelnemers</p>
          <div class="px-5 mt-3">
            <member-list :members-list="details.participants" />
          </div>
        </div>

        <div v-if="details.vehicle && details.vehicle.licensePlate" class="mb-3">
          <p class="font-semibold">Voertuig</p>
          <div class="px-5 mt-3">
            <vehicle-item :vehicle="details.vehicle" :no-line="true" />
          </div>
        </div>

        <div v-if="!(holderState === HolderStates.DETAIL)">
          <p class="font-semibold">Opmerkingen</p>
          <div v-if="details.comment" class="px-5">
            <label-output :text="details.comment" />
          </div>
        </div>

        <slot></slot>
      </div>
    </template>
  </base-detail>
</template>

<script lang="ts">
import { TravelAssistanceRepository } from '@/repositories/insurances/travelAssistanceRepository'
import ResponsibleMemberDetail from '@/components/semantic/detail/ResponsibleMemberDetail.vue'
import ActivityDetail from '@/components/semantic/detail/ActivityDetail.vue'
import BaseDetail from '@/components/semantic/detail/BaseDetail.vue'
import LabelOutput from '@/components/semantic/LabelOutput.vue'
import { computed, defineComponent } from 'vue'
import { formatDate } from '@/helpers/formatHelper'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { useStore } from 'vuex'
import MemberList from '@/components/insurances/travelAssistance/memberList.vue'
import VehicleItem from '@/components/insurances/travelAssistance/vehicleItem.vue'

export default defineComponent({
  name: 'TarvelAssistanceDetail',
  components: {
    'responsible-member-detail': ResponsibleMemberDetail,
    'activity-detail': ActivityDetail,
    'label-output': LabelOutput,
    'base-detail': BaseDetail,
    'member-list': MemberList,
    'vehicle-item': VehicleItem,
  },
  setup() {
    const store = useStore()

    const travelAssistanceState = computed(() => {
      return store.state.insurance.travelAssistanceState
    })

    const holderState = computed((): HolderStates => {
      return store.state.insurance.holderState
    })

    return {
      TravelAssistanceRepository,
      travelAssistanceState,
      formatDate,
      InputTypes,
      HolderStates,
      holderState,
    }
  },
})
</script>
