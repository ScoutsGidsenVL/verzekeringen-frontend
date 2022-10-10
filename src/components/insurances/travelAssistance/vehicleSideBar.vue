<template>
  <div>
    <base-side-bar :selection="selected" :is-display="sideBarState.state !== 'hide'" name="Vehicle" :title="title" :options="options" @options="changeSideBar" @hideSidebar="closeSideBar">
      <form
        id="addNewVehicle"
        :class="{ 'd-flex': sideBarState.state === 'new' || sideBarState.state === 'edit', 'd-none': sideBarState.state === 'list' }"
        class="flex-col relative overflow-y-scroll overflow-x-hidden h-full"
        @submit.prevent="onSubmit"
      >
        <div class="flex-col overflow-y-scroll overflow-x-hidden px-4 h-full">
          <div class="w-100">
            <custom-input :type="InputTypes.TEXT" rules="required" name="brand" label="Merk" />
          </div>
          <div class="w-100 mt-4 w-">
            <custom-input :maxlength="10" :type="InputTypes.TEXT" rules="required" name="licensePlate" label="Nummerplaat" />
          </div>
          <div class="w-100 mt-4">
            <custom-input :type="InputTypes.TEXT" rules="required" name="constructionYear" maxlength="4" label="Bouwjaar" />
          </div>

          <div class="w-100 mt-4">
            <custom-input :maxlength="20" :type="InputTypes.TEXT" rules="required" name="chassisNumber" label="Chassisnummer" />
          </div>

          <div class="w-100">
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

          <!-- {{trailers}} -->
          <div v-if="insuranceTypeState !== 'REIS_BIJSTAND'" class="w-100 mb-32">
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

          <div v-else class="w-100 mb-32">
            <multi-select
              id="trailer"
              :object="true"
              track-by="label"
              value-prop="value"
              :repository="TrailerRepository"
              :options="trailersReisbijstand"
              label="Aanhangwagen"
              rules="required"
              placeholder="Selecteer aanhangwagen"
            />
          </div>
        </div>

        <div class="ml-4 py-4 sticky bottom-0 bg-white">
          <custom-button :text="sideBarState.state === 'edit' ? 'Bewerk' : 'Voeg toe'" />
        </div>
      </form>

      <form :class="{ 'd-flex': sideBarState.state === 'list', 'd-none': sideBarState.state === 'new' || sideBarState.state === 'edit' }" class="flex-col h-full px-4 pt-3" @submit.prevent="onSubmit">
        <div>
          <search-input v-model:loading="loading" name="search" placeholder="Zoek op merk" :repository="VehicleRepository" @fetchedOptions="fetchedOptions($event)" />
        </div>

        <div class="h-full overflow-y-scroll mt-4 pb-44">
          <hr v-if="fetchedVehicles.length > 0" class="mt-4 border-t-2 w-100 border-black pb-4" />
          <div v-for="vehicle in fetchedVehicles" :key="vehicle.id" class="w-100">
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
import VehicleItem from '@/components/insurances/travelAssistance/vehicleItem.vue'
import { scrollToFirstError, useFormSendWithSuccess } from '@/veeValidate/helpers'
import { computed, defineComponent, PropType, ref, toRefs, watch } from 'vue'
import { VehicleTypeRepository } from '@/repositories/vehicleTypeRepository'
import { VehicleRepository } from '@/repositories//vehicleRepository'
import { TrailerRepository } from '@/repositories/trailerRepository'
import { ResponsibleMember } from '@/serializer/ResponsibleMember'
import RepositoryFactory from '@/repositories/repositoryFactory'
import CustomInput from '@/components/inputs/CustomInput.vue'
import SearchInput from '@/components/inputs/SearchInput.vue'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import CustomButton from '@/components/CustomButton.vue'
import { VehicleType } from '@/serializer/VehicleType'
import { InputTypes } from '@/enums/inputTypes'
import { Vehicle } from '@/serializer/Vehicle'
import { useForm } from 'vee-validate'
import { useStore } from 'vuex'
import { BaseSideBar, sideBarState, option } from 'vue-3-component-library'
import { InsuranceTypes } from '@/enums/insuranceTypes'

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
    const options = ref<option[]>([
      { text: 'Nieuw', value: 'Nieuw' },
      { text: 'Uit eerdere aanvragen', value: 'Bestaand' },
    ])
    const store = useStore()
    const user = ref<ResponsibleMember>(store.getters.user)
    const { resetForm, handleSubmit, validate, meta, values, isSubmitting } = useForm<Vehicle>({ initialValues: { trailer: { id: '0', value: '0', label: 'Geen' } } })
    // @ts-ignore
    const { formSendWithSuccess } = useFormSendWithSuccess<Vehicle>(meta)
    const selected = computed(() => (props.sideBarState.state === 'list' ? 'BestaandVehicle' : 'NieuwVehicle'))
    const selectedVehicle = ref<Vehicle>({})
    const fetchedVehicles = ref<Array<Vehicle>>([])
    const generalInsuranceState = computed(() => {
      return store.state.insurance.generalInsuranceState
    })
    const loading = ref<boolean>(false)
    const { sideBarState } = toRefs(props)

    const insuranceTypeState = computed((): InsuranceTypes => {
      return store.state.insurance.insuranceTypeState
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

    const postVehicle = async (data: Vehicle) => {
      await RepositoryFactory.get(VehicleRepository)
        .create(data)
        .then((completed: Vehicle) => {
          selectedVehicle.value = completed
          context.emit('addCreatedVehicle', selectedVehicle.value)
          selectedVehicle.value = {}
          resetForm()
        })
    }

    const updateVehicle = async (data: Vehicle) => {
        await RepositoryFactory.get(VehicleRepository)
          .update(data.id ? data.id : '', data)
          .then((completed: Vehicle) => {
            selectedVehicle.value = completed
            context.emit('addCreatedVehicle', selectedVehicle.value)
            selectedVehicle.value = {}
            resetForm()
          })
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
    const trailersReisbijstand = ref<any>(
      [ 
        { 'id': '0', 'value': '0', 'label': 'Geen' }, 
        { 'id': '1', 'value': '1', 'label': 'Aanhangwagen (zonder meerprijs)' }
      ])

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

    watch(
      () => isSubmitting.value,
      () => {
        store.dispatch('setIsSubmittingState', isSubmitting.value)
      }
    )

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

    return {
      insuranceTypeState,
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
      options,
      trailersReisbijstand
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
