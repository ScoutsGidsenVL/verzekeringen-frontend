export interface Activity {
  readonly location: string
  readonly aditionalPersonsToBeInsured: string
}

export const ActivitySerializer = (input: any): Activity => {
  const single: Activity = {
    location: input.location,
    aditionalPersonsToBeInsured: input.aditionalPersonsToBeInsured,
  }

  return single
}
