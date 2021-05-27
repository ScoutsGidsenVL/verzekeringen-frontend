import { Activity, ActivitySerializer } from '../Activity'
import { Applicant, ApplicantSerializer } from '../Applicant'

export interface OneTimeActivity {
  readonly applicant: Applicant
  readonly activity: Activity
  readonly startDate: string
  readonly endDate: string
  readonly group: string
}

export const insuranceSerializer = (input: any): OneTimeActivity => {
  const single: OneTimeActivity = {
    applicant: ApplicantSerializer(input.applicant),
    activity: ActivitySerializer(input.activity),
    startDate: input.startDate,
    endDate: input.endDate,
    group: input.group,
  }

  return single
}
