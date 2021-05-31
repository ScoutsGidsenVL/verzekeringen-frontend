import BaseApiRepository from '@/repositories/baseApiRepository'

export abstract class BaseRepository extends BaseApiRepository {
  abstract id: string
  abstract endpoint: string
  abstract deserializer: any
  abstract serializer: any

  getArray(): Promise<any> {
    return this.get(this.endpoint, {}).then((response: any) => {
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

  search(query: string): Promise<any> {
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
}
