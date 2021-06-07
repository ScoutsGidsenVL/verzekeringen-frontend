<template>
  <vehicle-item />
  <div class="mt-2 cursor-pointer text-lightGreen" @click="openSideBar()">
    <strong> + Selecteer voertuig </strong>
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
