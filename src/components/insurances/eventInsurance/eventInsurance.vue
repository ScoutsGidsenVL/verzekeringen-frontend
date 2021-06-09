<template>
  <form @submit="onSubmit">
    {{ values }}
    <custom-headline-2 text="Activiteit" />
    <div class="px-5">
      <custom-input :type="InputTypes.TEXT_AREA" rules="required" name="nature" label="Aard van de activiteit" />
      <div class="mt-4">
        <strong>Land</strong>
        <div class="w-96">
          <p class="mt-2 w-96">Belgie</p>
        </div>
      </div>
      <div class="w-96">
        <multi-select
          id="location"
          :object="true"
          track-by="label"
          value-prop="label"
          :repository="BelgianCitySearchRepository"
          :resolve-on-load="true"
          :options="[values.location]"
          :searchable="true"
          label="Location"
          rules="required"
          placeholder="Zoek op naam/postcode"
        />
      </div>
      <div class="mt-2 w-96">
        <multi-select
          id="eventSize"
          :repository="EventSizeRepository"
          :object="true"
          track-by="label"
          value-prop="id"
          :options="eventSizes"
          label="Grootte van evenement"
          rules="required"
          placeholder="Kies"
        />
      </div>
    </div>
    <div class="px-5 mt-5">
      <custom-button text="Volgende" />
    </div>
  </form>
</template>

<script lang="ts">
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import { EventSizeRepository } from '@/repositories/eventSizeRepository'
import { EventInsurance } from '@/serializer/insurances/EventInsurance'
import RepositoryFactory from '@/repositories/repositoryFactory'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import CustomButton from '@/components/CustomButton.vue'
import { computed, defineComponent, ref } from 'vue'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useStore } from 'vuex'

type eventInsuranceFormType = {
  nature: string
  location: Location
  eventSize: number
}

export default defineComponent({
  name: 'EventInsurance',
  components: {
    'custom-headline-2': CustomHeadline2,
    'custom-button': CustomButton,
    'multi-select': MultiSelect,
    'custom-input': CustomInput,
  },
  setup() {
    const store = useStore()
    const data: any = store.getters.getCurrentInsuranceState
    const { handleSubmit, values } = useForm<eventInsuranceFormType>({
      initialValues: {
        nature: data.nature ? data.nature : '',
        location: data.location ? data.location : '',
        eventSize: data.eventSize ? data.eventSize : '',
      },
    })

    const generalInsuranceState = computed(() => {
      return store.state.insurance.generalInsuranceState
    })

    const eventSizes = ref<any[]>([])
    const fetchEventSizes = () => {
      RepositoryFactory.get(EventSizeRepository)
        .getArray()
        .then((result: any) => {
          eventSizes.value = result
        })
    }

    fetchEventSizes()

    const onSubmit = handleSubmit(async (values: eventInsuranceFormType) => {
      const eventInsurance = ref<EventInsurance>({
        ...generalInsuranceState.value,
        ...{
          nature: values.nature,
          location: values.location,
          eventSize: values.eventSize,
          comment: data.comment,
        },
      })
      store.dispatch('setEventState', eventInsurance.value).then(() => {
        store.dispatch('setHolderState', HolderStates.DETAIL)
      })
    })

    return {
      eventSizes,
      BelgianCitySearchRepository,
      InputTypes,
      onSubmit,
      generalInsuranceState,
      values,
    }
  },
})
</script>
