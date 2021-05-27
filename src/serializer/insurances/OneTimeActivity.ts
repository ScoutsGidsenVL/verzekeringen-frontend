import { Activity, ActivitySerializer } from '../Activity'
import { ResponsibleMember, ResponsibleMemberSerializer } from '../ResponsibleMember'

export interface OneTimeActivity {
  readonly responsibleMember: ResponsibleMember
  readonly activity: Activity
  readonly startDate: string
  readonly endDate: string
  readonly group: string
}

export const insuranceSerializer = (input: any): OneTimeActivity => {
  const single: OneTimeActivity = {
    responsibleMember: ResponsibleMemberSerializer(input.responsibleMember),
    activity: ActivitySerializer(input.activity),
    startDate: input.startDate,
    endDate: input.endDate,
    group: input.group,
  }

  return single
}
