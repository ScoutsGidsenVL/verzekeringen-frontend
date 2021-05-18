import Serializable from '../../interfaces/serializable'
import ApiConfig from './apiConfig'
import OidcConfig from './oidcConfig'

export default class MasterConfig implements Serializable<MasterConfig> {
  api!: ApiConfig
  oidc!: OidcConfig

  deserialize(input: any) {
    if (input.api) {
      this.api = new ApiConfig().deserialize(input.api)
    }
    if (input.oidc) {
      this.oidc = new OidcConfig().deserialize(input.oidc)
    }
    return this
  }
}
