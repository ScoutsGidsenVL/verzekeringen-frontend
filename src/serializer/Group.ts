export interface Group {
  id?: string
  readonly location?: string
  readonly name?: string
  readonly fullInfo?: string
}

export const GroupDeserializer = (input: any): Group => {
  console.log('GROUPJE: ', input)
  const single: Group = {
    id: input.group_group_admin_id ? input.group_group_admin_id : input.group_admin_id,
    // location: input.addresses[0].city ? input.addresses[0].city : undefined,
    name: input.name ? input.name : undefined,
    fullInfo: (input.group_admin_id ? input.group_admin_id : input.group_group_admin_id) && input.name ? `${input.name} - ${input.group_admin_id ? input.group_admin_id : input.group_group_admin_id}` : undefined,
  }
  console.log('new: ', single)
  return single
}

export const GroupSerializer = (input: any): any => {
  const single: any = {
    id: input.id ? input.id : undefined,
  }

  return single
}

export const orderGroups = (groups: Array<Group>) => {
  return groups.sort((a: any, b: any) => Number(a.id.replace(/\D/g, '')) - Number(b.id.replace(/\D/g, '')))
}

export const removeDuplicates = (groups: Array<Group>) => {
  const results = []
  const map = new Map()
  for (const item of groups) {
    if (!map.has(item.id)) {
      map.set(item.id, true) // set any value to Map
      results.push({
        id: item.id,
        name: item.name,
      })
    }
  }
  return results
}
