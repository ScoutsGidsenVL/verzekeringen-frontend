<template>
  <div>
    <base-side-bar name="Vehicle" v-model:isDisplay="display" v-model:selection="selected" :title="title" :options="['Nieuw', 'Bestaand']">
      <div v-if="selected === 'NieuwVehicle'" class="mt-4">
        <form @submit="onSubmit">
          <div class="custom-container mt-5">
            <div class="w-96">
              <custom-input :type="InputTypes.TEXT" rules="required" name="brand" label="Merk" />
            </div>

            <div class="w-96 mt-4">
              <custom-input :maxlength="10" :type="InputTypes.TEXT" rules="required" name="licensePlate" label="Nummerplaat" />
            </div>

            <div class="w-96 mt-4">
              <custom-input :type="InputTypes.TEXT" rules="required" name="constructionYear" maxlength="4" label="Bouwjaar">
                <div class="pb-3">
                  Bouwjaar ouder 10 jaar geleden? Het heeft weinig zin om een oud voertuig te verzekeren. Bij een schade zal de verzekeringsmaatschappij nooit een bedrag uitkeren dat hoger is dan de
                  waarde. (Meestal erg laag voor een oude auto.)
                </div>
              </custom-input>
            </div>

            <div class="w-96 mt-4">
              <custom-input :maxlength="20" :type="InputTypes.TEXT" rules="required" name="chassisNumber" label="Chassisnummer" />
            </div>

            <div class="w-96">
              <multi-select
                class="custom"
                :object="true"
                id="type"
                track-by="label"
                value-prop="value"
                :repository="VehicleTypeRepository"
                :options="vehicleTypes"
                label="Type"
                rules="required"
                placeholder="Selecteer type"
              />
            </div>

            <div class="w-96">
              <multi-select
                :object="true"
                id="trailer"
                track-by="label"
                value-prop="value"
                :repository="TrailerRepository"
                :options="trailers"
                label="Aanhangwagen"
                rules="required"
                placeholder="Selecteer aanhangwagen"
              />
            </div>

            <div class="pt-4 w">
              <custom-button text="Voeg toe" />
            </div>
          </div>
        </form>
      </div>
      <div v-if="selected === 'BestaandVehicle'">
        <form @submit="onSubmit">
          <div>
            <div>
              <search-input name="search" placeholder="Zoek op merk" v-model:loading="loading" :repository="VehicleRepository" @fetchedOptions="fetchedOptions($event)" />
            </div>

            <div class="custom-container mt-4">
              <hr v-if="fetchedVehicles.length > 0" class="mt-4 border-t-2 w-96 border-black pb-4" />
              <div class="w-96" v-for="vehicle in fetchedVehicles" :key="vehicle.id">
                <vehicle-item :vehicle="vehicle">
                  <div>
                    <div class="pb-4 text-right">
                      <div><custom-button text="Kies" @click="setVehicle(vehicle)" /></div>
                    </div>
                  </div>
                </vehicle-item>
              </div>
            </div>
          </div>
        </form>
      </div>
    </base-side-bar>
  </div>
</template>

<script lang="ts">
import { ResponsibleMember } from '@/serializer/ResponsibleMember'
import RepositoryFactory from '@/repositories/repositoryFactory'
import BaseSideBar from '@/components/semantic/BaseSideBar.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import SearchInput from '@/components/inputs/SearchInput.vue'
import CustomButton from '@/components/CustomButton.vue'
import { computed, defineComponent, ref, watch } from 'vue'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useStore } from 'vuex'
import { Vehicle } from '@/serializer/Vehicle'
import { VehicleType } from '@/serializer/VehicleType'
import { VehicleTypeRepository } from '@/repositories/vehicleTypeRepository'
import { VehicleRepository } from '@/repositories//vehicleRepository'
import { TrailerRepository } from '@/repositories/trailerRepository'
import VehicleItem from '@/components/insurances/travelAssistance/vehicleItem.vue'
import MultiSelect from '@/components/inputs/MultiSelect.vue'

export default defineComponent({
  name: 'VehicleSideBar',
  components: {
    'custom-button': CustomButton,
    'base-side-bar': BaseSideBar,
    'custom-input': CustomInput,
    'multi-select': MultiSelect,
    'vehicle-item': VehicleItem,
    'search-input': SearchInput,
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
    const { handleSubmit, values } = useForm<Vehicle>()
    const selected = ref<string>('NieuwVehicle')
    const selectedVehicle = ref<Vehicle>({})
    const fetchedVehicles = ref<Array<Vehicle>>([])
    const generalInsuranceState = computed(() => {
      return store.state.insurance.generalInsuranceState
    })
    const loading = ref<boolean>(false)

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
      if (selected.value === 'NieuwVehicle') {
        const vehicle = ref<Vehicle>({
          type: values.type,
          brand: values.brand,
          licensePlate: values.licensePlate,
          constructionYear: values.constructionYear,
          chassisNumber: values.chassisNumber,
          trailer: values.trailer,
          group: generalInsuranceState.value.group.name,
        })
        postVehicle(vehicle.value)
      }

      if (selected.value === 'BestaandVehicle') {
        context.emit('addCreatedVehicle', selectedVehicle.value)
      }

      selectedVehicle.value = {}
      display.value = false
    })

    const addVehicle = (vehicle: any) => {
      if (vehicle) {
        selectedVehicle.value = vehicle
      }
    }

    const postVehicle = (data: Vehicle) => {
      RepositoryFactory.get(VehicleRepository)
        .create(data)
        .then((completed: Vehicle) => {
          selectedVehicle.value = completed
          context.emit('addCreatedVehicle', selectedVehicle.value)
          selectedVehicle.value = {}
        })
    }

    const vehicleTypes = ref<VehicleType[]>([])

    const getVehicleTypes = () => {
      RepositoryFactory.get(VehicleTypeRepository)
        .getArray()
        .then((result: any) => {
          vehicleTypes.value = result
        })
    }

    const trailers = ref<VehicleType[]>([])

    const getTrailers = () => {
      RepositoryFactory.get(TrailerRepository)
        .getArray()
        .then((result: any) => {
          trailers.value = result
        })
    }

    getVehicleTypes()
    getTrailers()

    const fetchedOptions = (options: any) => {
      fetchedVehicles.value = []
      options.forEach((vehicle: any) => {
        fetchedVehicles.value.push(vehicle)
      })
      loading.value = false
    }

    const setVehicle = (vehicle: Vehicle) => {
      selectedVehicle.value = vehicle
    }

    return {
      VehicleTypeRepository,
      TrailerRepository,
      VehicleRepository,
      selectedVehicle,
      fetchedVehicles,
      fetchedOptions,
      addVehicle,
      setVehicle,
      InputTypes,
      selected,
      display,
      onSubmit,
      user,
      values,
      vehicleTypes,
      trailers,
      generalInsuranceState,
      loading,
    }
  },
})
</script>

<style lang="scss" scoped>
.custom-container {
  max-height: 650px;
  overflow-y: scroll;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #ececec;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #212529;
  border-radius: 10px;
}
.custom .multiselect-input {
  min-height: 60px !important;
}
</style>

<style lang="scss">
.custom .multiselect-input {
  min-height: 60px !important;
}
</style>
