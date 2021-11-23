export interface Attachment {
  readonly id: string
  readonly filename: string
  readonly contentType?: string
}

export const AttachmentDeserializer = (input: any): Attachment => {
  const single: Attachment = {
    id: input.id ? input.id : undefined,
    filename: input.filename ? input.filename : undefined,
    contentType: input.content_type ? input.content_type : undefined,
  }

  return single
}

export const AttachmentSerializer = (input: any): any => {
  const single: any = {}

  return single
}
