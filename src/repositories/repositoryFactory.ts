import BaseApiRepository from './baseApiRepository'

export default class RepositoryFactory {
  private static repositoryInstances: any = {}

  public static get<T extends BaseApiRepository> (
    RepositoryClass: new (...params: any[]) => T
  ): T {
    const repositoryId = new RepositoryClass().id
    let repository = this.repositoryInstances[repositoryId]

    if (!repository) {
      repository = new RepositoryClass()
      this.repositoryInstances[repositoryId] = repository
    }
    return repository
  }
}
