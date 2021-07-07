import notifications from './modules/notifications'
import insurance from './modules/insurance'
import config from './modules/config'
import claim from './modules/claim'
import { createStore } from 'vuex'
import user from './modules/user'

const store = createStore({
  modules: {
    notifications,
    insurance,
    config,
    claim,
    user,
  },
})

export default store
