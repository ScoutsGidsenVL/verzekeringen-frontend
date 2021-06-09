import { Member, MemberDeserializer, MemberSerializer } from '@/serializer/Member'
import { Group, GroupDeserializer, GroupSerializer } from '@/serializer/Group'
import { Vehicle, VehicleDeserializer, VehicleSerializer } from '@/serializer/Vehicle'
import { InsuranceOption, InsuranceOptionDeserializer, InsuranceOptionSerializer } from '@/serializer/InsuranceOption'
import { Coverage, CoverageDeserializer, CoverageSerializer } from '@/serializer/Coverage'

export interface TemporaryVehicleInsurance {
  readonly id?: number
  readonly startDate?: string
  readonly endDate?: string
  readonly comment?: string
  readonly responsiblePhoneNumber?: string
  readonly group?: Group
  readonly vehicle?: Vehicle
  readonly drivers?: Member[]
  readonly owner?: Member
  readonly totalCost?: string
  readonly maxCoverage?: Coverage
  readonly insuranceOption?: InsuranceOption
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
    drivers: input.drivers.map((member: any) => MemberDeserializer(member)),
    owner: input.owner ? MemberDeserializer(input.owner) : undefined,
    totalCost: input.total_cost,
    maxCoverage: input.max_coverage ? CoverageDeserializer(input.max_coverage) : undefined,
    insuranceOption: input.insurance_option ? InsuranceOptionDeserializer(input.insurance_option) : undefined,
  }

  return single
}

export const TemporaryVehicleSerializer = (input: TemporaryVehicleInsurance): TemporaryVehicleInsurance => {
  const single: any = {
    start_date: input.startDate,
    end_date: input.endDate,
    comment: input.comment,
    responsible_phone_number: input.responsiblePhoneNumber ? input.responsiblePhoneNumber : undefined,
    group: GroupSerializer(input.group).name,
    vehicle: input.vehicle && input.vehicle.licensePlate ? VehicleSerializer(input.vehicle) : undefined,
    drivers: input.drivers ? input.drivers.map((member: any) => MemberSerializer(member)) : undefined,
    owner: input.owner ? MemberDeserializer(input.owner) : undefined,
    total_cost: input.totalCost,
    max_coverage: input.maxCoverage ? CoverageSerializer(input.maxCoverage) : undefined,
    insurance_option: input.insuranceOption ? InsuranceOptionSerializer(input.insuranceOption) : undefined,
  }

  return single
}
