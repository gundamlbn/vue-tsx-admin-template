import keyMirror from 'keymirror'

export const AppMutationTypes = keyMirror({
  TOGGLE_SIDEBAR: null,
  CLOSE_SIDEBAR: null,
  TOGGLE_DEVICE: null
})

export const UserMutationTypes = keyMirror({
  SET_TOKEN: null
})
