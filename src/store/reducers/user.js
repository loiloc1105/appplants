
import {SIGN_IN ,SIGN_OUT} from '../actions/userAction'

const intitalState = {
    isSignout: false,
    userToken: '',
    user:  {}
}

export default (state = intitalState, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                isSignout: false,
                userToken: action.payload.token,
                user :{...action.payload.profile}
                 }
        case SIGN_OUT:
            return {
                ...state,
                isSignout: true,
                userToken: '',
                user : {}
            }
    }
    return state
}