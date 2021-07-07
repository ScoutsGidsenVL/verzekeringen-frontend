<template>
  <custom-headline-2 :text="title" />
  <slot />
  <div class="grid-cols-list py-2 border-t-2 border-black grid opacity-0 md:opacity-100">
    <div>
      <p class="font-semibold">Aanvraag datum</p>
    </div>
    <div>
      <p class="font-semibold">Wanneer</p>
    </div>
    <div>
      <p class="font-semibold">Groep</p>
    </div>
    <div>
      <p class="font-semibold">Type</p>
    </div>
    <div>
      <p class="font-semibold">Status</p>
    </div>
  </div>
  <custom-list-item v-for="item in items" :key="item.id" :is-draft="isDraft" :item="item" @removeDraft="removeDraft($event)" />
  <hr class="border-t-2 border-black" />
  <div v-if="items.length === 0" class="text-center my-3"><i>Geen resultaten</i></div>
</template>

<script lang="ts">
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import CustomListItem from '../semantic/CustomListItem.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomList',
  components: {
    'custom-headline-2': CustomHeadline2,
    'custom-list-item': CustomListItem,
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
    isDraft: Boolean,
  },
  setup(props, context) {
    const removeDraft = (id: string) => {
      context.emit('removeDraft', id)
    }
    return {
      removeDraft,
    }
  },
})
</script>
