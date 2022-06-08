import { ActivityTypes } from '@/enums/activityTypes'
import { Country } from '@/serializer/Country'
import { Group, GroupDeserializer } from '@/serializer/Group'
import { Victim, VictimDeserializer, VictimSerializer } from '@/serializer/Victim'
import { ResponsibleMember } from '../ResponsibleMember'
import moment from 'moment'
import { Attachment, AttachmentDeserializer } from './Attachment'
import { Member, MemberDeserializer } from '../Member'

export interface Claim {
  readonly id?: number
  readonly date?: String
  readonly person?: String
  group?: Group
  groupLeader?: ResponsibleMember
  victimMember?: string
  victimNonMember?: string
  readonly victimMemberGroupAdminId?: string
  readonly bankAccount?: string
  readonly dateOfAccident?: string
  readonly activity?: string
  activityTypes?: Array<ActivityTypes>
  usedTransport?: string
  readonly isDamage?: boolean
  readonly damage?: string
  readonly description?: string
  readonly involvedPartyName?: string
  readonly involvedPartyDescription?: string
  readonly involvedPartyBirthdate?: string
  readonly officialReportDescription?: string
  readonly pvNumber?: string
  readonly witnessDescription?: string
  readonly leadershipDescription?: string
  victim?: Victim
  readonly DECLARANT_DATE?: string
  administrationComment?: string
  dossierNumber?: string
  note?: string,
  readonly attachment?: Attachment
  file?: any
  readonly declarantCity?: String
  readonly witnessName?: String
  readonly gender?: String
  readonly victimBirthDate?: String
  readonly victimEmail?: String
  readonly groupNumber?: String
  readonly declarant?: Member
  damageType?: string
  readonly createdOn?: string
  isInvolvedPartyChecked?: string,
  isLeadershipChecked?: string,
  isOfficialReportChecked?: string,
  isWitnessChecked?: string
  readonly attachmentName?: string
}

export const ClaimDeserializer = (input: any): Claim => {
  const single: Claim = {
    id: input.id ? input.id : undefined,
    date: input.date ? input.date : undefined,
    person: input.declarant ? input.declarant : undefined,
    group: input.group ? GroupDeserializer(input.group) : undefined,
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
    involvedPartyName: input.involved_party_name ? input.involved_party_name : undefined,
    involvedPartyDescription: input.involved_party_description ? input.involved_party_description : undefined,
    involvedPartyBirthdate: input.involved_party_birthdate ? input.involved_party_birthdate : undefined,
    officialReportDescription: input.official_report_description ? input.official_report_description : undefined,
    pvNumber: input.pv_number ? input.pv_number : undefined,
    leadershipDescription: input.leadership_description ? input.leadership_description : undefined,
    victim: input.victim ? VictimDeserializer(input.victim) : undefined,
    administrationComment: input.administrationComment ? input.administrationComment : undefined,
    dossierNumber: input.case_number ? input.case_number : undefined,
    note: input.note ? input.note : undefined,
    attachment: input.attachment ? AttachmentDeserializer(input.attachment) : undefined,
    declarantCity: input.declarant_city ? input.declarant_city : undefined,
    witnessName: input.witness_name ? input.witness_name : undefined,
    witnessDescription: input.witness_description ? input.witness_description : undefined,
    gender: input.gender ? input.gender : undefined,
    victimBirthDate: input.victim_birth_date ? input.victim_birth_date : undefined,
    victimEmail: input.victim_email ? input.victim_email : undefined,
    groupNumber: input.group_group_admin_id ? input.group_group_admin_id : undefined,
    declarant: input.declarant ? MemberDeserializer(input.declarant) : undefined,
    damageType: input.damage_type ? input.damage_type : undefined,
    createdOn: input.created_on ? moment(input.created_on).format('DD MMM YYYY') : undefined,
    isWitnessChecked: input.witness ? input.witness : null,
    isInvolvedPartyChecked: input.involved_party ? input.involved_party : null,
    isLeadershipChecked: input.leadership ? input.leadership : null,
    isOfficialReportChecked: input.official_report ? input.official_report : null,
    attachmentName: input.attachment_name ? input.attachment_name : undefined,
  }

  return single
}

export const ClaimSerializer = (input: any): any => {
  input.victim.gender = input.gender

  const single: any = {
    group_group_admin_id: input.group.id ? input.group.id : undefined,
    victim_member: input.victimMember ? input.victimMember : undefined,
    victim_non_member: input.victimNonMember ? input.victimNonMember : undefined,
    bank_account: input.victim.bankAccount ? input.victim.bankAccount.replace(/ /g, '') : undefined,
    date_of_accident: input.dateOfAccident ? input.dateOfAccident + 'T09:00:00.000Z' : undefined,
    activity: input.activity ? input.activity : undefined,
    activity_type: input.activityTypes ? input.activityTypes : undefined,
    used_transport: input.activityTypes.includes(ActivityTypes.TRANSPORT) && input.usedTransport ? input.usedTransport : undefined,
    description: input.description ? input.description : undefined,
    involved_party_name: input.involvedPartyName ? input.involvedPartyName : '',
    involved_party_description: input.involvedPartyDescription ? input.involvedPartyDescription : '',
    involved_party_birthdate: input.involvedPartyBirthdate ? input.involvedPartyBirthdate : '',
    official_report_description: input.officialReportDescription ? input.officialReportDescription : '',
    pv_number: input.pvNumber ? input.pvNumber : '',
    leadership_description: input.leadershipDescription ? input.leadershipDescription : undefined,
    declarant_city: input.declarantCity ? input.declarantCity : undefined,
    witness_name: input.witnessName ? input.witnessName : '',
    witness_description: input.witnessDescription ? input.witnessDescription : '',
    gender: input.gender ? input.gender : undefined,
    victim_birth_date: input.victimBirthDate ? input.victimBirthDate : undefined,
    victim_email: input.victimEmail ? input.victimEmail : undefined,
    // isDamage: input.isDamage ? input.isDamage : undefined,
    // damage: input.damage ? input.damage : undefined,
    victim: input.victim ? VictimSerializer(input.victim) : undefined,
    file: input.file ? input.file : undefined,
    damage_type: input.damageType ? input.damageType : undefined,
    witness: input.isWitnessChecked ? input.isWitnessChecked : null,
    official_report: input.isOfficialReportChecked ? input.isOfficialReportChecked : null,
    leadership: input.isLeadershipChecked ? input.isLeadershipChecked : null,
    involved_party: input.isInvolvedPartyChecked ? input.isInvolvedPartyChecked : null
  }
  return single
}
