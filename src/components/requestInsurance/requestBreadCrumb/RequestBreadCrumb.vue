<template>
  <div class="flex pt-5">
    <bread-crumb-item :index="'1'" :text="'Algemeen'" />
    <bread-crumb-item :index="'2'" :text="insuranceType" />
    <bread-crumb-item :index="'3'" :text="'Overzicht'" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import BreadCrumbItem from './BreadCrumbItem.vue'

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
})
</script>
