<template>
  <p class="font-semibold mb-0">Activiteit</p>
  <div class="md:ml-20 xs:ml-5 sm:ml-5">
    <label-output v-if="nature" label="Aard van activiteit" :text="nature" />
    <label-output v-if="countryName" label="Land" :text="countryName" />
    <label-output v-if="location && location.postalCode" label="Locatie" :text="location.postalCode + ' ' + location.city" />
    <label-output v-if="groupSize" label="Aantal extra te verzekeren personen" :text="groupSize.label" />
    <label-output v-if="eventSize" label="Grootte van evenement" :text="eventSize.label" />
  </div>
</template>

<script lang="ts">
import LabelOutput from '@/components/semantic/LabelOutput.vue'
import { defineComponent, PropType, ref } from 'vue'
import { Location } from '@/serializer/Location'
import { InputTypes } from '@/enums/inputTypes'
import { GroupSize } from '@/serializer/GroupSize'
import { EventSize } from '@/serializer/EventSize'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { CountryRepository } from '@/repositories/countriesRepository'

export default defineComponent({
  name: 'ActivityDetail',
  components: {
    'label-output': LabelOutput,
  },
  props: {
    insuranceType: String,
    nature: {
      type: String,
      default: '',
    },
    groupSize: {
      type: Object as PropType<GroupSize>,
    },
    eventSize: {
      type: Object as PropType<EventSize>,
    },
    location: Object as PropType<Location>,
    country: String,
  },
  setup(props) {
    const countryName = ref<string>('')
    if (props.country) { 
      RepositoryFactory.get(CountryRepository)
      .getArray(`/countries_by_type/${props.insuranceType}/?page_size=1000`)
      .then((res: any) => {
          res.results.forEach((country:any) => {
            if (props.country && country.id.toString() === props.country.toString()) {
              countryName.value = country.name
            }
          })
      })
      if (props.country === "3232") {
        countryName.value = 'België'
      }
    } else {
      countryName.value = 'België'
    } 

    return {
      InputTypes,
      countryName
    }
  },
})
</script>
