<template>
  <div class="w-96" v-if="vehicle">
    <vehicle-item :vehicle="vehicle" :no-line="true">
      <template v-slot:top>
        <div class="my-3 flex justify-end" @click="editVehicle(vehicle)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hover:text-lightGreen cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </div>
      </template>
      <div class="text-right mt-4">
        <label @click="deleteVehicle()" class="hover:text-lightGreen cursor-pointer" for="">Verwijder</label>
      </div>
    </vehicle-item>
  </div>

  <ErrorMessage :name="'vehicle'" class="text-red text-sm block mt-1 w-80" />

  <div class="mt-2 text-lightGreen">
    <strong class="cursor-pointer" @click="openSideBar()"> + Selecteer voertuig </strong>
  </div>

  <vehicle-side-bar
    v-if="isDisplay"
    v-model:isEdit="isEdit"
    :inputVehicle="vehicleToEdit"
    v-model:isDisplay="isDisplay"
    :title="isEdit ? 'Bewerk voertuig' : 'Voertuig'"
    @addCreatedVehicle="addCreatedVehicle($event)"
  />
</template>

<script lang="ts">
import VehicleSiderbar from '@/components/insurances/travelAssistance/vehicleSideBar.vue'
import VehicleItem from '@/components/insurances/travelAssistance/vehicleItem.vue'
import { Vehicle } from '@/serializer/Vehicle'
import { defineComponent, ref } from 'vue'
import { ErrorMessage, useField } from 'vee-validate'

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
      default: 'required',
      required: false,
    },
  },
  setup(props) {
    const { value: vehicle } = useField<Vehicle | undefined>(props.id, props.rules, {
      initialValue: undefined,
    })

    const isDisplay = ref<boolean>(false)

    const openSideBar = () => {
      isDisplay.value = true
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
      vehicleToEdit.value = editVehicle
      isEdit.value = true
      isDisplay.value = true
    }

    return {
      addCreatedVehicle,
      deleteVehicle,
      openSideBar,
      vehicle,
      isDisplay,
      editVehicle,
      isEdit,
      vehicleToEdit,
    }
  },
})
</script>
