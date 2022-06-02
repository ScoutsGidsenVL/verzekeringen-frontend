<template>
  <div>
    <p>{{ user.firstName + ' ' + (user.lastName ? user.lastName : '') }}</p>
  </div>

  <div>
    <p>{{ user.email }}</p>
  </div>

  <phone-number :has-warning="true" :phone-number="user.phoneNumber" />
  
  <label-output label="Lidnummer" :text="user.membershipNumber" />
</template>

<script lang="ts">
import { ResponsibleMember } from '@/serializer/ResponsibleMember'
import LabelOutput from '@/components/semantic/LabelOutput.vue'
import { defineComponent, PropType, ref, watch } from 'vue'
import { InputTypes } from '@/enums/inputTypes'
import store from '@/store/store'
import PhoneNumber from '@/components/semantic/PhoneNumber.vue'

export default defineComponent({
  name: 'InsuranceApplicant',
  components: {
    'label-output': LabelOutput,
    'phone-number': PhoneNumber,
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
