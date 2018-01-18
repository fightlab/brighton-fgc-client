import { combineReducers } from 'redux'
import { auth } from './auth.reducer'
import { event } from './event.reducer'

const rootReducer = combineReducers({
  auth,
  event
})

export default rootReducer
