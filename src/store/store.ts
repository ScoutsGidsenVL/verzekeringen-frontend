import { createStore } from 'vuex'
import config from './modules/config'
import notifications from './modules/notifications'
import user from './modules/user'

const store = createStore({
  modules: {
    config,
    notifications,
    user
  }
})

export default store
