import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import User from './User'
import DS13318 from './DS13318'
import Kep13313 from './Kep13318'
import Services from './Services'

const RootReducer = (history) => combineReducers({
  router: connectRouter(history),
  User,
  DS13318,
  Kep13313,
  Services
})

export default RootReducer
