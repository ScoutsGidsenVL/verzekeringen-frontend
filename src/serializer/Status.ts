export interface Status {
  readonly id: number
  readonly label: string
  readonly value: number
}

export const StatusDeserializer = (input: any): Status => {
  const single: Status = {
    id: input.id,
    label: input.label,
    value: input.value,
  }

  return single
}

export const StatusSerializer = (input: any): Status => {
  const single: Status = {
    id: input.id,
    label: input.label,
    value: input.value,
  }

  return single
}
