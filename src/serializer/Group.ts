export interface Group {
  readonly id?: number
  readonly location?: string
  readonly name?: string
  readonly fullInfo?: string
}

export const GroupDeserializer = (input: any): Group => {
  const single: Group = {
    id: input.id ? input.id : undefined,
    location: input.location ? input.location : undefined,
    name: input.name ? input.name : undefined,
    fullInfo: input.id && input.name ? `${input.name} - ${input.id}` : undefined,
  }

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
