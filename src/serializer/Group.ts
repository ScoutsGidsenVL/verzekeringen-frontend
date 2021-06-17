export interface Group {
  readonly id?: number
  readonly location?: string
  readonly name?: string
  readonly fullInfo?: string
}

export const GroupDeserializer = (input: any): Group => {
  const single: Group = {
    id: input.id,
    location: input.location,
    name: input.name,
    fullInfo: `${input.name} - ${input.id}`,
  }

  return single
}

export const GroupSerializer = (input: any): any => {
  const single: any = {
    name: input.name ? input.name : undefined,
  }

  return single
}
