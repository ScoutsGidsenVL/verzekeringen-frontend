export interface Claim {
  readonly id?: number
}

export const ClaimDeserializer = (input: any): Claim => {
  const single: Claim = {
    id: input.id,
  }

  return single
}

export const ClaimSerializer = (input: any): any => {
  const single: any = {
    id: input.id,
  }

  return single
}
