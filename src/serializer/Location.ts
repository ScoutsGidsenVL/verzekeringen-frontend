export interface Location {
  readonly city: string
  readonly postalCode: string
}

export const LocationDeserializer = (input: any): Location => {
  const single: Location = {
    city: input.city,
    postalCode: input.postcode,
  }

  return single
}
