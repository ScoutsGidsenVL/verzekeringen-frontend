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

  updateInfo(id: string, data: any) {
    return this.patch(this.endpoint + id + '/', data).then((response: any) => {
      return this.deserializer(response)
    })
  }

  create(data: any, file?: any) {
    const claim: Claim = data
    const fd = new FormData()

    //GROUP
    if (claim.group && claim.group.id) {
      fd.append('group', claim.group.id)
    }

    //ACTIVITY TYPE
    if (claim.activityTypes) {
      fd.append('activity_type', JSON.stringify(claim.activityTypes))
    }

    //USED TRANSPORT
    if (claim.usedTransport) {

      fd.append('used_transport', claim.usedTransport.toString())
    }

    //BANK ACCOUNT
    if (this.serializer(data).bank_account) {
      fd.append('bank_account', this.serializer(data).bank_account)
    }

    //VICTIM
    if (this.serializer(data).victim) {
      fd.append(
        'victim', 
        JSON.stringify(this.serializer(data).victim)
      )
    }

    //ACTIVITY
    if (claim.activity) {
      fd.append('activity', claim.activity.toString())
    }

    //DATE OF ACCIDENT
    if (this.serializer(data).date_of_accident) {
      fd.append('date_of_accident', this.serializer(data).date_of_accident)
    }

    //DESCRIPTION
    if (claim.description) {
      fd.append('description', claim.description.toString())
    }

    //DECLARENT CITY
    if (claim.declarantCity) {

      fd.append('declarant_city', claim.declarantCity.toString())
    }

    //INVOLVED PARTY NAME
    if (claim.involvedPartyName) {
      fd.append('involved_party_name', claim.involvedPartyName.toString())
    }

    //INVOLVED PARTY DESCRIPTION
    if (claim.involvedPartyDescription) {
      fd.append('involved_party_description', claim.involvedPartyDescription.toString())
    }

    //INVOLVED PARTY BIRTHDATE
    if (claim.involvedPartyBirthdate) {
      fd.append('involved_party_birthdate', claim.involvedPartyBirthdate.toString())
    }

    //OFFICIAL REPORT DESCRIPTION
    if (claim.officialReportDescription) {
      fd.append('official_report_description', claim.officialReportDescription.toString())
    }

    //PV NUMBER
    if (claim.pvNumber) {
      fd.append('pv_number', claim.pvNumber.toString())
    }

    //WITNESS NAME
    if (claim.witnessName) {
      fd.append('witness_name', claim.witnessName.toString())
    }

    //WITNESS DESCRIPTION
    if (claim.witnessDescription) {
      fd.append('witness_description', claim.witnessDescription.toString())
    }

    //LEADERSHIP DESCRIPTION
    if (claim.leadershipDescription) {
      fd.append('leadership_description', claim.leadershipDescription.toString())
    }

    //FILE
    if (file) {
      fd.append('file', file)
    }

    //DAMAGE TYPE
    if (claim.damageType) {
      fd.append('damage_type', claim.damageType)
    }

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }

    return this.post(this.endpoint, fd, config).then((response: any) => {
      return response
    }).catch((err) => {
      throw err
    })
  }
}
