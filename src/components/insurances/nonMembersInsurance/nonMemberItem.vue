<template>
  <div class="w-96">
    <hr class="border-t-2 border-black" />
    <label-output label="Naam" :text="'Jeroen'" />
    <label-output label="Adres" :text="'Jeroen'" />
    <label-output label="Geboortedatum" :text="'Jeroen'" />
    <hr class="border-t-2 border-black" />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import LabelOutput from '@/components/semantic/LabelOutput.vue'

export default defineComponent({
  name: 'NonMemberItem',
  components: {
    'label-output': LabelOutput,
  },
  props: {
    nonMember: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  setup() {},
})
</script>
