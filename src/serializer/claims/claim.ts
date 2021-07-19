import { ActivityTypes } from '@/enums/activityTypes'
import { Country } from '@/serializer/Country'
import { Group } from '@/serializer/Group'
import { Victim, VictimDeserializer } from '@/serializer/Victim'
import { ResponsibleMember } from '../ResponsibleMember'
import moment from 'moment'

export interface Claim {
  readonly id?: number
  readonly date?: String
  readonly person?: String
  readonly group?: Group
  readonly groupLeader?: ResponsibleMember
  victimMember?: string
  victimNonMember?: string
  readonly victimMemberGroupAdminId?: string
  readonly bankAccount?: string
  readonly dateOfAccident?: string
  readonly activity?: string
  activityTypes?: Array<ActivityTypes>
  readonly usedTransport?: string
  readonly isDamage?: boolean
  readonly damage?: string
  readonly description?: string
  readonly involvedPartyDescription?: string
  readonly involvedPartyBirthdate?: string
  readonly officialReportDescription?: string
  readonly pvNumber?: string
  readonly witnessDescription?: string
  readonly leadershipDescription?: string
  readonly country?: Country
  victim?: Victim
  readonly madeUpAtCountry?: Country
  readonly madeUpOnDate?: string
  administrationComment?: string
  dossierNumber?: string
}

export const ClaimDeserializer = (input: any): Claim => {
  const victim = input.victim_member ? { ...input.victim_member, ...{ bank_account: input.bank_account } } : { ...input.victim_non_member, ...{ bank_account: input.bank_account } }
  console.log('VICTIM: ', victim)

  const single: Claim = {
    id: input.id ? input.id : undefined,
    date: input.date ? input.date : undefined,
    person: input.person ? input.person : undefined,
    group: input.group ? input.group : undefined,
    victimMember: input.victim_member ? input.victim_member : undefined,
    victimNonMember: input.victim_non_member ? input.victim_non_member : undefined,
    victimMemberGroupAdminId: input.victim_member_group_admin_id ? input.victim_member_group_admin_id : undefined,
    bankAccount: input.bank_account ? input.bank_account : undefined,
    dateOfAccident: input.date_of_accident ? moment(input.date_of_accident).format('DD MMM YYYY') : undefined,
    activity: input.activity ? input.activity : undefined,
    activityTypes: input.activity_type ? input.activity_type : undefined,
    usedTransport: input.used_transport ? input.used_transport : undefined,
    isDamage: input.isDamage ? input.isDamage : undefined,
    description: input.description ? input.description : undefined,
    involvedPartyDescription: input.involved_party_description ? input.involved_party_description : undefined,
    involvedPartyBirthdate: input.involved_party_birthdate ? input.involved_party_birthdate : undefined,
    officialReportDescription: input.official_report_description ? input.official_report_description : undefined,
    pvNumber: input.pv_number ? input.pv_number : undefined,
    witnessDescription: input.witness_description ? input.witness_description : undefined,
    leadershipDescription: input.leadership_description ? input.leadership_description : undefined,
    country: input.country ? input.country : undefined,
    victim: input.victim_member ? VictimDeserializer(victim) : undefined,
    administrationComment: input.administrationComment ? input.administrationComment : undefined,
    dossierNumber: input.dossierNumber ? input.dossierNumber : undefined,
  }

  return single
}

export const ClaimSerializer = (input: any): any => {
  const single: any = {
    // id: input.id ? input.id : undefined,
    group: input.group.id ? input.group.id : undefined,
    victim_member: input.victimMember ? input.victimMember : undefined,
    // victim_non_member: input.victimNonMember ? input.victimNonMember : undefined,
    // victim_member_group_admin_id: input.victimMemberGroupAdminId ? input.victimMemberGroupAdminId : undefined,
    bank_account: input.victim.bankAccount ? input.victim.bankAccount : undefined,
    date_of_accident: input.dateOfAccident ? input.dateOfAccident + 'T09:00:00.000Z' : undefined,
    activity: input.activity ? input.activity : undefined,
    activity_type: input.activityTypes ? input.activityTypes : undefined,
    used_transport: input.activityTypes.includes(ActivityTypes.IRREGULAR_LOCATION) && input.usedTransport ? input.usedTransport : undefined,
    // isDamage: input.isDamage ? input.isDamage : undefined,
    // damage: input.damage ? input.damage : undefined,
    description: input.description ? input.description : undefined,
    involved_party_description: input.involvedPartyDescription ? input.involvedPartyDescription : undefined,
    involved_party_birthdate: input.involvedPartyBirthdate ? input.involvedPartyBirthdate : undefined,
    official_report_description: input.officialReportDescription ? input.officialReportDescription : undefined,
    pv_number: input.pvNumber ? input.pvNumber : undefined,
    witness_description: input.witnessDescription ? input.witnessDescription : undefined,
    leadership_description: input.leadershipDescription ? input.leadershipDescription : undefined,
    // country: input.country ? input.country : undefined,
    // victim: input.victim ? input.victim : undefined,
  }

  return single
}
