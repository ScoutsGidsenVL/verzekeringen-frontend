export interface Activity {
  readonly startDate: string
  readonly endDate: string
  readonly location: string
  readonly aditionalPersonsToBeInsured: string
}

export const ActivitySerializer = (input: any): Activity => {
  const single: Activity = {
    startDate: input.startDate,
    endDate: input.endDate,
    location: input.location,
    aditionalPersonsToBeInsured: input.aditionalPersonsToBeInsured,
  }

  return single
}
