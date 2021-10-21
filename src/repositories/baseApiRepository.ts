import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { OpenIdConnectInterceptors } from 'inuits-vuejs-oidc'
import { Store } from 'vuex'
import MasterConfig from '../models/config/masterConfig'
import store from '../store/store'

export default abstract class BaseApiRepository {
  private axiosInstance: AxiosInstance
  private publicAxiosInstance: AxiosInstance
  abstract id: string

  constructor() {
    // const config: MasterConfig = getModule(configModule, store).config
    const config: MasterConfig = store.getters.config
    this.axiosInstance = axios.create({
      baseURL: config.api.baseUrl + '/' + config.api.apiSuffix,
    })
    this.publicAxiosInstance = axios.create({
      baseURL: config.api.baseUrl + '/' + config.api.apiSuffix,
    })

    // Add oidc interceptors
    if (config.oidc && config.oidc.clientId) {
      this.axiosInstance.interceptors.request.use(
        // @ts-ignore
        OpenIdConnectInterceptors.buildRequestTokenInterceptorCallback(store)
      )

      this.axiosInstance.interceptors.response.use(
        function (response) {
          return response
        },
        (error) => OpenIdConnectInterceptors.buildResponseErrorInterceptorCallback(error, store)
      )
    }
  }

  protected get(endpoint: string, config: AxiosRequestConfig = {}, publicCall: Boolean = false): Promise<any> {
    const instance = publicCall && !store.getters['openid/isLoggedIn'] ? this.publicAxiosInstance : this.axiosInstance
    return instance
      .get(endpoint, config)
      .then(function (result: AxiosResponse) {
        // Only return the data of response
        return result.data
      })
      .catch((error: any) => {
        return this.processError(error)
      })
  }

  protected post(endpoint: string, data: any, config: AxiosRequestConfig = {}): Promise<any> {
    return this.axiosInstance
      .post(endpoint, data, config)
      .then(function (result: AxiosResponse) {
        // Only return the data of response
        return result.data
      })
      .catch((error: Error) => {
        throw error
      })
  }

  protected patch(endpoint: string, data: any, config: AxiosRequestConfig = {}): Promise<any> {
    return this.axiosInstance
      .patch(endpoint, data, config)
      .then(function (result: AxiosResponse) {
        // Only return the data of response
        return result.data
      })
      .catch((error: any) => {
        return this.processError(error)
      })
  }

  protected put(endpoint: string, data: any, config: AxiosRequestConfig = {}): Promise<any> {
    return this.axiosInstance
      .put(endpoint, data, config)
      .then(function (result: AxiosResponse) {
        // Only return the data of response
        return result.data
      })
      .catch((error: any) => {
        return this.processError(error)
      })
  }

  protected delete(endpoint: string): Promise<any> {
    return this.axiosInstance
      .delete(endpoint)
      .then(function (result: AxiosResponse) {
        // Only return the data of response
        return result.data
      })
      .catch((error: any) => {
        return this.processError(error)
      })
  }

  protected getFile(endpoint: string, config: AxiosRequestConfig = {}, publicCall: Boolean = false): Promise<any> {
    config = {
      ...config,
      responseType: 'blob',
    }
    const instance = publicCall && !store.getters['openid/isLoggedIn'] ? this.publicAxiosInstance : this.axiosInstance
    return instance
      .get(endpoint, config)
      .then(function (result: AxiosResponse) {
        // Only return the data of response
        return result.data
      })
      .catch((error: any) => {
        return this.processError(error)
      })
  }

  private processError(error: any): void {}
}
