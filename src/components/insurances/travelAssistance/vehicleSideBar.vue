<template>
  <div>
    <base-side-bar
      :selection="selected"
      :is-display="sideBarState.state !== 'hide'"
      name="Vehicle"
      :title="title"
      :options="['Nieuw', 'Bestaand']"
      @options="changeSideBar"
      @hideSidebar="closeSideBar"
    >
      <form
        :class="{ 'd-flex': sideBarState.state === 'new' || sideBarState.state === 'edit', 'd-none': sideBarState.state === 'list' }"
        id="addNewVehicle"
        class="flex-col relative overflow-y-scroll h-full"
        @submit.prevent="onSubmit"
      >
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
            id="type"
            class="custom"
            :object="true"
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
            id="trailer"
            :object="true"
            track-by="label"
            value-prop="value"
            :repository="TrailerRepository"
            :options="trailers"
            label="Aanhangwagen"
            rules="required"
            placeholder="Selecteer aanhangwagen"
          />
        </div>

        <div class="mt-5 py-4 sticky bottom-0 bg-white">
          <custom-button :text="sideBarState.state === 'edit' ? 'Bewerk' : 'Voeg toe'" />
        </div>
      </form>

      <form :class="{ 'd-flex': sideBarState.state === 'list', 'd-none': sideBarState.state === 'new' || sideBarState.state === 'edit' }" class="flex-col h-full" @submit.prevent="onSubmit">
        <div>
          <search-input v-model:loading="loading" name="search" placeholder="Zoek op merk" :repository="VehicleRepository" @fetchedOptions="fetchedOptions($event)" />
        </div>

        <div class="h-full overflow-y-scroll mt-4 pb-24">
          <hr v-if="fetchedVehicles.length > 0" class="mt-4 border-t-2 w-96 border-black pb-4" />
          <div v-for="vehicle in fetchedVehicles" :key="vehicle.id" class="w-96">
            <vehicle-item :vehicle="vehicle">
              <div>
                <div class="pb-4 text-right">
                  <div><custom-button type="button" text="Kies" @click="setVehicle(vehicle)" /></div>
                </div>
              </div>
            </vehicle-item>
          </div>
        </div>
      </form>
    </base-side-bar>
  </div>
</template>

<script lang="ts">
import { ResponsibleMember } from '@/serializer/ResponsibleMember'
import RepositoryFactory from '@/repositories/repositoryFactory'
import BaseSideBar, { sideBarState } from '@/components/semantic/BaseSideBar.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import SearchInput from '@/components/inputs/SearchInput.vue'
import CustomButton from '@/components/CustomButton.vue'
import { computed, defineComponent, PropType, ref, toRefs, watch } from 'vue'

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
import { scrollToFirstError, useFormSendWithSuccess } from '@/veeValidate/helpers'

