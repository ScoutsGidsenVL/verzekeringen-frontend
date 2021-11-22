import { BaseRepository } from '@/repositories/baseRepository'
import { FileItem } from '@/serializer/FileItem'

export type fileReturn = {
  id: string
  url: string
}

export default class FileRepository extends BaseRepository {
  id = 'files'
  endpoint = '/files/'
  deserializer = null
  serializer = null

  // UPLOAD FILE
  public uploadFile(file: any, claimId: string): Promise<FileItem> {
    const fd = new FormData()
    fd.append('insurance_claim', claimId)
    fd.append('file', file)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
    return this.post(this.endpoint, fd, config).then((response: FileItem) => {
      return response
    })
  }

  public asdasd(file: any, inscuranceId: string): Promise<FileItem> {
    return this.post('/files/' + inscuranceId, file).then((response: FileItem) => {
      return response
    })
  }

  public uploadAttendeesFile(file: any, inscuranceId: string): Promise<FileItem> {
    const fd = new FormData()
    fd.append('insurance_claim', inscuranceId)
    fd.append('file', file)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
    return this.post(this.endpoint, fd, config).then((response: FileItem) => {
      return response
    })
  }
}
