export interface insurance {
  readonly id: number
  readonly date: string
  readonly group: string
  readonly type: string
}

export const insuranceSerializer = (input: any): insurance => {
  const single: insurance = {
    id: input.id,
    date: input.date,
    group: input.group,
    type: input.type,
  }

  return single
}
