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

  public uploadParticipantsFile(file: any, inscuranceId: string): Promise<FileItem> {
    const fd = new FormData()
    fd.append('file', file)
    fd.append('event_insurance', inscuranceId)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }

    return this.post('/participants/', fd, config).then((response: any) => {
      return response
    })
  }

  // http://localhost:8001/api/participants/9b99bdb3-3a46-4488-9d15-27b3ad8ad499/download
  public downloadParticipantsFile(id: string): Promise<Blob> {
    return this.getFile('/participants/' + id + '/download').then((res) => {
      return res
    })
  }

  public deleteParticipantsFile(id: string): Promise<any> {
    return this.delete('/participants/' + id).then((res) => {
      return res
    })
  }
}
