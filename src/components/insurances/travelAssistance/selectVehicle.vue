<template>
  <div v-if="vehicle.brand">
    <vehicle-item v-if="vehicle" :vehicle="vehicle" :no-line="true">
      <div class="text-right mt-4">
        <label @click="deleteVehicle()" class="hover:text-lightGreen cursor-pointer" for="">Verwijder</label>
      </div>
    </vehicle-item>
  </div>

  <div class="mt-2 text-lightGreen">
    <strong class="cursor-pointer" @click="openSideBar()" v-if="!vehicle.brand"> + Selecteer voertuig </strong>
    <strong class="cursor-pointer" @click="openSideBar()" v-if="vehicle.brand"> + Selecteer ander voertuig </strong>
  </div>

  <vehicle-side-bar v-model:isDisplay="isDisplay" title="Voertuig" @addCreatedVehicle="addCreatedVehicle($event)" />
</template>

<script lang="ts">
import VehicleSiderbar from '@/components/insurances/travelAssistance/vehicleSideBar.vue'
import VehicleItem from '@/components/insurances/travelAssistance/vehicleItem.vue'
import { Vehicle } from '@/serializer/Vehicle'
import { defineComponent, ref } from 'vue'
import { useField } from 'vee-validate'

export default defineComponent({
  name: 'SelectVehicle',
  components: {
    'vehicle-side-bar': VehicleSiderbar,
    'vehicle-item': VehicleItem,
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
    const { value: vehicle } = useField<Vehicle>(props.id, props.rules, {
      initialValue: {},
    })

    const isDisplay = ref<boolean>(false)

    const openSideBar = () => {
      isDisplay.value = true
    }
    const addCreatedVehicle = (vehicleEvent: Vehicle) => {
      vehicle.value = vehicleEvent
    }

    const deleteVehicle = () => {
      vehicle.value = {}
    }

    return {
      addCreatedVehicle,
      deleteVehicle,
      openSideBar,
      vehicle,
      isDisplay,
    }
  },
})
</script>
