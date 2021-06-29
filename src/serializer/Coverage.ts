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

export const roundLabel = (result: any) => {
  if (result.label === '247,89 EUR') {
    result.label = '250 EUR'
  }
  if (result.label === '495,79 EUR') {
    result.label = '500 EUR'
  }
  if (result.label === '743,68 EUR') {
    result.label = '750 EUR'
  }
  return result
}
