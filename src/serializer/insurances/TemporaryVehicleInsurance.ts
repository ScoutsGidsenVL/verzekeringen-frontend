import { ResponsibleMember, ResponsibleMemberDeserializer, ResponsibleMemberSerializer } from '@/serializer/ResponsibleMember'
import { Coverage, CoverageDeserializer, CoverageSerializer } from '@/serializer/Coverage'
import { Vehicle, VehicleDeserializer, VehicleSerializer } from '@/serializer/Vehicle'
import { Group, GroupDeserializer, GroupSerializer } from '@/serializer/Group'
import { Owner, OwnerDeserializer, OwnerSerializer } from '@/serializer/Owner'
import { MemberSerializer } from '@/serializer/Member'
import { SelectDriver } from '@/serializer/selectDriver'
import { Driver, DriverDeserializer } from '@/serializer/Driver'
import { InsuranceOption } from '../InsuranceOption'

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
}

export const TemporaryVehicleDeserializer = (input: any): TemporaryVehicleInsurance => {
  const single: TemporaryVehicleInsurance = {
    id: input.id ? input.id : undefined,
    startDate: input.start_date,
    endDate: input.end_date,
    comment: input.comment ? input.comment : undefined,
    responsiblePhoneNumber: input.responsible_phone_number ? input.responsible_phone_number : undefined,
    group: GroupDeserializer(input.group),
    vehicle: input.vehicle && input.vehicle.license_plate ? VehicleDeserializer(input.vehicle) : undefined,
    drivers: input.drivers.map((member: any) => DriverDeserializer(member)),
    owner: input.owner ? OwnerDeserializer(input.owner) : undefined,
    totalCost: input.total_cost,
    maxCoverage: input.max_coverage ? CoverageDeserializer(input.max_coverage) : undefined,
    insuranceOptions: input.insurance_options ? returnArrayWithValues(input.insurance_options) : undefined,
    responsibleMember: ResponsibleMemberDeserializer(input.responsible_member),
  }

  return single
}

export const TemporaryVehicleSerializer = (input: TemporaryVehicleInsurance): TemporaryVehicleInsurance => {
  const single: any = {
    start_date: input.startDate,
    end_date: input.endDate,
    comment: input.comment,
    responsible_phone_number: ResponsibleMemberSerializer(input.responsibleMember).responsible_phone_number,
    group: GroupSerializer(input.group).name,
    vehicle: input.vehicle && input.vehicle.licensePlate ? VehicleSerializer(input.vehicle) : undefined,
    drivers: input.drivers ? input.drivers.map((member: any) => MemberSerializer(member)) : undefined,
    owner: input.owner ? OwnerSerializer(input.owner) : undefined,
    max_coverage: input.maxCoverage ? CoverageSerializer(input.maxCoverage).value : undefined,
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
