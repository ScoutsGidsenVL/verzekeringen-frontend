<template>
  <slot name="top"></slot>
  <div v-if="vehicle && vehicle.licensePlate" class="w-96">
    <div v-if="vehicle.brand">
      <strong>Merk</strong>
      <p>{{ vehicle.brand }}</p>
    </div>

    <div v-if="vehicle.licensePlate" class="mt-3">
      <strong>Nummerplaat</strong>
      <p>{{ vehicle.licensePlate }}</p>
    </div>

    <div v-if="vehicle.constructionYear" class="mt-3">
      <strong>Bouwjaar</strong>
      <p>{{ vehicle.constructionYear }}</p>
    </div>

    <div v-if="vehicle.chassisNumber" class="mt-3">
      <strong>Chasisnummer</strong>
      <p>{{ vehicle.chassisNumber }}</p>
    </div>

    <div v-if="vehicle.type.label" class="mt-3">
      <strong>Type</strong>
      <p>{{ vehicle.type.label }}</p>
    </div>

    <div v-if="vehicle.trailer.label" class="mt-3">
      <strong>Aanhangwagen</strong>
      <p>{{ vehicle.trailer.label }}</p>
    </div>

    <slot />
    <hr v-if="!noLine" class="border-t-2 border-black mt-3" />
  </div>
</template>

<script lang="ts">
import { Vehicle } from '@/serializer/Vehicle'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    vehicle: {
      type: Object as PropType<Vehicle>,
      required: true,
    },
    noLine: Boolean,
  },
})
</script>
