<template>
  <div>
    <div class="mt-4">
      <navigation-arrow to="/home" text="Terug naar overzicht" />
    </div>
    <div class="mt-4">
      <p style="font-size: 30px">
        Overzicht aangevraagde verzekering
        <strong class="font-semibold">
          {{ title }}
        </strong>
      </p>
    </div>
    <slot :details="details" />
    <!-- PRICE -->
  </div>
</template>

<script lang="ts">
import NavigationArrow from '@/components/semantic/NavigationArrow.vue'
import BaseApiRepository from '@/repositories/baseApiRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'BaseDetail',
  components: {
    'navigation-arrow': NavigationArrow,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    repository: {
      type: Function as unknown as PropType<new () => BaseApiRepository>,
      required: true,
    },
  },
  setup(props) {
    const details = ref<any>('ricardo')

    // const isIdUrl =

    RepositoryFactory.get(props.repository)
    return { details }
  },
})
</script>
