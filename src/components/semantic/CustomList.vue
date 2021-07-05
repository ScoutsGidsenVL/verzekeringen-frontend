<template>
  <h2 class="pt-4 pb-2">{{ title }}</h2>
  <slot />
  <div class="grid-cols-list py-2 border-t-2 border-black grid opacity-0 md:opacity-100">
    <div>
      <p class="font-semibold">Datum</p>
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
import { defineComponent } from 'vue'
import CustomListItem from '../semantic/CustomListItem.vue'

export default defineComponent({
  name: 'CustomList',
  components: {
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

<style lang="scss" scoped>
.custom-grid {
  display: grid;
  grid-template-columns: 25% 30% 25% 15% 5%;
}
</style>
