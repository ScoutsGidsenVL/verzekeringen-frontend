import UserModel from '../models/userModel'
import BaseApiRepository from './baseApiRepository'

export default class AuthRepository extends BaseApiRepository {
  id = 'auth'

  me(): Promise<UserModel> {
    return this.get('/auth/me/').then((input: any) => {
      console.log('raw fetched user: ', input)
      return UserModel.deserialize(input)
    })
  }
}
