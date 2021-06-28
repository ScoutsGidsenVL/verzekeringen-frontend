export interface EventSize {
  readonly id?: string
  readonly value?: string
  readonly label?: string
}

export const EventSizeDeserializer = (input: any): EventSize => {
  const single: EventSize = {
    id: input.id ? input.id.toString() : undefined,
    value: input.value ? input.value.toString() : undefined,
    label: input.label ? input.label : undefined,
  }

  return single
}

export const EventSizeSerializer = (input: any): any => {
  const single: any = {
    id: input.id ? input.id : undefined,
    value: input.value ? input.value : undefined,
    label: input.label ? input.label : undefined,
  }

  return single
}
