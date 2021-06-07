<template>
  <div>
    <div v-if="isIdUrl" class="mt-4">
      <navigation-arrow to="/home" text="Terug naar overzicht" />
    </div>
    <div class="mt-3">
      <div v-html="titelText"></div>
    </div>
    <slot :details="details" :isDetail="isDetail" />

    <div v-if="details" class="mt-5 cw-auto pl-5 pt-5 pb-5 bg-lightGray">
      <h1 class="text-2xl font-extrabold">€{{ details.totalCost }}</h1>
    </div>
  </div>

  <div v-if="holderState === HolderStates.COMPLETED" class="mt-4 inline-block">
    <div class="flex text-lg cursor-pointer" @click="navigateHome()">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mt-1 mr-2" fill="none" viewBox="0 0 20 20" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 15l-5-5 5-5" />
      </svg>
      <p>Terug naar overzicht</p>
    </div>
  </div>
</template>

<script lang="ts">
import NavigationArrow from '@/components/semantic/NavigationArrow.vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { BaseRepository } from '@/repositories/baseRepository'
import { computed, defineComponent, PropType, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { HolderStates } from '@/enums/holderStates'
import router from '@/router'

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
      type: Function as unknown as PropType<new () => BaseRepository>,
      required: true,
    },
    data: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore()
    const route = useRoute()
    const isDetail = !!route.meta.detail
    const titelText = ref<string>('<p style="font-size: 30px">Overzicht <strong class="font-semibold">' + props.title + '</strong> verzekering</p>')
    const details = ref<any>(isDetail ? null : props.data)

    const holderState = computed((): HolderStates => {
      return store.state.insurance.holderState
    })

    watch(
      () => holderState.value,
      () => {
        if (holderState.value === HolderStates.COMPLETED) {
          titelText.value = '<p style="font-size: 30px">Uw <strong class="font-semibold">' + props.title + '</strong> verzekering is aangevraagd </p>'
        }
      }
    )

    const navigateHome = () => {
      router.push('/home')
    }

    if (isDetail) {
      RepositoryFactory.get(props.repository)
        .getById(route.params.id.toString())
        .then((result: any) => {
          details.value = result
        })
      titelText.value = '<p style="font-size: 30px">Overzicht aangevraagde verzekering <strong class="font-semibold">' + props.title + '</strong></p>'
    }

    if (holderState.value === HolderStates.COMPLETED) {
      if (props.title === 'Eenmalige activiteit') {
        titelText.value = '<p style="font-size: 30px">Uw <strong class="font-semibold">' + props.title + '</strong> verzekering is aangevraagd </p>'
      }
      if (props.title === 'Niet leden') {
        titelText.value = '<p style="font-size: 30px">Uw <strong class="font-semibold">' + props.title + '</strong> verzekering is aangevraagd </p>'
      }
    }

    if (holderState.value === HolderStates.DETAIL) {
      if (props.title === 'Niet leden') {
        titelText.value = '<p style="font-size: 30px">Overzicht tijdelijke verzekering <strong class="font-semibold">' + props.title + '</strong></p>'
      }
    }

    return {
      HolderStates,
      navigateHome,
      holderState,
      titelText,
      isDetail,
      details,
    }
  },
})
</script>
