import Vue from 'vue'
import Vuex from 'vuex'
import admin from '@/store/modules/admin'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    admin: admin
  },
  plugins: [
    createPersistedState()
  ]
})
