import { combineReducers } from 'redux'
import { auth } from './auth.reducer'
import { event } from './event.reducer'
import { game } from './game.reducer'
import { tournament } from './tournament.reducer'

const rootReducer = combineReducers({
  auth,
  event,
  game,
  tournament
})

export default rootReducer
