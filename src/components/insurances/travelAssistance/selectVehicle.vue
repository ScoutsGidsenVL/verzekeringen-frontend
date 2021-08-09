<template>
  <span name="vehicle">
    <ErrorMessage name="vehicle" class="text-red text-sm block mt-1 w-80" />
  </span>
  <a class="cursor-pointer btn-simple-green mb-4" @click="openSideBar()"> {{ vehicle ? 'Verander voertuig' : '+ Voeg voertuig toe' }} </a>
  <div v-if="vehicle" class="grid bg-gray gap-4 p-4">
    <vehicle-item :vehicle="vehicle" :no-line="true">
      <div v-show="!isSubmitting" class="text-left mt-3">
        <a class="hover:text-lightGreen cursor-pointer link-inline inline-block mr-3" for="" @click="editVehicle(vehicle)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hover:text-lightGreen cursor-pointer inline-block mt-n1 mr-0" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg
          ><span class="inline-block">Bewerken</span></a
        >
        <a class="hover:text-lightGreen cursor-pointer link-inline" for="" @click="deleteVehicle(index)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hover:text-lightGreen cursor-pointer inline-block mt-n1 mr-n1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Verwijder</a
        >
      </div>
    </vehicle-item>
    <div v-show="!vehicle" class="font-semibold text-lg">Geen voertuig geselecteerd</div>
  </div>

  <vehicle-side-bar v-model:side-bar-state="sideBarState" :title="sideBarState.state === 'edit' ? 'Bewerk voertuig' : 'Voertuig toevoegen'" @addCreatedVehicle="addCreatedVehicle($event)" />
</template>

<script lang="ts">
import VehicleSiderbar from '@/components/insurances/travelAssistance/vehicleSideBar.vue'
import VehicleItem from '@/components/insurances/travelAssistance/vehicleItem.vue'
import { sideBarState } from 'vue-3-component-library'

import { ErrorMessage, useField } from 'vee-validate'
import { computed, defineComponent, ref } from 'vue'
import { Vehicle } from '@/serializer/Vehicle'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'SelectVehicle',
  components: {
    'vehicle-side-bar': VehicleSiderbar,
    'vehicle-item': VehicleItem,
    ErrorMessage,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    rules: {
      type: [Object, String, Function],
      default: '',
      required: false,
    },
  },
  setup(props) {
    const { value: vehicle } = useField<Vehicle | undefined>(props.id, props.rules, {
      initialValue: undefined,
    })
    const sideBarState = ref<sideBarState<Vehicle>>({ state: 'hide' })

    const isDisplay = ref<boolean>(false)

    const openSideBar = () => {
      sideBarState.value = { state: 'new' }
    }
    const addCreatedVehicle = (vehicleEvent: Vehicle) => {
      vehicle.value = vehicleEvent
    }

    const deleteVehicle = () => {
      vehicle.value = undefined
    }

    const vehicleToEdit = ref<Vehicle>()
    const isEdit = ref<boolean>(false)

    const editVehicle = (editVehicle: Vehicle) => {
      sideBarState.value = {
        state: 'edit',
        entity: editVehicle,
      }
    }

    const store = useStore()

    const isSubmitting = computed((): boolean => {
      return store.state.insurance.isSubmittingState
    })

    return {
      addCreatedVehicle,
      deleteVehicle,
      vehicleToEdit,
      sideBarState,
      isSubmitting,
      openSideBar,
      editVehicle,
      isDisplay,
      vehicle,
      isEdit,
    }
  },
})
</script>
