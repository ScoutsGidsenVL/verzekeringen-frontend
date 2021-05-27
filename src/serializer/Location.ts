export interface Location {
  readonly id: number
  readonly location: any
  readonly name: string
}

export const LocationSerializer = (input: any): Location => {
  const single: Location = {
    id: input.id,
    location: input.location,
    name: input.name,
  }

  return single
}
