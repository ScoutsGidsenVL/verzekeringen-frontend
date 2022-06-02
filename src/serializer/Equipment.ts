import { Member, MemberDeserializer, MemberSerializer } from '@/serializer/Member'
import { NonMember, NonMemberDeserializer, NonMemberSerializer } from '@/serializer/NonMember'

export interface Equipment {
  id?: string
  inuitsId?: string
  readonly nature?: string
  readonly description?: string
  readonly totalValue?: string
  ownerMember?: Member | null
  ownerNonMember?: NonMember | null
  readonly group?: string
  readonly owner?: any
}

export const EquipmentDeserializer = (input: any, group?: any): Equipment => {
  const single: Equipment = {
    id: input.id ? input.id : undefined,
    inuitsId: input.inuits_id ? input.inuits_id : undefined,
    nature: input.nature ? input.nature : undefined,
    description: input.description ? input.description : undefined,
    totalValue: input.total_value ? input.total_value : undefined,
    ownerMember: input.owner_member ? MemberDeserializer(input.owner_member) : undefined,
    ownerNonMember: input.owner_non_member ? NonMemberDeserializer(input.owner_non_member) : undefined,
    // group: input.owner_group ? input.owner_group : undefined,
    group: group ? group : input.owner_group ? input.owner_group : undefined,
  }

  return single
}

export const EquipmentSerializer = (input: any): any => {
  const single: any = {
    id: input.id ? input.id : undefined,
    nature: input.nature ? input.nature : null,
    description: input.description ? input.description : undefined,
    total_value: input.totalValue ? input.totalValue : undefined,
    owner_member: input.ownerMember ? input.ownerMember.groupAdminId : null,
    owner_non_member: input.ownerNonMember ? NonMemberSerializer(input.ownerNonMember).id : null,
    owner_group: input.group ? input.group : null,
  }

  return single
}

export const EquipmentSerializerToPostInsurance = (input: any): any => {
  const single: any = {
    id: input.id ? input.id : undefined,
    nature: input.nature ? input.nature : undefined,
    description: input.description ? input.description : undefined,
    total_value: input.totalValue ? input.totalValue : undefined,
    owner_member: input.ownerMember ? MemberSerializer(input.ownerMember) : null,
    owner_non_member: input.ownerNonMember ? NonMemberSerializer(input.ownerNonMember) : null,
    owner_group: input.group ? input.group : null,
  }

  return single
}
