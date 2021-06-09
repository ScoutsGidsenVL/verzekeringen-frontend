export interface InsuranceOption {
  readonly id?: string
  readonly value?: string
  readonly label?: string
}

export const InsuranceOptionDeserializer = (input: any): InsuranceOption => {
  const single: InsuranceOption = {
    id: input.id,
    value: input.value,
    label: input.label,
  }

  return single
}

export const InsuranceOptionSerializer = (input: any): any => {
  const single: any = {
    id: input.id,
    value: input.value,
    label: input.label,
  }

  return single
}
