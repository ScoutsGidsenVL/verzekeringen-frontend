export interface GroupSize {
  readonly id?: number
  readonly value?: string
  readonly label?: string
}

export const GroupSizeDeserializer = (input: any): GroupSize => {
  const single: GroupSize = {
    id: input.id,
    value: input.value,
    label: input.label,
  }

  return single
}

export const GroupSizeSerializer = (input: any): any => {
  const single: any = {
    id: input.id,
    value: input.value,
    label: input.label,
  }

  return single
}
