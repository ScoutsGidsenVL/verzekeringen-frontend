<template>
  <form id="EventInsurance" @submit.prevent="onSubmit">
    <custom-headline-2 text="Activiteit" />
    <div class="md:ml-20">
      <custom-input :type="InputTypes.TEXT_AREA" rules="required" name="nature" label="Aard van de activiteit" />
      <div class="mt-4">
        <strong>Land</strong>
        <div class="w-96">
          <p class="mt-2 w-96">Belgie</p>
        </div>
      </div>
      <div class="xs:w-72 md:w-96">
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
      <div class="mt-2 xs:w-72 md:w-96">
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
      <div class="md:ml-20">
        <custom-input :type="InputTypes.TEXT_AREA" name="comment" label="" />
      </div>
    </div>
    <div class="flex gap-3 md:ml-20 mt-5 items-center">
      <back-button :backToState="HolderStates.GENERAL" />

      <custom-button text="Volgende" />
      <a v-if="!isEdit" class="link-inline cursor-pointer" @click="saveAsDraft()">Opslaan</a>
      <loader :is-loading="isSavingDraft" />
    </div>
  </form>
</template>

<script lang="ts">
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import { InsuranceTypeRepos, InsuranceTypes } from '@/enums/insuranceTypes'
import { EventSizeRepository } from '@/repositories/eventSizeRepository'
import { EventInsurance } from '@/serializer/insurances/EventInsurance'
import RepositoryFactory from '@/repositories/repositoryFactory'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import BackButton from '@/components/semantic/BackButton.vue'
import { computed, defineComponent, ref, watch } from 'vue'
import { scrollToFirstError } from '@/veeValidate/helpers'
import CustomButton from '@/components/CustomButton.vue'
import Loader from '@/components/semantic/Loader.vue'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import router from '@/router'

type eventInsuranceFormType = {
  nature: string
  location: Location
  eventSize: number
  comment: string
  vvksComment: string
}

export default defineComponent({
  name: 'EventInsurance',
  components: {
    'custom-headline-2': CustomHeadline2,
    'custom-button': CustomButton,
    'multi-select': MultiSelect,
    'custom-input': CustomInput,
    'back-button': BackButton,
    Loader,
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const data: any = store.getters.getCurrentInsuranceState
    const { handleSubmit, values, isSubmitting, validate } = useForm<eventInsuranceFormType>({
      initialValues: {
        nature: data.nature ? data.nature : '',
        location: data.location ? data.location : '',
        eventSize: data.eventSize ? data.eventSize : '',
        comment: data.comment ? data.comment : '',
        vvksComment: data.vvksComment ? data.vvksComment : '',
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

    watch(
      () => isSubmitting.value,
      () => {
        store.dispatch('setIsSubmittingState', isSubmitting.value)
      }
    )

    const onSubmit = async () => {
      await validate().then((validation: any) => scrollToFirstError(validation, 'EventInsurance'))
      handleSubmit(async (values: eventInsuranceFormType) => {
        const eventInsurance = ref<EventInsurance>({
          ...generalInsuranceState.value,
          ...{
            nature: values.nature,
            location: values.location,
            eventSize: values.eventSize,
            comment: values.comment ? values.comment : '',
            vvksComment: values.vvksComment ? values.vvksComment : '',
          },
        })

        //@ts-ignore
        await RepositoryFactory.get(InsuranceTypeRepos[store.getters.insuranceTypeState])
          //@ts-ignore
          .getCalculatedCost(eventInsurance.value)
          .then((cost: any) => {
            eventInsurance.value.totalCost = cost

            store.dispatch('setEventState', eventInsurance.value).then(() => {
              store.dispatch('setHolderState', HolderStates.DETAIL)
            })
          })
      })()
    }

    const insuranceTypeState = computed((): InsuranceTypes => {
      return store.state.insurance.insuranceTypeState
    })
    const isSavingDraft = ref<boolean>(false)
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

      if (!isSavingDraft.value) {
        isSavingDraft.value = true
        //@ts-ignore
        RepositoryFactory.get(InsuranceTypeRepos[insuranceTypeState.value])
          //@ts-ignore
          .createDraft(draftData.value, insuranceTypeState.value)
          .then(() => {
            router.push('/home/verzekeringen')
          })
      }
    }

    return {
      BelgianCitySearchRepository,
      generalInsuranceState,
      isSavingDraft,
      HolderStates,
      saveAsDraft,
      eventSizes,
      InputTypes,
      onSubmit,
      values,
      isEdit,
    }
  },
})
</script>
