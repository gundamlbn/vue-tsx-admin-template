import keyMirror from 'keymirror'
import { UserMutationKeys } from './modules/user'
import { AppMutationKeys } from './modules/app'

export const AppMutationTypes = keyMirror<Record<AppMutationKeys, null>>({
  TOGGLE_SIDEBAR: null,
  CLOSE_SIDEBAR: null,
  TOGGLE_DEVICE: null
})

export const UserMutationTypes = keyMirror<Record<UserMutationKeys, null>>({
  SET_TOKEN: null
})
