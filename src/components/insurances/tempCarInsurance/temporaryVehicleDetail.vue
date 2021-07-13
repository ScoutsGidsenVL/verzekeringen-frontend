<template>
  <base-detail :single-page="singlePage" :data="temporaryVehicleState" :repository="TemporaryVehicleRepository" title="Tijdelijke">
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
          <div class="ml-5">
            <label-output label="Periode" :text="formatDate(details.startDate, details.endDate)" />
          </div>
        </div>

        <div>
          <p class="font-semibold">Gekozen verzekering</p>
          <div class="ml-5 py-3">
            <div v-if="details.insuranceOptions.includes(1)" class="mb-3">
              <p>Optie 1: Omniumverzekering (voor stoffelijke schade, brand en diefstal van je eigen voertuig).</p>
            </div>

            <div v-if="details.insuranceOptions.includes(2)" class="mb-3">
              <p>Optie 2: Heb je al een omniumverzekering? Koop je vrijstelling af: de verzekering dekt de vrijstelling (franchise) van je eigen omnium.</p>
              <p>{{ details.maxCoverage.label }}</p>
            </div>

            <div v-if="details.insuranceOptions.includes(3)">
              <p>Optie 3: Huur je een voertuig? Koop dan de vrijstelling af van de wettelijk verplichte verzekering burgerlijke aansprakelijkheid tot maximum 500 euro.</p>
            </div>
          </div>
        </div>

        <div class="mb-3">
          <p class="font-semibold">Bestuurders</p>
          <div class="ml-5 mt-3">
            <member-list :members-list="details.drivers" />
          </div>
        </div>

        <div class="mb-3">
          <p class="font-semibold">Eigenaar</p>
          <div class="ml-5">
            <owner :owner="details.owner" />
          </div>
        </div>

        <div v-if="details.vehicle && details.vehicle.licensePlate" class="mb-3">
          <p class="font-semibold">Voertuig</p>
          <div class="ml-5 mt-3">
            <vehicle-item :vehicle="details.vehicle" :no-line="true" />
          </div>
        </div>
      </div>
    </template>
  </base-detail>
</template>

<script lang="ts">
import { TemporaryVehicleRepository } from '@/repositories/insurances/temporaryVehicleRepository'
import ResponsibleMemberDetail from '@/components/semantic/detail/ResponsibleMemberDetail.vue'
import VehicleItem from '@/components/insurances/travelAssistance/vehicleItem.vue'
import MemberList from '@/components/insurances/travelAssistance/memberList.vue'
import Owner from '@/components/insurances/tempCarInsurance/owner.vue'
import BaseDetail from '@/components/semantic/detail/BaseDetail.vue'
import LabelOutput from '@/components/semantic/LabelOutput.vue'
import { formatDate } from '@/helpers/formatHelper'
import { HolderStates } from '@/enums/holderStates'
import { computed, defineComponent } from 'vue'
import { InputTypes } from '@/enums/inputTypes'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'TemporaryVehicleDetail',
  components: {
    'responsible-member-detail': ResponsibleMemberDetail,
    'label-output': LabelOutput,
    'vehicle-item': VehicleItem,
    'base-detail': BaseDetail,
    'member-list': MemberList,
    Owner,
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

    const temporaryVehicleState = computed(() => {
      return store.state.insurance.temporaryVehicleState
    })

    const holderState = computed((): HolderStates => {
      return store.state.insurance.holderState
    })

    return {
      TemporaryVehicleRepository,
      temporaryVehicleState,
      formatDate,
      InputTypes,
      HolderStates,
      holderState,
    }
  },
})
</script>
