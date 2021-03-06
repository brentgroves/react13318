import { connect } from 'react-redux'
import AppComponent from '../components/App'

import * as actions from '../actions'

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    Push: (path) => dispatch(actions.Push(path)),
  Logout: () => dispatch(actions.Logout())
  }
}

function mapStateToProps(state) {
  const { User,router } = state
  return {
    isAuthenticated: User.isAuthenticated,
    isAdmin: User.isAdmin,
    userName: User.userName,
    firstName: User.firstName,
    lastName: User.lastName,
    pathname: router.location.pathname,
    search: router.location.search,
    hash: router.location.hash


  }
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent)
