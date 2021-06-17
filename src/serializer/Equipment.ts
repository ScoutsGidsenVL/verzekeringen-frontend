import { Member, MemberDeserializer, MemberSerializer } from './Member'
import { NonMember, NonMemberSerializer } from './NonMember'

export interface Equipment {
  readonly id?: string
  readonly nature?: string
  readonly description?: string
  readonly totalValue?: string
  ownerMember?: Member
  ownerNonMember?: NonMember
  readonly group?: string
}

export const EquipmentDeserializer = (input: any): Equipment => {
  const single: Equipment = {
    id: input.id ? input.id : undefined,
    nature: input.nature ? input.email : undefined,
    description: input.description ? input.description : undefined,
    totalValue: input.total_value ? input.total_value : undefined,
    ownerMember: input.owner_member ? MemberDeserializer(input.owner_member) : undefined,
    ownerNonMember: input.owner_non_member ? MemberSerializer(input.owner_non_member) : undefined,
    group: input.group ? input.group : undefined,
  }

  return single
}

export const EquipmentSerializer = (input: any): any => {
  console.log('EQUIPMENT INPUT:', input)
  const single: any = {
    nature: input.nature ? input.email : undefined,
    description: input.description ? input.description : undefined,
    total_value: input.totalValue ? input.totalValue : undefined,
    owner_member: input.ownerMember ? MemberSerializer(input.ownerMember).id : undefined,
    owner_non_member: input.ownerNonMember ? NonMemberSerializer(input.ownerNonMember).id : undefined,
    group: input.group ? input.group : undefined,
  }

  return single
}
