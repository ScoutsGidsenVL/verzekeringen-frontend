export interface Group {
  readonly id: number
  readonly location: string
  readonly name: string
}

export const GroupSerializer = (input: any): Group => {
  const single: Group = {
    id: input.id,
    location: input.location,
    name: input.name,
  }

  return single
}
