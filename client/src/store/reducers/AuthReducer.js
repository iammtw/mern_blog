import jwt_decode from "jwt-decode";
import { SET_TOKEN, SET_LOADER, CLOSE_LOADER,REGISTER_ERRORS,LOGOUT, LOGIN_ERRORS  } from "../types/UserTypes";

const initState = {
    loading : false,
    registerErrors : [],
    loginErrors : [],
    token :'',
    user : ''
}

const verifyToken = (token) => {
    const decodeToken = jwt_decode(token)
    const expiresIn = new Date(decodeToken.exp * 1000);
    if(new Date() > expiresIn){
        localStorage.removeItem('myToken')
        return null;
    } else {
        return decodeToken;
    }
}

const token = localStorage.getItem('myToken');
if(token){
    const decodedToken = verifyToken(token)
    initState.token = token;
    initState.user = decodedToken.user
}

const AuthReducer = (state= initState, action) => {

    if(action.type === SET_LOADER){
        return {...state, loading: true}

    } else if(action.type === CLOSE_LOADER){
        return {...state, loading: false}

    } else if(action.type === REGISTER_ERRORS){
        return {...state, registerErrors: action.payload}

    } else if(action.type === SET_TOKEN){
       const decoded = verifyToken(action.payload)
       const {user} = decoded;
       return {...state, token: action.payload, user: user, loginErrors: [], registerErrors: [] }

    } else if(action.type === LOGOUT){
        return {...state, token: '', user: '' }

    }  else if(action.type === LOGIN_ERRORS){
        return {...state, loginErrors: action.payload}

    } else {
        return state
    }    
}

export default AuthReducer;