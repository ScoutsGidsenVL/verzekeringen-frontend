<template>
  <div>
    <base-side-bar v-model:isDisplay="display" v-model:selection="selected" :title="title" :options="['Nieuw', 'Bestaand']">
      <div v-if="selected === 'option-1'" class="mt-4">
        <form @submit="onSubmit">
          <div class="mt-5">
            NIEUW

            <div class="w-96">
              <custom-input :type="InputTypes.TEXT" rules="required" name="firstName" label="Merk" />
            </div>

            <div class="w-96 mt-4">
              <custom-input :type="InputTypes.TEXT" rules="required" name="firstName" label="Nummerplaat" />
            </div>
            <custom-button text="Voeg toe" />
          </div>
        </form>
      </div>
      <div v-if="selected === 'option-2'">
        <form @submit="onSubmit">
          <div>
            <hr v-if="selectedVehicle.licensePlate" class="mt-4 border-t-2 border-black" />
            BETSAAND
          </div>
          <div class="mt-5"><custom-button text="Voeg toe" /></div>
        </form>
      </div>
    </base-side-bar>
  </div>
</template>

<script lang="ts">
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import { NonMemberRepository } from '@/repositories/nonMemberRepository'
import { ResponsibleMember } from '@/serializer/ResponsibleMember'
import RepositoryFactory from '@/repositories/repositoryFactory'
import BaseSideBar from '@/components/semantic/BaseSideBar.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import CustomButton from '@/components/CustomButton.vue'
import { defineComponent, ref, watch } from 'vue'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useStore } from 'vuex'
import { Vehicle } from '@/serializer/Vehicle'

export default defineComponent({
  name: 'VehicleSideBar',
  components: {
    'custom-button': CustomButton,
    'base-side-bar': BaseSideBar,
    'custom-input': CustomInput,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    isDisplay: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, context) {
    const store = useStore()
    const user = ref<ResponsibleMember>(store.getters.user)
    const display = ref<boolean>(props.isDisplay)
    const { handleSubmit } = useForm<Vehicle>()
    const selected = ref<string>('option-1')
    const selectedVehicle = ref<Vehicle>({})

    watch(
      () => props.isDisplay,
      () => {
        display.value = props.isDisplay
      }
    )

    watch(
      () => display.value,
      () => {
        context.emit('update:isDisplay', display.value)
      }
    )

    const onSubmit = handleSubmit(async (values: Vehicle) => {
      if (selected.value === 'option-1') {
        const vehicle = ref<Vehicle>({
          type: values.type,
          brand: values.brand,
          licensePlate: values.licensePlate,
          constructionYear: values.constructionYear,
          chassisNumber: values.chassisNumber,
          trailer: values.trailer,
        })
        postVehicle(vehicle.value)
      }

      if (selected.value === 'option-2') {
        context.emit('addCreatedVehicle', selectedVehicle.value)
      }

      selectedVehicle.value = {}
    })

    const addVehicle = (vehicle: any) => {
      if (vehicle) {
        selectedVehicle.value = vehicle
      }
    }

    const postVehicle = (data: Vehicle) => {
      RepositoryFactory.get(NonMemberRepository)
        .create(data)
        .then((completed: Vehicle) => {
          selectedVehicle.value = completed
          context.emit('addCreatedVehicle', selectedVehicle.value)
          selectedVehicle.value = {}
        })
    }

    return {
      BelgianCitySearchRepository,
      NonMemberRepository,
      selectedVehicle,
      addVehicle,
      InputTypes,
      selected,
      display,
      onSubmit,
      user,
    }
  },
})
</script>
