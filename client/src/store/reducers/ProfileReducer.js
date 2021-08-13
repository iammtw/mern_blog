import { 
    SET_PROFILE_ERRORS, 
    RESET_PROFILE_ERRORS, 
} from '../types/ProfileTypes'

const initState = {
    updateErrors : []
}

const UpdateName = (state= initState, action) => {
    const {type, payload} = action;
    if(type === SET_PROFILE_ERRORS){
        return { ...state, updateErrors: payload } 
    } else if(type === RESET_PROFILE_ERRORS){
        return { ...state, updateErrors: [] } 
    } else {
        return state;
    }
    
   
}

export default UpdateName;