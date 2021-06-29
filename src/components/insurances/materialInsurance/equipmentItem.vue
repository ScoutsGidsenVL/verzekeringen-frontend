<template>
  <div v-if="equipment" class="w-11/12 border-b-2 border-black p-2 h-full inline-block text-left d-flex flex-col justify-content-between">
    <slot name="top"></slot>
    <div class="py-3 flex-grow">
      <div v-if="person" class="mb-5">
        <div v-if="person.firstName">
          <strong>Naam</strong>
          <p>{{ person.firstName + ' ' + person.lastName }}</p>
        </div>

        <div v-if="person.phoneNumber">
          <strong>Gsm</strong>
          <p>{{ person.phoneNumber !== '' ? person.phoneNumber : '/' }}</p>
        </div>

        <div v-if="person.email">
          <strong>Email</strong>
          <p>{{ person.email !== '' ? person.email : '/' }}</p>
        </div>

        <div v-if="person.postCodeCity">
          <strong>Adres</strong>
          <p>
            {{ person.street + ' ' + person.number + (person.letterBox ? ' Bus ' + person.letterBox : '') + ', ' + person.postCodeCity.postalCode + ' ' + person.postCodeCity.city }}
          </p>
        </div>

        <div v-if="person.birthDate">
          <strong>Geboortedatum</strong>
          <p>{{ person.birthDate }}</p>
        </div>
      </div>

      <div>
        <div v-if="equipment.nature">
          <strong>Soort</strong>
          {{ equipment.nature }}
        </div>

        <div v-if="equipment.description">
          <strong>Beschrijving</strong>
          {{ equipment.description }}
        </div>

        <div v-if="equipment.totalValue">
          <strong>Nieuwwaarde</strong>
          {{ equipment.totalValue }}
        </div>
      </div>
    </div>

    <div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Equipment } from '@/serializer/Equipment'
import { Member } from '@/serializer/Member'
import { NonMember } from '@/serializer/NonMember'
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  props: {
    equipment: {
      type: Object as PropType<Equipment>,
      required: true,
    },
  },
  setup(props) {
    const person = ref<Member | NonMember | undefined>(props.equipment.ownerMember ? props.equipment.ownerMember : props.equipment.ownerNonMember ? props.equipment.ownerNonMember : undefined)

    return {
      person,
    }
  },
})
</script>
