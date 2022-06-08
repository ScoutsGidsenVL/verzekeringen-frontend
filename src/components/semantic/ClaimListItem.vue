<template>
  <div v-if="item" class="md:grid-cols-claims grid py-2 border-t-2 border-black">
    <div>
      <p>{{ item.dateOfAccident ? formatSingleDate(item.dateOfAccident) : '' }}</p>
    </div>

    <div v-if="item.victim">
      <p>{{ item.victim.firstName + ' ' + item.victim.lastName }}</p>
    </div>

    <div>
      <p>{{ item.group && item.group.name ? item.group.name : '' }} - {{ item.group && item.group.id ? item.group.id : '' }}</p>
    </div>

    <div>
      <p>{{ item.declarant && item.declarant.firstName ? item.declarant.firstName : '' }} {{item.declarant && item.declarant.lastName ? item.declarant.lastName : '' }}</p>
    </div>
    
    <div>
      <div class="float-right">
        <router-link :to="'/schadeaangifte-detail/' + item.id">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-lightGreen cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Claim } from '@/serializer/claims/claim'
import { formatSingleDate } from '@/helpers/formatHelper'

export default defineComponent({
  name: 'CustomListItem',
  components: {},
  props: {
    item: {
      type: Object as PropType<Claim>,
      required: true,
    },
  },
  setup() {
    const fetchClaimById = (id: string) => {
      //DO LOGIC
      console.log('claim id:', id)
    }
    return {
      formatSingleDate,
      fetchClaimById,
    }
  },
})
</script>

<style lang="scss" scoped>

.md\:grid-cols-claims {
    grid-template-columns: 20% 25% 30% 15% 10% !important;
}

.date-under {
  display: none !important;
}

.date-normal {
  display: block !important;
}
@media (min-width: 768px) and (max-width: 1200px) {
  .date-under {
    display: block !important;
  }

  .date-normal {
    display: none !important;
  }
}
</style>
