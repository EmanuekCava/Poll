import { combineReducers } from 'redux'

import polls from './poll.reducer'
import user from './user.reducer'
import response from './response.reducer'

const pollReducer = combineReducers({
    polls,
    user,
    response
})

export default pollReducer