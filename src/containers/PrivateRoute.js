import { connect } from 'react-redux'
import PrivateRouteComponent from '../components/PrivateRoute'

import * as actions from '../actions'

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
  //LogoutSaga: () => dispatch(actions.LogoutSaga())
  }
}

function mapStateToProps(state) {
  const { User, router } = state
  return {
    isAuthenticated: User.isAuthenticated,
    router
  }
}

export const PrivateRoute = connect(mapStateToProps,{})(PrivateRouteComponent)

//export const PrivateRoute = connect((state) => ({isAuthenticated:state.bpgservices.isAuthenticated}), {})(PrivateRouteComponent)


//state.bpgservices.app.authentication.authenticated  I don't think using this is a good idea since I don't think I should change
// the value with a dispatch
/*

const mapStateToProps = (state) => {
    return {
        servers: state.servers
    }
}
*/
/*
const mapStateToProps = (state, ownProps) => ({
  bpgservices: state.bpgservices,
  ...ownProps
})

export const PrivateRoute = connect(
    mapStateToProps,
    {}
)(PrivateRouteComponent)

*/
/*
const mapDispatchToProps = (dispatch) => {
    return {
        onSearchPressed: (e) => {
            dispatch(submitSearch(navigator)) // This is where I want to use the injected navigator
        }
    }
}

const SearchViewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchView)

export default SearchViewContainer
*/
