import { ResponsibleMember, ResponsibleMemberDeserializer, ResponsibleMemberSerializer } from '@/serializer/ResponsibleMember'
import { Coverage, CoverageDeserializer, CoverageSerializer, roundLabel } from '@/serializer/Coverage'
import { DraftVehicleSerializer, Vehicle, VehicleDeserializer, VehicleSerializer } from '@/serializer/Vehicle'
import { Group, GroupDeserializer, GroupSerializer } from '@/serializer/Group'
import { Owner, OwnerDeserializer, OwnerSerializer } from '@/serializer/Owner'
import { MemberSerializer } from '@/serializer/Member'
import { SelectDriver } from '@/serializer/selectDriver'
import { Driver, DriverDeserializer } from '@/serializer/Driver'
import { InsuranceOption } from '../InsuranceOption'
import moment from 'moment'

export interface TemporaryVehicleInsurance {
  readonly id?: number
  readonly startDate?: string
  readonly endDate?: string
  readonly comment?: string
  readonly responsiblePhoneNumber?: string
  readonly group?: Group
  readonly vehicle?: Vehicle
  readonly drivers?: Driver[]
  readonly owner?: Owner
  readonly input?: Owner
  totalCost?: string
  readonly maxCoverage?: Coverage
  readonly insuranceOptions?: Array<number>
  readonly selectDriverField?: SelectDriver
  readonly responsibleMember?: ResponsibleMember
  readonly vvksComment?: string
}

export const TemporaryVehicleDeserializer = (input: any): TemporaryVehicleInsurance => {
  const single: TemporaryVehicleInsurance = {
    id: input.id ? input.id : undefined,
    startDate: input.start_date ? moment(input.start_date).format('YYYY-MM-DD') : undefined,
    endDate: input.end_date ? moment(input.end_date).format('YYYY-MM-DD') : undefined,
    comment: input.comment ? input.comment : undefined,
    responsiblePhoneNumber: input.responsible_phone_number ? input.responsible_phone_number : undefined,
    group: input.group ? GroupDeserializer(input.group) : undefined,
    vehicle: input.vehicle && input.vehicle.license_plate ? VehicleDeserializer(input.vehicle) : undefined,
    drivers: input.drivers ? input.drivers.map((member: any) => DriverDeserializer(member)) : undefined,
    owner: input.owner ? OwnerDeserializer(input.owner) : undefined,
    totalCost: input.total_cost ? input.total_cost : undefined,
    maxCoverage: input.max_coverage ? roundLabel(input.max_coverage) : undefined,
    insuranceOptions: input.insurance_options ? (typeof input.insurance_options[0] === 'object' ? returnArrayWithValues(input.insurance_options) : input.insurance_options) : undefined,
    responsibleMember: input.responsible_member ? ResponsibleMemberDeserializer(input.responsible_member) : undefined,
    vvksComment: input.vvks_comment && input.vvks_comment.length > 0 ? input.vvks_comment : '',
  }

  return single
}

export const TemporaryVehicleSerializer = (input: TemporaryVehicleInsurance): TemporaryVehicleInsurance => {
  const single: any = {
    start_date: input.startDate ? moment(input.startDate).format('YYYY-MM-DDTh:mm:ss') : undefined,
    end_date: input.endDate ? moment(input.endDate).format('YYYY-MM-DDTh:mm:ss') : undefined,
    comment: input.comment ? input.comment : undefined,
    responsible_phone_number: input.responsibleMember ? ResponsibleMemberSerializer(input.responsibleMember).responsible_phone_number : undefined,
    group: input.group ? GroupSerializer(input.group).id : undefined,
    vehicle: input.vehicle && input.vehicle.licensePlate ? VehicleSerializer(input.vehicle) : undefined,
    drivers: input.drivers ? input.drivers.map((member: any) => MemberSerializer(member)) : undefined,
    owner: input.owner ? OwnerSerializer(input.owner) : undefined,
    max_coverage: input.maxCoverage ? CoverageSerializer(input.maxCoverage).value : undefined,
    insurance_options: input.insuranceOptions ? input.insuranceOptions : undefined,
  }

  return single
}

export const DraftTemporaryVehicleSerializer = (input: TemporaryVehicleInsurance): TemporaryVehicleInsurance => {
  const single: any = {
    start_date: input.startDate ? moment(input.startDate).format('YYYY-MM-DDTh:mm:ss') : undefined,
    end_date: input.endDate ? moment(input.endDate).format('YYYY-MM-DDTh:mm:ss') : undefined,
    comment: input.comment ? input.comment : undefined,
    responsible_phone_number: input.responsibleMember ? ResponsibleMemberSerializer(input.responsibleMember).responsible_phone_number : undefined,
    group: input.group ? GroupSerializer(input.group).id : undefined,
    vehicle: input.vehicle && input.vehicle.licensePlate ? DraftVehicleSerializer(input.vehicle) : undefined,
    drivers: input.drivers ? input.drivers.map((member: any) => MemberSerializer(member)) : undefined,
    owner: input.owner ? OwnerSerializer(input.owner) : undefined,
    max_coverage: input.maxCoverage ? input.maxCoverage : undefined,
    insurance_options: input.insuranceOptions ? input.insuranceOptions : undefined,
  }

  return single
}

const returnArrayWithValues = (options: Array<InsuranceOption>) => {
  const arr: Array<any> = []
  options.forEach((option) => {
    arr.push(option.value)
  })
  return arr
}
