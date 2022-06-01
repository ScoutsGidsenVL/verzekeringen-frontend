<template>
  <div :class="{ container: singlePage }">
    <div v-if="isDetail" class="mt-4">
      <navigation-arrow to="/home/verzekeringen" text="Terug naar overzicht" />
    </div>

    <div class="mt-3">
      <div v-html="titelText"></div>
    </div>

    <div v-if="holderState === HolderStates.COMPLETED">
      <inscurance-succes />
    </div>

    <div v-if="detail && details.vvksComment && holderState !== HolderStates.COMPLETED">
      <!-- <important-message :message="details.vvksComment" /> -->
    </div>

    <custom-headline-sticker v-if="details && holderState !== HolderStates.COMPLETED" :text="'Totaalprijs: ' + '&euro; ' + details.totalCost"> </custom-headline-sticker>
    <slot v-if="holderState !== HolderStates.COMPLETED" :details="details" :isDetail="isDetail" />
  </div>

  <div v-if="holderState === HolderStates.COMPLETED">
    <div class="mt-4 inline-block">
      <navigation-arrow to="/home/verzekeringen" text="Terug naar overzicht" />
    </div>
  </div>
</template>

<script lang="ts">
import CustomHeadlineSticker from '@/components/customHeadlines/CustomHeadlineSticker.vue'
import NavigationArrow from '@/components/semantic/NavigationArrow.vue'
import { computed, defineComponent, PropType, ref, watch } from 'vue'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { BaseRepository } from '@/repositories/baseRepository'
import { HolderStates } from '@/enums/holderStates'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
// import ImportantMessage from '@/components/semantic/ImportantMessage.vue'
import InscuranceSucces from '@/components/insurances/messages/InscuranceSucces.vue'

export default defineComponent({
  name: 'BaseDetail',
  components: {
    'custom-headline-sticker': CustomHeadlineSticker,
    'navigation-arrow': NavigationArrow,
    // 'important-message': ImportantMessage,
    InscuranceSucces,
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
    singlePage: {
      type: Boolean,
      required: false,
      default: false,
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

    if (isDetail) {
      RepositoryFactory.get(props.repository)
        .getById(route.params.id.toString())
        .then((result: any) => {
          details.value = result
          details.value.totalCost = details.value.totalCost.replace(".", ",") 
        })
      titelText.value = '<p style="font-size: 30px">Overzicht aangevraagde verzekering <strong class="font-semibold">' + props.title + '</strong></p>'
      if (props.title === 'Tijdelijke') {
        titelText.value = '<p style="font-size: 30px">Overzicht aangevraagde verzekering <strong class="font-semibold">' + props.title + ' autoverzekering </strong></p>'
      }
    }

    if (holderState.value === HolderStates.COMPLETED) {
      titelText.value = '<p style="font-size: 30px">Je aanvraag is verstuurd.</p>'
    }

    if (holderState.value === HolderStates.DETAIL) {
      if (props.title === 'Niet leden') {
        titelText.value = '<p style="font-size: 30px">Overzicht tijdelijke verzekering <strong class="font-semibold">' + props.title + '</strong></p>'
      }
      if (props.title === 'Reisbijstand') {
        titelText.value = '<p style="font-size: 30px">Overzicht <strong class="font-semibold">' + props.title + '</strong> verzekering</p>'
      }
      if (props.title === 'Tijdelijke') {
        titelText.value = '<p style="font-size: 30px">Overzicht <strong class="font-semibold">' + 'tijdelijke autoverzekering' + '</strong></p>'
      }
      if (props.title === 'Materiaal') {
        titelText.value = '<p style="font-size: 30px">Overzicht <strong class="font-semibold">' + 'materiaalverzekering' + '</strong></p>'
      }
      if (props.title === 'verzekering eenmalige activiteit') {
        titelText.value = '<p style="font-size: 30px">Overzicht <strong class="font-semibold">' + props.title + '</strong></p>'
      }

      if (props.title === 'evenementenverzekering') {
        titelText.value = '<p style="font-size: 30px">Overzicht <strong class="font-semibold">' + props.title + '</strong></p>'
      }
    }

    return {
      HolderStates,
      holderState,
      titelText,
      isDetail,
      details,
    }
  },
})
</script>
