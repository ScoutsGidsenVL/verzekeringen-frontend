export interface Trailer {
  readonly id?: string
  readonly value?: string
  readonly label?: string
}

export const TrailerDeserializer = (input: any): Trailer => {
  const single: Trailer = {
    id: input.id,
    value: input.value,
    label: input.label,
  }

  return single
}

export const TrailerSerializer = (input: any): any => {
  const single: any = {
    id: input.id,
    value: input.value,
    label: input.label,
  }

  return single
}
