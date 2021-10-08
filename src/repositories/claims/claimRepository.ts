import { Claim, ClaimDeserializer, ClaimSerializer } from '@/serializer/claims/claim'
import { BaseRepository } from '@/repositories/baseRepository'
import { ArrayResult } from '@/serializer/ArrayResult'

export class ClaimRepository extends BaseRepository {
  id = '/insurances_claims/'
  endpoint = '/insurances_claims/'
  deserializer = ClaimDeserializer
  serializer = ClaimSerializer

  getArray(pagination: string): Promise<any> {
    const paginationUrl = pagination.split(this.endpoint)[1]

    return this.get(this.endpoint + paginationUrl, {}).then((response: ArrayResult) => {
      const array: any[] = []
      response.results.forEach((result: any) => {
        array.push(this.deserializer(result))
      })
      response.results = array

      return response
    })
  }

  search(query: string, year: string): Promise<any> {
    return this.get(this.endpoint + '?search=' + query + '&year=' + year  + '&page=1&page_size=10', {}).then((response: ArrayResult) => {
      const array: any[] = []
      response.results.forEach((result: any) => {
        array.push(this.deserializer(result))
      })
      response.results = array

      return response
    })
  }

  create(data: any, file?: any) {
    const claim: Claim = this.serializer(data)
    const fd = new FormData()

    console.log('CHECK: ', this.serializer(data))

    // if (claim.activityTypes) {
    //   fd.append('activity_type', claim.activityTypes.toString())
    // }

    // if (claim.group && claim.group.name) {
    //   console.log('GROUP FD: ', claim.group.name)
    //   fd.append('group', claim.group.name)
    // }

    // if (claim.dateOfAccident) {
    //   fd.append('date_of_accident', claim.dateOfAccident.toString())
    // }

    // if (claim.activity) {
    //   fd.append('activity', claim.activity.toString())
    // }

    // if (claim.description) {
    //   fd.append('description', claim.description.toString())
    // }

    fd.append('detail', this.serializer(data))

    if (file) {
      fd.append('file', file)
    }

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }

    return this.post(this.endpoint, fd, config).then((response: any) => {
      return this.deserializer(response)
    })
  }
}
