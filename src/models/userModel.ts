import { Group, GroupDeserializer, orderGroups, removeDuplicates } from '@/serializer/Group'
import { ResponsibleMember } from '@/serializer/ResponsibleMember'

export default class UserModel implements ResponsibleMember {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public permissions: Array<string> = [],
    public email: string,
    public membershipNumber: number,
    public birthDate: string,
    public phoneNumber: string,
    public scoutsGroups: Group[],
    public city: string,
    public groupAdminId: string,
  ) {
    return this
  }

  public static deserialize(input: any): UserModel {
    const mappedGroups = input.scouts_groups.map((group: any) => GroupDeserializer(group))
    console.log('USER: ', input)
    return new UserModel(
      input.group_admin_id,
      input.first_name,
      input.last_name,
      input.user_permissions ? input.user_permissions : [],
      input.email,
      input.membership_number,
      input.birth_date,
      input.phone_number ? input.phone_number.replace(/ /g, '') : undefined,
      mappedGroups,
      input.postcode_city && input.postcode_city.city ? input.postcode_city.city : undefined,
      input.group_admin_id ? input.group_admin_id : undefined
    )
  }
}
