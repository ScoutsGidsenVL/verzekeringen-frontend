<template>
  VEHICLE ITEM
  <div v-if="vehicle" class="w-96">
    <div>
      <strong>Merk</strong>
      <p>{{ vehicle.brand }}</p>
    </div>

    <div class="mt-3">
      <strong>Nummerplaat</strong>
      <p>{{ vehicle.licensePlate }}</p>
    </div>

    <div class="mt-3">
      <strong>Nummerplaat</strong>
      <p>{{ vehicle.licensePlate }}</p>
    </div>

    <div class="mt-3">
      <strong>Bouwjaar</strong>
      <p>{{ vehicle.constructionYear }}</p>
    </div>

    <div class="mt-3">
      <strong>Chasisnummer</strong>
      <p>{{ vehicle.chassisNumber }}</p>
    </div>

    <div class="mt-3">
      <strong>Type</strong>
      <p>{{ vehicle.type }}</p>
    </div>

    <div class="mt-3">
      <strong>Aanhangwagen</strong>
      <p v-if="vehicle.trailer">Ja</p>
      <p v-if="!vehicle.trailer">Nee</p>
    </div>

    <slot />
    <hr class="border-t-2 border-black" />
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
  },
})
</script>
