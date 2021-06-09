export interface EventSize {
  readonly id?: string
  readonly value?: string
  readonly label?: string
}

export const EventSizeDeserializer = (input: any): EventSize => {
  const single: EventSize = {
    id: input.id ? input.id.toString() : undefined,
    value: input.value ? input.value.toString() : undefined,
    label: input.label,
  }

  return single
}

export const EventSizeSerializer = (input: any): any => {
  const single: any = {
    id: input.id,
    value: input.value,
    label: input.label,
  }

  return single
}
