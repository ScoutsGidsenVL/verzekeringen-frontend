<template>
  <base-detail :single-page="singlePage" :data="temporaryVehicleState" :repository="TemporaryVehicleRepository" title="Tijdelijke">
    <template #default="{ details }">
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
            <label-output label="Periode" :text="formatDate(details.startDate, details.endDate)" />
          </div>
        </div>

        <div>
          <p class="font-semibold mb-0">Gekozen verzekering</p>
          <div class="md:ml-20 xs:ml-5 sm:ml-5">
            <div v-if="details.insuranceOptions.includes(1)">
              <p>Optie 1: Omniumverzekering.</p>
            </div>

            <div v-if="details.insuranceOptions.includes(2)">
              <p class="mb-0">Optie 2: Vrijstelling van eigen omnium dekken.</p>
              <p>{{ details.maxCoverage.label }}</p>
            </div>

            <div v-if="details.insuranceOptions.includes(3)">
              <p>Optie 3: Huurvoertuig: vrijstelling verzekering burgerlijke aansprakelijkheid dekken tot 500 euro.</p>
            </div>
          </div>
        </div>

        <div>
          <p class="font-semibold mb-0">Bestuurders</p>
          <div class="md:ml-20 xs:ml-5 sm:ml-5">
            <member-list :members-list="details.drivers" />
          </div>
        </div>

        <div class="mb-3">
          <p class="font-semibold mb-0">Eigenaar</p>
          <div class="md:ml-20 xs:ml-5 sm:ml-5">
            <owner :owner="details.owner" />
          </div>
        </div>

        <div v-if="details.vehicle && details.vehicle.licensePlate" class="mb-3">
          <p class="font-semibold mb-0">Voertuig</p>
          <div class="md:ml-20 xs:ml-5 sm:ml-5">
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
