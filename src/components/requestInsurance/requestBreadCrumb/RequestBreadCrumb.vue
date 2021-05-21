<template>
  <div class="flex pt-5">
    <bread-crumb-item :visibleOnState="HolderStates.GENERAL" :index="'1'" :text="'Algemeen'" />
    <bread-crumb-item :visibleOnState="HolderStates.TYPE" :index="'2'" :text="insuranceType" />
    <bread-crumb-item :visibleOnState="HolderStates.DETAIL" :index="'3'" :text="'Overzicht'" />
  </div>
</template>
<script lang="ts">
import { HolderStates } from '@/enums/holderStates'
import BreadCrumbItem from './BreadCrumbItem.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RequestBreadCrumb',
  components: {
    'bread-crumb-item': BreadCrumbItem,
  },
  props: {
    insuranceType: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {
      HolderStates,
    }
  },
})
</script>
