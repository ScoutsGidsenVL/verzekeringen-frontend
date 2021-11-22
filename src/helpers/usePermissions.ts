import store from '../store/store'
import { ref } from 'vue'
import { ResponsibleMember } from '@/serializer/ResponsibleMember'

export type usePermissionsType = {
    can: (permission: string) => boolean
}

export default function usePermissions () : usePermissionsType {
  const userData = ref<ResponsibleMember>(store.getters.user)

  function can (permission: string) : boolean {
    console.log('USERDATA: ', userData.value)
    return userData.value.permissions.includes(permission)
  }

  return {
    can
  }

}