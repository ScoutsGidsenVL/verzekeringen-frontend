import axios, { AxiosResponse } from 'axios'

export default class StaticFileRepository {
  public getFile(fileUrl: string): Promise<any> {
    return axios.get(process.env.BASE_URL + fileUrl).then(function (result: AxiosResponse) {
      return result.data
    })
  }
}
