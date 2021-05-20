import notifications from './modules/notifications'
import insurance from './modules/insurance'
import config from './modules/config'
import { createStore } from 'vuex'
import user from './modules/user'

const store = createStore({
  modules: {
    notifications,
    insurance,
    config,
    user,
  },
})

export default store
