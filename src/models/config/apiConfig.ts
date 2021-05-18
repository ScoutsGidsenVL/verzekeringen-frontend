import Serializable from '../../interfaces/serializable'

export default class ApiConfig implements Serializable<ApiConfig> {
  baseUrl!: string
  apiSuffix!: string

  deserialize(input: any) {
    this.baseUrl = input.baseUrl
    this.apiSuffix = input.apiSuffix

    if (!this.baseUrl) {
      throw new Error('Config needs an api baseUrl and apiSuffix')
    }

    return this
  }
}
