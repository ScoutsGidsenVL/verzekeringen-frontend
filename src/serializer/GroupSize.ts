export interface GroupSize {
  readonly id?: string
  readonly value?: string
  readonly label?: string
}

export const GroupSizeDeserializer = (input: any): GroupSize => {
  const single: GroupSize = {
    id: input.id ? input.id.toString() : undefined,
    value: input.value ? input.value.toString() : undefined,
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
