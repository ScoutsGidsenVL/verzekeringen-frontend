<template>
  <custom-headline-2 :text="title" />
  <slot />
  <div class="grid-cols-claims py-2 border-t-2 border-black grid opacity-0 md:opacity-100">
    <div>
      <p class="font-semibold">Datum ongeval</p>
    </div>

    <div>
      <p class="font-semibold">Slachtoffer</p>
    </div>

    <div>
      <p class="font-semibold">Groep</p>
    </div>

    <div></div>
  </div>
  <div v-if="items">
    <claim-list-item v-for="item in items" :key="item.id" :item="item" />
  </div>
  <hr class="border-t-2 border-black" />
  <div v-if="items && items.length === 0" class="text-center my-3"><i>Geen resultaten</i></div>
</template>

<script lang="ts">
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import ClaimListItem from './ClaimListItem.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ClaimList',
  components: {
    'custom-headline-2': CustomHeadline2,
    'claim-list-item': ClaimListItem,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>
