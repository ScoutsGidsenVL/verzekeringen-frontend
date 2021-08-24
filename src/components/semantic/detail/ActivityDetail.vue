<template>
  <p class="font-semibold">Activiteit</p>
  <div class="md:ml-20 xs:ml-5 sm:ml-5">
    <label-output v-if="nature" label="Aard van activiteit" :text="nature" />
    <label-output v-if="country" label="Land" :text="country" />
    <label-output v-if="location && location.postalCode" label="Locatie" :text="location.postalCode + ' ' + location.city" />
    <label-output v-if="groupSize" label="Aantal extra te verzekeren personen" :text="groupSize.label" />
    <label-output v-if="eventSize" label="Grootte van evenement" :text="eventSize.label" />
  </div>
</template>

<script lang="ts">
import LabelOutput from '@/components/semantic/LabelOutput.vue'
import { defineComponent, PropType } from 'vue'
import { Location } from '@/serializer/Location'
import { InputTypes } from '@/enums/inputTypes'
import { GroupSize } from '@/serializer/GroupSize'
import { EventSize } from '@/serializer/EventSize'

export default defineComponent({
  name: 'ActivityDetail',
  components: {
    'label-output': LabelOutput,
  },
  props: {
    nature: {
      type: String,
      default: '',
    },
    groupSize: {
      type: Object as PropType<GroupSize>,
    },
    eventSize: {
      type: Object as PropType<EventSize>,
    },
    location: Object as PropType<Location>,
    country: String,
  },
  setup() {
    return {
      InputTypes,
    }
  },
})
</script>
