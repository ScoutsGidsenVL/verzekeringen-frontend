export interface Country {
  readonly id?: number
  readonly name?: string
}

export const CountryDeserializer = (input: any): Country => {
  const single: Country = {
    id: input.id,
    name: input.name,
  }

  return single
}

export const CountrySerializer = (input: any): any => {
  const single: any = {
    id: input.id,
    name: input.name,
  }

  return single
}
