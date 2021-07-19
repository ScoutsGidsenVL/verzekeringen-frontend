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
  public uploadFile(file: any): Promise<FileItem> {
    const fd = new FormData()
    fd.append('upload', file)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
    return this.post(this.endpoint + 'upload/', fd, config).then((response: FileItem) => {
      return response
    })
  }

  // DOWNLOAD FILE
  public downloadFile(id: string): Promise<Blob> {
    return this.getFile(this.endpoint + 'download/' + id).then((res) => {
      return res
    })
  }
}
