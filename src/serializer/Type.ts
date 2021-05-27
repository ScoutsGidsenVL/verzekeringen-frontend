export interface Type {
  readonly id: number
  readonly description: string
  readonly maxTerm: string
  readonly name: string
}

export const TypeSerializer = (input: any): Type => {
  const single: Type = {
    id: input.id,
    description: input.description,
    maxTerm: input.max_term,
    name: input.name,
  }

  return single
}
