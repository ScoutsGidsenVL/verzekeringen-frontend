<template>
  <form @submit="onSubmit">
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
          label="Gemeente"
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

    <div>
      <custom-headline-2 text="Opmerkingen" />
      <div class="px-5">
        <custom-input :type="InputTypes.TEXT_AREA" name="comment" label="" />
      </div>
    </div>
    <div class="flex gap-3 px-5 mt-5 items-center">
      <custom-button type="button" text="Vorige" @click="back()" />
      <custom-button text="Volgende" />
      <a v-if="!isEdit" class="link-inline cursor-pointer" @click="saveAsDraft()">Opslaan</a>
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
import { InsuranceTypeRepos, InsuranceTypes } from '@/enums/insuranceTypes'
import { useRoute } from 'vue-router'
import router from '@/router'

type eventInsuranceFormType = {
  nature: string
  location: Location
  eventSize: number
  comment: string
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
    const route = useRoute()

    const store = useStore()
    const data: any = store.getters.getCurrentInsuranceState
    const { handleSubmit, values } = useForm<eventInsuranceFormType>({
      initialValues: {
        nature: data.nature ? data.nature : '',
        location: data.location ? data.location : '',
        eventSize: data.eventSize ? data.eventSize : '',
        comment: data.comment ? data.comment : '',
      },
    })
    const isEdit = !!route.params.id

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
          comment: values.comment ? values.comment : '',
        },
      })

      //@ts-ignore
      RepositoryFactory.get(InsuranceTypeRepos[store.getters.insuranceTypeState])
        //@ts-ignore
        .getCalculatedCost(eventInsurance.value)
        .then((cost: any) => {
          eventInsurance.value.totalCost = cost

          store.dispatch('setEventState', eventInsurance.value).then(() => {
            store.dispatch('setHolderState', HolderStates.DETAIL)
          })
        })
    })

    const back = () => {
      store.dispatch('setHolderState', HolderStates.GENERAL)
    }

    const insuranceTypeState = computed((): InsuranceTypes => {
      return store.state.insurance.insuranceTypeState
    })

    const saveAsDraft = () => {
      const draftData = ref<EventInsurance>({
        ...generalInsuranceState.value,
        ...{
          nature: values.nature,
          location: values.location,
          eventSize: values.eventSize,
          comment: values.comment ? values.comment : '',
        },
      })

      //@ts-ignore
      RepositoryFactory.get(InsuranceTypeRepos[insuranceTypeState.value])
        //@ts-ignore
        .createDraft(draftData.value, insuranceTypeState.value)
        .then(() => {
          router.push('/home')
        })
    }

    return {
      eventSizes,
      BelgianCitySearchRepository,
      InputTypes,
      onSubmit,
      generalInsuranceState,
      values,
      back,
      saveAsDraft,
      isEdit,
    }
  },
})
</script>