export interface vehicleSideBar {
  vehicle: Vehicle
}

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
    sideBarState: {
      type: Object as PropType<sideBarState<Vehicle>>,
      required: true,
      default: () => {
        'hide'
      },
    },
  },
  emits: ['update:sideBarState', 'addCreatedVehicle', 'updateMemberInList'],
  setup(props, context) {
    const store = useStore()
    const user = ref<ResponsibleMember>(store.getters.user)
    const { resetForm, handleSubmit, validate, meta, values } = useForm<Vehicle>({ initialValues: { trailer: { id: '0', value: '0', label: 'Geen' } } })
    const { formSendWithSuccess } = useFormSendWithSuccess<Vehicle>(meta)
    const selected = computed(() => (props.sideBarState.state === 'list' ? 'BestaandVehicle' : 'NieuwVehicle'))
    const selectedVehicle = ref<Vehicle>({})
    const fetchedVehicles = ref<Array<Vehicle>>([])
    const generalInsuranceState = computed(() => {
      return store.state.insurance.generalInsuranceState
    })
    const loading = ref<boolean>(false)
    const { sideBarState } = toRefs(props)

    watch(sideBarState, (value: sideBarState<Vehicle>) => {
      if (value.state === 'edit') {
        formSendWithSuccess.value = false
        resetForm({
          values: {
            id: value.entity.id,
            type: value.entity.type,
            brand: value.entity.brand,
            licensePlate: value.entity.licensePlate,
            constructionYear: value.entity.constructionYear,
            chassisNumber: value.entity.chassisNumber,
            trailer: value.entity.trailer,
            group: generalInsuranceState.value.group.id,
          },
        })
      }

      if (value.state === 'new') {
        formSendWithSuccess.value = false
        resetForm({
          values: {
            id: '',
            type: undefined,
            brand: '',
            licensePlate: '',
            constructionYear: '',
            chassisNumber: '',
            trailer: { id: '0', value: '0', label: 'Geen' },
            group: generalInsuranceState.value.group.id,
          },
          errors: {},
        })
      }
    })

    const onSubmit = async () => {
      await validate().then((validation: any) => scrollToFirstError(validation, 'addNewVehicle'))
      handleSubmit(async (values: Vehicle) => {
        if (props.sideBarState.state === 'new' || props.sideBarState.state === 'edit') {
          values.group = generalInsuranceState.value.group.id
          const vehicle = ref<Vehicle>({
            id: values.id,
            type: values.type,
            brand: values.brand,
            licensePlate: values.licensePlate,
            constructionYear: values.constructionYear,
            chassisNumber: values.chassisNumber,
            trailer: values.trailer,
            group: generalInsuranceState.value.group.id,
          })

          if (props.sideBarState.state === 'edit') {
            await updateVehicle(vehicle.value)
          } else {
            await postVehicle(vehicle.value)
          }
        }

        closeSideBar()
      })()
    }

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
          resetForm()
        })
    }

    const updateVehicle = (data: Vehicle) => {
      if (data.id) {
        RepositoryFactory.get(VehicleRepository)
          .update(data.id, data)
          .then((completed: Vehicle) => {
            selectedVehicle.value = completed
            context.emit('addCreatedVehicle', selectedVehicle.value)
            selectedVehicle.value = {}
            resetForm()
          })
      }
    }

    const vehicleTypes = ref<VehicleType[]>([])

    const getVehicleTypes = () => {
      RepositoryFactory.get(VehicleTypeRepository)
        .getArray()
        .then((result: any) => {
          vehicleTypes.value = result
        })
        .catch(() => {
          RepositoryFactory.get(VehicleTypeRepository)
            .getArray()
            .then((result: any) => {
              vehicleTypes.value = result
            })
        })
    }

    const closeSideBar = () => {
      context.emit('update:sideBarState', { state: 'hide' })
    }

    const changeSideBar = (options: 'NieuwVehicle' | 'BestaandVehicle') => {
      if (options === 'NieuwVehicle') {
        context.emit('update:sideBarState', { state: 'new' })
      }

      if (options === 'BestaandVehicle') {
        context.emit('update:sideBarState', { state: 'list' })
      }
    }

    const trailers = ref<VehicleType[]>([])

    const getTrailers = () => {
      RepositoryFactory.get(TrailerRepository)
        .getArray()
        .then((result: any) => {
          trailers.value = result
        })
        .catch(() => {
          RepositoryFactory.get(TrailerRepository)
            .getArray()
            .then((result: any) => {
              trailers.value = result
            })
        })
    }

    const fetchedOptions = (options: any) => {
      fetchedVehicles.value = []
      options.forEach((vehicle: any) => {
        fetchedVehicles.value.push(vehicle)
      })
      loading.value = false
    }

    const setVehicle = (vehicle: Vehicle) => {
      if (selected.value === 'BestaandVehicle') {
        context.emit('addCreatedVehicle', vehicle)
      }
      closeSideBar()
    }

    getVehicleTypes()
    getTrailers()

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
      onSubmit,
      user,
      values,
      vehicleTypes,
      trailers,
      generalInsuranceState,
      loading,
      changeSideBar,
      closeSideBar,
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
