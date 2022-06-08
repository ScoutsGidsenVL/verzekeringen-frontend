import { Claim, ClaimDeserializer, ClaimSerializer } from '@/serializer/claims/claim'
import { BaseRepository } from '@/repositories/baseRepository'
import { ArrayResult } from '@/serializer/ArrayResult'
import { GroupDeserializer } from '@/serializer/Group'

export class ClaimRepository extends BaseRepository {
  id = '/insurances_claims/'
  endpoint = '/insurances_claims/'
  deserializer = ClaimDeserializer
  serializer = ClaimSerializer

  getArray(pagination: string): Promise<any> {
    const paginationUrl = pagination.split(this.endpoint)[1]

    return this.get(this.endpoint + paginationUrl, {}).then((response: ArrayResult) => {
      const array: any[] = []
      if (response.response && response.response.status === 403) {
        console.log('RESPONSE: ', response.response)
        return array
      }
      
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
  
  getClaimGroupsByPermissions(): Promise<any> {
    return this.get('/insurances_claims/data/', {}).then((response: any) => {

      const array: any[] = []
      response.permitted_scouts_groups.forEach((result: any) => {
        array.push(GroupDeserializer(result))
      })

      response = array

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
    console.log('CLAIM: ', claim)
    //GROUP
    if (claim.group && claim.group.id) {
      fd.append('group_group_admin_id', claim.group.id)
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
    } else {
      fd.append('involved_party_name', '')
    }

    //INVOLVED PARTY DESCRIPTION
    if (claim.involvedPartyDescription) {
      fd.append('involved_party_description', claim.involvedPartyDescription.toString())
    } else {
      fd.append('involved_party_description', '')
    }

    //INVOLVED PARTY BIRTHDATE
    if (claim.involvedPartyBirthdate) {
      fd.append('involved_party_birthdate', claim.involvedPartyBirthdate.toString())
    }

    //OFFICIAL REPORT DESCRIPTION
    if (claim.officialReportDescription) {
      fd.append('official_report_description', claim.officialReportDescription.toString())
    } else {
      fd.append('official_report_description', '')
    }

    //PV NUMBER
    if (claim.pvNumber) {
      fd.append('pv_number', claim.pvNumber.toString())
    } else {
      fd.append('pv_number', '')
    }

    //WITNESS NAME
    if (claim.witnessName) {
      fd.append('witness_name', claim.witnessName.toString())
    } else {
      fd.append('witness_name', '')
    }

    //WITNESS DESCRIPTION
    if (claim.witnessDescription) {
      fd.append('witness_description', claim.witnessDescription.toString())
    } else {
      fd.append('witness_description', '')
    }

    //LEADERSHIP DESCRIPTION
    if (claim.leadershipDescription) {
      fd.append('leadership_description', claim.leadershipDescription.toString())
    } else {
      fd.append('leadership_description', '')
    }

    //FILE
    if (file) {
      fd.append('file', file)
    }

    //DAMAGE TYPE
    if (claim.damageType) {
      fd.append('damage_type', claim.damageType)
    } else {
      fd.append('damage_type', '')
    }

    //BOOLEANS

    //isInvolvedPartyChecked
    if (claim.isInvolvedPartyChecked) {
      if ( claim.isInvolvedPartyChecked === 'True') {
        fd.append('involved_party', 'yes')
      }
      if ( claim.isInvolvedPartyChecked === 'False') {
        fd.append('involved_party', 'no')
      }
    } else {
      fd.append('involved_party', '')
    }

    //isLeadershipChecked
    if (claim.isLeadershipChecked) {
      if (claim.isLeadershipChecked === 'True') {
        fd.append('leadership', 'yes')
      }
      if (claim.isLeadershipChecked === 'False') {
        fd.append('leadership', 'no')
      }
    } else {
      fd.append('leadership', '')
    }

    //isOfficialReportChecked
    if (claim.isOfficialReportChecked) {
      if (claim.isOfficialReportChecked === 'True') {
        fd.append('official_report', 'yes')
      }
      if (claim.isOfficialReportChecked === 'False') {
        fd.append('official_report', 'no')
      }
    } else {
      fd.append('official_report', '')
    }

    //isWitnessChecked
    if (claim.isWitnessChecked) {
      if (claim.isWitnessChecked === 'True') {
        fd.append('witness', 'yes')
      }
      if (claim.isWitnessChecked === 'False') {
        fd.append('witness', 'no')
      }
    } else {
      fd.append('witness', '')
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
