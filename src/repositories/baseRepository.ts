import BaseApiRepository from '@/repositories/baseApiRepository'
import { ArrayResult } from '@/serializer/ArrayResult'

export abstract class BaseRepository extends BaseApiRepository {
  abstract id: string
  abstract endpoint: string
  abstract deserializer: any
  abstract serializer: any

  private previous: string | null = null
  private next: string | null = ''

  getArray(pagination?: string): Promise<any> {
    return this.get(this.endpoint, {}).then((response: ArrayResult) => {
      const array: any[] = []
      response.results.forEach((result: any) => {
        array.push(this.deserializer(result))
      })
      return array
    })
  }

  getPrevious(): Promise<any> {
    return this.get(this.endpoint, {}).then((response: ArrayResult) => {
      const array: any[] = []
      response.results.forEach((result: any) => {
        array.push(this.deserializer(result))
      })
      return array
    })
  }

  getById(id: string): Promise<any> {
    return this.get(this.endpoint + id, {}).then((response: any) => {
      return this.deserializer(response)
    })
  }

  editById(id: string, data: any): Promise<any> {
    return this.put(this.endpoint + id, data).then((response: any) => {
      return this.deserializer(response)
    })
  }

  search(query: string, insuranceTypeId?: string): Promise<any> {
    return this.get(this.endpoint + '?term=' + query, {}).then((response: any[]) => {
      const array: any[] = []
      response.forEach((result: any) => {
        array.push(this.deserializer(result))
      })
      return array
    })
  }

  create(data: any) {
    return this.post(this.endpoint, this.serializer(data)).then((response: any) => {
      return this.deserializer(response)
    })
  }

  formatPaginationUrl = (url: string) => {
    return url
  }
}
