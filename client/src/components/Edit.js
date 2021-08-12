import React from 'react'
import { Helmet } from "react-helmet"
import { useParams, useHistory } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost, updateAction } from './../store/asyncMethods/PostMethod';
import { POST_RESET, RESET_UPDATE_ERRORS } from './../store/types/PostTypes';
import toast, { Toaster } from 'react-hot-toast';
import Loader from './Loader';

const Edit = () => {
    const { id } = useParams();
    const [value, setValue] = useState('');
    const [state, setState] = useState({
        title: '',
        description: '',
    })

    const dispatch = useDispatch()
    const {loading, redirect}  = useSelector(state => state.PostReducer)
    const {post, postStatus} = useSelector(state => state.FetchPost);
    const {editErrors} = useSelector(state => state.UpdatePost)
    const {push} = useHistory();

    const updatePost = (e) => {
        e.preventDefault();
        dispatch(updateAction({
            title: state.title,
            body: value,
            description: state.description,
            id: post._id
        }))
    }

    useEffect(()=> {
        if(postStatus){
            setState({
                title: post.title,
                description: post.description
            })
            setValue(post.body)
            dispatch({  type: POST_RESET})
        } else {
            dispatch(fetchPost(id))
        }
        
    },[post])

    useEffect(()=> {
        if(editErrors.length > 0){
            editErrors.map(error=>  toast.error(error.msg))
            dispatch({ type: RESET_UPDATE_ERRORS })
        }
    },[editErrors])

    useEffect(()=>{
        if(redirect){
            push('/dashboard');
        }
    },[redirect])
    

    return !loading ? (
        <div className="mt-100">
            <Helmet>
                <title> Edit Post | Blog </title>
                <meta name='description' content='Learn HTML,CSS, Javascript, React, Vue, Flutter etc'/>
            </Helmet>
            <Toaster  
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        fontSize: '14px'
                    },
                    }}
            />
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div className="card">
                            <h3 className='card__h3'> Edit Post </h3>
                            <form onSubmit={updatePost}>
                                <div className="group">
                                    <label htmlFor="title">Post Title</label>
                                    <input type="text" 
                                    name='title' 
                                    id='title' 
                                    value={state.title} 
                                    className='group__control' 
                                    onChange={ (e) => setState({ ...state, title: e.target.value })  } />
                                </div>
                                <div className="group">
                                    <label htmlFor="description">Description</label>
                                    <ReactQuill placeholder='Enter Description' theme="snow" id='description' value={value} onChange={setValue}/>
                                </div>
                                <div className="group">
                                    <label htmlFor="description">Meta Description</label>
                                    <textarea 
                                        name="description" 
                                        defaultValue={state.description} 
                                        onChange={ (e) => setState({ ...state, description: e.target.value })  } 
                                        onKeyUp={ (e) => setState({ ...state, description: e.target.value })  } 
                                        className='group__control' 
                                        placeholder='Enter Meta Description' 
                                        maxLength='150' id="description" cols="30" rows="10"> 
                                    </textarea>
                                    <p className='length'>
                                    {state.description ? state.description.length : 0} /150
                                    </p>
                                </div>
                                <div className="group">
                                    <input type="submit" value="Update Post" className='btn btn-block btn-default btn-success' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : <Loader />
}

export default Edit
