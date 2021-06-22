<template>
  <label-output label="Naam" :text="user.firstName + ' ' + (user.lastName ? user.lastName : '')" />
  <label-output label="Lidnummer" :text="user.membershipNumber" />
  <label-output label="E-mailadres" :text="user.email" />
  <label-output label="Gsm" :text="user.phoneNumber" />
</template>

<script lang="ts">
import { ResponsibleMember } from '@/serializer/ResponsibleMember'
import LabelOutput from '@/components/semantic/LabelOutput.vue'
import { defineComponent, PropType, ref, watch } from 'vue'
import { InputTypes } from '@/enums/inputTypes'
import store from '@/store/store'

export default defineComponent({
  name: 'InsuranceApplicant',
  components: {
    'label-output': LabelOutput,
  },
  props: {
    applicant: {
      type: Object as PropType<ResponsibleMember>,
    },
  },
  setup(props) {
    const user = ref<any>(props.applicant ? props.applicant : store.getters.user)

    watch(
      () => props.applicant,
      () => {
        user.value = props.applicant
      }
    )

    return {
      InputTypes,
      user,
    }
  },
})
</script>
