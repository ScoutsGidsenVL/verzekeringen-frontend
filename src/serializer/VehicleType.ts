export interface VehicleType {
  readonly id?: string
  readonly value?: string
  readonly label?: string
}

export const VehicleTypeDeserializer = (input: any): VehicleType => {
  const single: VehicleType = {
    id: input.id,
    value: input.value,
    label: input.label,
  }

  return single
}

export const VehicleTypeSerializer = (input: any): any => {
  const single: any = {
    id: input.id,
    value: input.value,
    label: input.label,
  }

  return single
}
