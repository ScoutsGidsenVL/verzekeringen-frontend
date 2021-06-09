export interface Coverage {
  readonly id?: string
  readonly value?: string
  readonly label?: string
}

export const CoverageDeserializer = (input: any): Coverage => {
  const single: Coverage = {
    id: input.id ? input.id.toString() : undefined,
    value: input.value ? input.value.toString() : undefined,
    label: input.label,
  }

  return single
}

export const CoverageSerializer = (input: any): any => {
  const single: any = {
    id: input.id,
    value: input.value,
    label: input.label,
  }

  return single
}
