<template>
  <form @submit="onSubmit">
    <custom-headline-2 text="Activiteit" />
    <div class="px-5">
      <custom-input :type="InputTypes.TEXT_AREA" rules="required" name="nature" label="Aard van de activiteit" />

      <div class="mt-5">
        <strong>
          <label>Ga je naar het buitenland?</label>
        </strong>
        <form action="">
          <div class="flex gap-7">
            <div>
              <input :id="1" v-model="selected" class="cursor-pointer" type="radio" :name="1" value="option-1" />
              <label :for="index" class="ml-2">ja</label>
            </div>

            <div>
              <input :id="2" v-model="selected" class="cursor-pointer" type="radio" :name="2" value="option-2" />
              <label :for="index" class="ml-2">nee</label>
            </div>
          </div>
        </form>
      </div>

      <div v-if="selected === 'option-2'" class="w-96">
        <multi-select
          id="postCodeCity"
          track-by="location"
          value-prop="value"
          :repository="BelgianCitySearchRepository"
          :options="[]"
          :searchable="true"
          label="Gemeenten"
          rules="required"
          placeholder="Zoek op naam/postcode"
        />
      </div>

      <div v-if="selected === 'option-1'" class="w-96 mt-4">
        <custom-input :type="InputTypes.TEXT" rules="required" name="country" label="Land" value="België" />
      </div>
    </div>

    <div class="mt-3">
      <custom-headline-2 text="Niet leden" />
    </div>

    <div class="px-5">
      <select-non-member id="nonMembers" rules="required" />
    </div>

    <div class="px-5 mt-5">
      <custom-button text="Volgende" />
    </div>
  </form>
</template>

<script lang="ts">
import SelectNonMember from '@/components/insurances/nonMembersInsurance//selectNonMember.vue'
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import { NonMemberInsurance } from '@/serializer/insurances/NonMemberInsurance'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import CustomButton from '@/components/CustomButton.vue'
import { computed, defineComponent, ref } from 'vue'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'NonMember',
  components: {
    'select-non-member': SelectNonMember,
    'custom-headline-2': CustomHeadline2,
    'custom-button': CustomButton,
    'multi-select': MultiSelect,
    'custom-input': CustomInput,
  },
  setup() {
    const store = useStore()
    const { handleSubmit } = useForm()
    const selected = ref<string>('option-2')

    const generalInsuranceState = computed(() => {
      return store.state.insurance.generalInsuranceState
    })

    const onSubmit = handleSubmit(async (values: any) => {
      const nonMember = ref<NonMemberInsurance>({
        ...generalInsuranceState.value,
        ...{
          nature: values.nature,
          postCodeCity: values.postCodeCity ? values.postCodeCity : undefined,
          country: values.country ? values.country : undefined,
          nonMembers: values.nonMembers ? values.nonMembers : [],
        },
      })

      store.dispatch('setNonMemberState', nonMember)
      store.dispatch('setHolderState', HolderStates.DETAIL)
    })

    return {
      BelgianCitySearchRepository,
      InputTypes,
      selected,
      onSubmit,
    }
  },
})
</script>
