export interface Type {
  readonly id: number
  readonly description: string
  readonly maxTerm: string
  readonly name: string
}

export const TypeDeserializer = (input: any): Type => {
  input.description = input.description === 'Materiaal verzekering' ? 'Materiaalverzekering' : input.description
  input.description = input.description === 'Evenementen verzekering' ? 'Evenementenverzekering' : input.description
  input.description = input.description === 'Eenmalige activiteit' ? 'Verzekering eenmalige activiteit' : input.description

  console.log(input)

  const single: Type = {
    id: input.id,
    description: input.description,
    maxTerm: input.max_term,
    name: input.name,
  }

  return single
}

export const TypeSerializer = (input: any): Type => {
  const single: any = {
    id: input.id,
    description: input.description,
    max_term: input.maxTerm,
    name: input.name,
  }

  return single
}
