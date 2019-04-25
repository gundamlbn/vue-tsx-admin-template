import Vue from 'vue'
import Vuex from 'vuex'
import { AppState } from './modules/app'
import { UserState } from './modules/user'

Vue.use(Vuex)

export type StoreModules = keyof RootState

/**
 * Store的RootState
 */
export type RootState = {
  app: AppState
  user: UserState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<RootState>({})
