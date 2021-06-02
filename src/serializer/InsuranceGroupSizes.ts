export interface InsuranceGroupSize {
  readonly id: number
  readonly value: number
  readonly label: string
}

export const insuranceGroupSizeDeserializer = (input: any): InsuranceGroupSize => {
  const single: InsuranceGroupSize = {
    id: input.id,
    value: input.value,
    label: input.label,
  }

  return single
}

export const insuranceGroupSizeSerializer = (input: any): InsuranceGroupSize => {
  const single: InsuranceGroupSize = {
    id: input.id,
    value: input.value,
    label: input.label,
  }

  return single
}
