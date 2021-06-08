export interface Location {
  readonly city?: string
  readonly postalCode?: string
  readonly label?: string
}

export const LocationDeserializer = (input: any): Location => {
  const single: Location = {
    city: input.city ? input.city : undefined,
    postalCode: input.postcode ? input.postcode : undefined,
    label: input.postcode ? input.postcode + ' ' + input.city : undefined,
  }

  return single
}

export const LocationSerializer = (input: any): Location => {
  const single: any = {
    city: input.city,
    postcode: input.postalCode,
  }

  return single
}
