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
import { MemberRepository } from './repositories/memberRepository'

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
        InternalRedirectUrl: configFile.oidc.internalRedirectUrl ? configFile.oidc.internalRedirectUrl : '/',
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
                if (user.groupAdminId) {
                  // GET USER BY ID FOR MORE DETAILS
                  RepositoryFactory.get(MemberRepository)
                    .getById(user.groupAdminId)
                    .then((userById) => {
                      console.log('CHECK: ', userById)

                      user.city = userById.postCodeCity.city
                      store.dispatch('setUser', user).then(() => {
                        next()
                      })
                    })
                } else {
                  store.dispatch('setUser', user).then(() => {
                    next()
                  })
                }
              })
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
