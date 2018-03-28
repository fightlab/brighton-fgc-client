import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../_reducers'

const loggerMiddleware = createLogger()

const middleware = process.env.NODE_ENV === 'development' ? applyMiddleware(thunkMiddleware, loggerMiddleware) : applyMiddleware(thunkMiddleware)

export const store = createStore(
  rootReducer,
  middleware
)
