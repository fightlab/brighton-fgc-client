import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../_reducers'

const loggerMiddleware = createLogger()

const middleware = process.env.NODE_ENV === 'sdevelopment' ? applyMiddleware(thunkMiddleware, loggerMiddleware) : applyMiddleware(thunkMiddleware)

export const createstore = (state = {}) => createStore(
  rootReducer,
  state,
  middleware
)
