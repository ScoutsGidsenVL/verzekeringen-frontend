export interface Location {
  readonly city?: string
  readonly postalCode?: string
  readonly label?: string
}

export const LocationDeserializer = (input: any): Location => {
  const single: Location = {
    city: input.city ? input.city : undefined,
    postalCode: input.postal_code ? input.postal_code : undefined,
    label: input.postal_code && input.city ? input.postal_code + ' ' + input.city : undefined,
  }

  return single
}

export const LocationSerializer = (input: any): any => {
  const single: any = {
    city: input.city ? input.city : undefined,
    postal_code: input.postalCode ? input.postalCode : undefined,
  }

  return single
}
