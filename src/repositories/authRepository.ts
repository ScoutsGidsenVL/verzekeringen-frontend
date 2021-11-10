import UserModel from '../models/userModel'
import BaseApiRepository from './baseApiRepository'

export default class AuthRepository extends BaseApiRepository {
  id = 'auth'

  me(): Promise<UserModel> {
    return this.get('/ga/members/profile').then((input: any) => {
      return UserModel.deserialize(input)
    })
  }
}
