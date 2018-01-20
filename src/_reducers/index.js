import { combineReducers } from 'redux'
import { auth } from './auth.reducer'
import { event } from './event.reducer'
import { game } from './game.reducer'

const rootReducer = combineReducers({
  auth,
  event,
  game
})

export default rootReducer
