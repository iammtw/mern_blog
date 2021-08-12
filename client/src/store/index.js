import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

import AuthReducer from './reducers/AuthReducer'
import {PostReducer, FetchPosts,FetchPost, UpdatePost, UpdateImage} from './reducers/PostReducer'
import UpdateName from './reducers/ProfileReducer';

const rootReducers = combineReducers({
    AuthReducer,
    PostReducer,
    FetchPosts,
    FetchPost,
    UpdatePost,
    UpdateImage,
    UpdateName
})

const middlewares = [thunkMiddleware];

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;