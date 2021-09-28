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
    public groupAdminId: string
  ) {
    console.log("usermodel: SCOUTS_GROUPS -------------------")
    console.log(scoutsGroups)
    return this
  }

  public static deserialize(input: any): UserModel {
    // HARDCODED GROUPS ONLY FOR TESTING
    // input.scouts_groups.push({ id: 'X1121G', name: 'We-Residenten De Kluis', location: ' Borgerhout (Antwerpen)' })
    // input.scouts_groups.push({ id: 'X1027G', name: 'Personeel Secretariaat', location: ' Borgerhout (Antwerpen)' })
    // input.scouts_groups.push({ id: 'X1123G', name: 'We-Residenten De Winner', location: ' Borgerhout (Antwerpen)' })
    console.log("userModel.deserialize(): SCOUTS_GROUPS -----------------------")
    if (input) {
      console.log(input.scouts_groups)
    }
    const groups = removeDuplicates(input.scouts_groups)
    return new UserModel(
      input.id,
      input.first_name,
      input.last_name,
      input.permissions,
      input.email,
      input.membership_number,
      input.birth_date,
      input.phone_number ? input.phone_number.replace(/ /g, '') : undefined,
      orderGroups(groups.map((group: any) => GroupDeserializer(group))),
      input.postcode_city && input.postcode_city.city ? input.postcode_city.city : undefined,
      input.group_admin_id ? input.group_admin_id : undefined
    )
  }
}
