import { Group } from '../Group'

export interface Claim {
  readonly id?: number
  readonly group?: Group
}

export const ClaimDeserializer = (input: any): Claim => {
  const single: Claim = {
    id: input.id ? input.id : undefined,
    group: input.group ? input.group : undefined,
  }

  return single
}

export const ClaimSerializer = (input: any): any => {
  const single: any = {
    id: input.id,
    group: input.groep,
  }

  return single
}
