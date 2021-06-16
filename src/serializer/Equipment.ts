export interface Equipment {
  readonly nature?: string
  readonly description?: string
  readonly totalValue?: string
  ownerMember?: string
  ownerNonMember?: string
  readonly group?: string
}

export const EquipmentDeserializer = (input: any): Equipment => {
  const single: Equipment = {
    nature: input.nature ? input.email : undefined,
    description: input.description ? input.description : undefined,
    totalValue: input.total_value ? input.total_value : undefined,
    ownerMember: input.owner_member ? input.owner_member : undefined,
    ownerNonMember: input.owner_non_member ? input.owner_non_member : undefined,
    group: input.group ? input.group : undefined,
  }

  return single
}

export const EquipmentSerializer = (input: any): any => {
  const single: any = {
    nature: input.nature ? input.email : undefined,
    description: input.description ? input.description : undefined,
    total_value: input.totalValue ? input.totalValue : undefined,
    owner_member: input.ownerMember ? input.ownerMember : undefined,
    owner_non_member: input.ownerNonMember ? input.ownerNonMember : undefined,
    group: input.group ? input.group : undefined,
  }

  return single
}
