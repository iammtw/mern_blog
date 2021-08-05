import axios from 'axios';

import { 
    SET_LOADER, 
    REMOVE_ERRORS,
    CLOSE_LOADER, 
    CREATE_ERRORS, 
    REDIRECT_FALSE, 
    REDIRECT_TRUE, 
    SET_MESSAGE, 
    REMOVE_MESSAGE,
    SET_POSTS 
} from '../types/PostTypes'

// const token = localStorage.getItem('myToken')

export const createAction = (postData) => {
    return async (dispatch, getState) => {
        const {AuthReducer : {token}} = getState()
        // const token = 'adsadsad'; 
        dispatch({ type: SET_LOADER })

        const config = {
            headers : {
                Authorization: `Bearer  ${token}`
            }
        }
       try {
        const {data: { msg }} = await axios.post('/create_post',postData, config);
        dispatch({ type: CLOSE_LOADER })
        dispatch({ type: REMOVE_ERRORS })
        dispatch({ type: REDIRECT_TRUE })
        dispatch({ type: SET_MESSAGE, payload: msg })
       } catch (error) {
        dispatch({ type: CLOSE_LOADER })
        const { errors } = error.response.data;
        dispatch({ type: CREATE_ERRORS, payload: errors })
       }
    }
}

export const fetchPosts = (id) => {
    return async (dispatch, getState)=> {
        const {AuthReducer : {token}} = getState()
        dispatch({ type: SET_LOADER })

        try {
            const config = {
                headers : {
                    Authorization: `Bearer  ${token}`
                }
            }
            const { data : { response } } = await axios.get(`/posts/${id}`, config);
            dispatch({ type: CLOSE_LOADER })
            dispatch({ type: SET_POSTS, payload: response })
        } catch (error) {
            dispatch({ type: CLOSE_LOADER })
        }

    }
}


