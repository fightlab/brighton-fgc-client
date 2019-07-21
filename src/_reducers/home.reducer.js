import merge from 'lodash/merge'

const init = {
  statistics: {}
}

export const home = (state = init, action) => {
  return merge({}, state, action)
}
