import axios from 'axios';

import { 
    SET_LOADER, 
    REMOVE_ERRORS,
    CLOSE_LOADER, 
    CREATE_ERRORS, 
    REDIRECT_TRUE, 
    SET_MESSAGE, 
    SET_POSTS,
    SET_POST,
    POST_REQUEST,
    SET_UPDATE_ERRORS,
    UPDATE_IMAGE_ERRORS
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

export const fetchPosts = (id,page) => {
    return async (dispatch, getState)=> {
        const {AuthReducer : {token}} = getState()
        dispatch({ type: SET_LOADER })

        try {
            const config = {
                headers : {
                    Authorization: `Bearer  ${token}`
                }
            }
            const { data : { response, count, perPage } } = await axios.get(`/posts/${id}/${page}`, config);
            dispatch({ type: CLOSE_LOADER })
            dispatch({ type: SET_POSTS, payload: {response, count, perPage} })
        } catch (error) {
            dispatch({ type: CLOSE_LOADER })
        }

    }
}

export const fetchPost = (id) => {
    return async (dispatch, getState)=> {
        const {AuthReducer : {token}} = getState()
        dispatch({ type: SET_LOADER })
        try {
            const config = {
                headers : {
                    Authorization: `Bearer  ${token}`
                }
            }
            const { data : { response } } = await axios.get(`/post/${id}`, config);
            dispatch({ type: CLOSE_LOADER })
            dispatch({ type: SET_POST, payload: response })
            dispatch({ type: POST_REQUEST })
        } catch (error) {
            dispatch({ type: CLOSE_LOADER })
        }

    }
}

export const updateAction = (editData) => {
    return async (dispatch, getState)=> {
        const {AuthReducer : {token}} = getState()
        const config = {
            headers : {
                Authorization: `Bearer  ${token}`
            }
        }
        dispatch({ type: SET_LOADER })
        try {
            const { data } = await axios.post(`/update`,editData, config);
            dispatch({ type: CLOSE_LOADER })
            dispatch({ type: REDIRECT_TRUE })
            dispatch({ type: SET_MESSAGE, payload: data.msg })
        } catch (error) {
            const { data: {errors} } = error.response;
            dispatch({ type: CLOSE_LOADER })
            dispatch({ type: SET_UPDATE_ERRORS, payload: errors })
        }

    }
}

export const updateImageAction = (updateData) => {
    return async (dispatch, getState)=> {
        const {AuthReducer : {token}} = getState()
        const config = {
            headers : {
                Authorization: `Bearer  ${token}`
            }
        }
        dispatch({ type: SET_LOADER })
        try {
            const { data : {msg} } = await axios.post(`/updateImage`,updateData, config);
            dispatch({ type: CLOSE_LOADER })
            dispatch({ type: REDIRECT_TRUE })
            dispatch({ type: SET_MESSAGE, payload: msg })
        } catch (error) {
            const { data: {errors} } = error.response;
            dispatch({ type: CLOSE_LOADER })
            dispatch({ type: UPDATE_IMAGE_ERRORS, payload: errors })
        }

    }
}

export const homePosts = (page) => {
    return async (dispatch)=> {
        dispatch({ type: SET_LOADER })
        try {
            const { data : { response, count, perPage } } = await axios.get(`/home/${page}`);
            dispatch({ type: CLOSE_LOADER })
            dispatch({ type: SET_POSTS, payload: {response, count, perPage} })
        } catch (error) {
            dispatch({ type: CLOSE_LOADER })
        }

    }
}



