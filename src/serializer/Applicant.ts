export interface Applicant {
  readonly membershipNumber: string
  readonly cellPhoneNumber: string
  readonly email: string
  readonly name: string
}

export const ApplicantSerializer = (input: any): Applicant => {
  const single: Applicant = {
    membershipNumber: input.membershipNumber,
    cellPhoneNumber: input.cellPhoneNumber,
    email: input.email,
    name: input.name,
  }

  return single
}
