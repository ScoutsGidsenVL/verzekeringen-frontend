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

  public uploadParticipantsFile(file: any, inscuranceId: string, inscuranceType: string): Promise<FileItem> {
    const fd = new FormData()
    fd.append('file', file)
    fd.append('insurance', inscuranceId)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }

    return this.post('/' + inscuranceType +'/participants/', fd, config).then((response: any) => {
      return response
    })
  }

  // http://localhost:8001/api/participants/9b99bdb3-3a46-4488-9d15-27b3ad8ad499/download
  public downloadParticipantsFile(id: string, inscuranceType: string): Promise<Blob> {
    return this.getFile('/' + inscuranceType +'/participants/' + id + '/download').then((res) => {
      return res
    })
  }

  public deleteParticipantsFile(id: string, inscuranceType: string): Promise<any> {
    return this.delete('/' + inscuranceType + '/participants/' + id).then((res) => {
      return res
    })
  }
}
