import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router'
import './index.css'
import MasterConfig from './models/config/masterConfig'
import { OpenIdConnectPlugin } from 'inuits-vuejs-oidc'
import RepositoryFactory from './repositories/repositoryFactory'
import AuthRepository from './repositories/authRepository'
import StaticFileRepository from './repositories/staticFileRepository'

new StaticFileRepository().getFile('config.json').then((result: any) => {
  const app = createApp(App)

  let configFile = result

  configFile = new MasterConfig().deserialize(configFile)

  if (configFile.oidc && configFile.oidc.baseUrl && configFile.oidc.clientId) {
    // @ts-ignore
    app.use(OpenIdConnectPlugin, {
      store: store,
      router: router,
      configuration: {
        baseUrl: configFile.oidc.baseUrl,
        serverBaseUrl: configFile.oidc.serverBaseUrl,
        authEndpoint: configFile.oidc.authEndpoint ? configFile.oidc.authEndpoint : 'auth',
        logoutEndpoint: configFile.oidc.logoutEndpoint ? configFile.oidc.logoutEndpoint : 'logout',
        clientId: configFile.oidc.clientId,
        authorizedRedirectRoute: '/',
        serverTokenEndpoint: 'token/',
        serverRefreshEndpoint: 'refresh/',
        InternalRedirectUrl: '',
      },
    })
  }

  store.dispatch('setConfig', configFile)
  router.beforeEach((to: any, from: any, next: any) => {
    if (to.matched.some((record: any) => record.meta.requiresOpenIdAuth)) {
      if (store.getters.isLoggedIn) {
        !store.getters.loaded
          ? RepositoryFactory.get(AuthRepository)
              .me()
              .then((user: any) => {
                store.dispatch('setUser', user.result).then(() => {
                  next()
                })
              })
              .catch(() => {})
          : next()
      } else {
        next()
      }
    } else {
      next()
    }
  })

  app.use(router).use(store).mount('#app')
})
