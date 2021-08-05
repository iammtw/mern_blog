import axios from "axios"
import { SET_TOKEN, SET_LOADER, CLOSE_LOADER,REGISTER_ERRORS,LOGIN_ERRORS  } from "../types/UserTypes";

export const PostRegister = (state) => {
    // access dispatch by this function due to thunk middleware
    return async (dispatch) => {
        const config = {
            headers : {
               "Content-Type":"application/json"
            }
         }
         dispatch({ type: SET_LOADER })
         
        try {
          const response =  await axios.post('/register', state, config)
          dispatch({ type: CLOSE_LOADER })
          const {data} = response;
          localStorage.setItem('myToken',data.token);
          dispatch({ type: SET_TOKEN, payload : data.token })
          
        } catch (error) {
           dispatch({ type: CLOSE_LOADER })
           dispatch({ type: REGISTER_ERRORS, payload: error.response.data.errors })
        }
    }
}

export const PostLogin = (state)=> {
    return async (dispatch) => {
        const config = {
            headers : {
               "Content-Type":"application/json"
            }
         }
         try {
             dispatch({ type: SET_LOADER })
             const {data} = await axios.post('/login', state, config);
             dispatch({ type: CLOSE_LOADER })
             localStorage.setItem('myToken', data.token)
             dispatch({ type: SET_TOKEN, payload: data.token})
         } catch (error) {
             dispatch({ type: CLOSE_LOADER })
             dispatch({ type: LOGIN_ERRORS, payload: error.response.data.errors })
         }
    }
}