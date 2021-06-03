<template>
  <div>
    <base-side-bar v-model:isDisplay="display" v-model:selection="selected" :title="title" :options="['Nieuw', 'Bestaand']">
      <div v-if="selected === 'option-1'" class="mt-4">
        <form @submit="onSubmit">
          <div class="w-96">
            <custom-input :type="InputTypes.TEXT" rules="required" name="firstName" label="Voornaam" />
          </div>

          <div class="w-96 mt-4">
            <custom-input :type="InputTypes.TEXT" rules="required" name="lastName" label="Achternaam" />
          </div>

          <div class="w-96 mt-4">
            <custom-input :type="InputTypes.TEXT" rules="required" name="street" label="Straat" />
          </div>

          <div class="w-96 mt-4">
            <custom-input :type="InputTypes.TEXT" name="number" label="Nr" />
          </div>

          <div class="w-96 mt-4">
            <custom-input :type="InputTypes.TEXT" rules="required" name="letterBox" label="Bus" />
          </div>

          <div class="w-96">
            <multi-select
              id="postCodeCity"
              track-by="location"
              value-prop="value"
              :repository="BelgianCitySearchRepository"
              :options="[]"
              :searchable="true"
              label="Location"
              rules="required"
              placeholder="Zoek op naam/postcode"
            />
          </div>

          <div class="w-96">
            <multi-select id="group" rules="required" placeholder="Group" track-by="name" value-prop="id" :options="user.scoutsGroups" label="Selecteer groep" />
          </div>

          <div class="w-96 mt-4">
            <custom-input :type="InputTypes.DATE" rules="required" name="birthDate" label="Geboortendatum" />
          </div>

          <div class="w-96 mt-4">
            <custom-input :type="InputTypes.TEXT" rules="required" name="phoneNumber" label="Gsm" />
          </div>

          <div class="w-96 mt-4">
            <custom-input :type="InputTypes.TEXT_AREA" rules="required" name="comment" label="Opmerking">
              <p>
                Indien je niet-leden wil verzekeren die in het buitenland wonen moet je in dit tekstvak de buitenlands gemeente, postcode en land opgeven. En bij adres, het belgisch adres van de
                persoon die de verzekering aanvraagt.
              </p>
            </custom-input>
          </div>
          <div class="mt-5">
            <custom-button text="Voeg toe" />
          </div>
        </form>
      </div>

      <div v-if="selected === 'option-2'">
        <div class="w-96">
          <multi-select
            id="nonMember"
            track-by="name"
            value-prop="value"
            :repository="NonMemberRepository"
            :options="[]"
            :searchable="true"
            label="Zoek"
            rules="required"
            placeholder="Zoek op naam"
            @addSelection="addNonMember($event)"
          />
        </div>
        <div>
          {{ selectedNonMembers }}
        </div>
      </div>
    </base-side-bar>
  </div>
</template>

<script lang="ts">
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import { NonMemberRepository } from '@/repositories/nonMemberRepository'
import { ResponsibleMember } from '@/serializer/ResponsibleMember'
import RepositoryFactory from '@/repositories/repositoryFactory'
import BaseSideBar from '@/components/semantic/BaseSideBar.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import CustomButton from '@/components/CustomButton.vue'
import { NonMember } from '@/serializer/NonMember'
import { defineComponent, ref, watch } from 'vue'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'NonMemberSideBar',
  components: {
    'custom-button': CustomButton,
    'base-side-bar': BaseSideBar,
    'custom-input': CustomInput,
    'multi-select': MultiSelect,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    isDisplay: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, context) {
    const store = useStore()
    const user = ref<ResponsibleMember>(store.getters.user)
    const display = ref<boolean>(props.isDisplay)
    const { handleSubmit } = useForm<NonMember>()
    const selected = ref<string>('option-1')
    const selectedNonMembers = ref<NonMember[]>([])

    watch(
      () => props.isDisplay,
      () => {
        display.value = props.isDisplay
      }
    )

    watch(
      () => display.value,
      () => {
        context.emit('update:isDisplay', display.value)
      }
    )

    const onSubmit = handleSubmit(async (values: NonMember) => {
      const nonMember = ref<NonMember>({
        lastName: values.lastName,
        firstName: values.firstName,
        phoneNumber: values.phoneNumber,
        birthDate: values.birthDate,
        street: values.street,
        number: values.number,
        letterBox: values.letterBox,
        comment: values.comment,
        postCodeCity: values.postCodeCity,
        group: values.group,
      })

      postNonMember(nonMember.value)
    })

    const addNonMember = (nonMember: NonMember) => {
      // enkel toevoegen als deze er nog niet instaat
      selectedNonMembers.value.push(nonMember)
    }

    const postNonMember = (data: NonMember) => {
      RepositoryFactory.get(NonMemberRepository)
        .create(data)
        .then((completed: NonMember) => {
          selectedNonMembers.value.push(completed)
          context.emit('addCreatedNonMemberToList', selectedNonMembers.value)
          selectedNonMembers.value = []
        })
    }

    return {
      BelgianCitySearchRepository,
      NonMemberRepository,
      selectedNonMembers,
      addNonMember,
      InputTypes,
      selected,
      display,
      onSubmit,
      user,
    }
  },
})
</script>
