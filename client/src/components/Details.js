import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Helmet } from "react-helmet"
import { postComment, postDetails } from './../store/asyncMethods/PostMethod';
import toast, { Toaster } from 'react-hot-toast';
import Loader from './Loader';
import moment from 'moment'
import Parse from 'html-react-parser';
import Comments from './Comments';
import { REMOVE_MESSAGE } from '../store/types/PostTypes';

const Details = () => {

    const {id} = useParams();
    const {loading,details, comments, message} = useSelector(state => state.PostReducer)
    const {user} = useSelector(state => state.AuthReducer)
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')

    const addComment =(e) => {
        e.preventDefault();
        dispatch(postComment({
            id: details._id,
            userName: user.name,
            comment
        }))
        setComment('')
        dispatch(postDetails(id))
    }

    useEffect(() => {
        if(message){
         toast.success(message)
         dispatch({ type:REMOVE_MESSAGE })
        }
     }, [message])


    useEffect(() => {
        dispatch(postDetails(id))
    }, [id])

    

    return (
        <div className="container mt-100">
            <Helmet>
             (   <title> {`${details.title}`} | Blog </title>)
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
            <div className="row">
            {!loading ?
                <div className="col-8">
                    <div className="post__details">
                        <div className="post__header">
                            <div className="post__header__avatar">
                            {details.userName ? details.userName[0] : ''}
                            </div>
                            <div className="post__header__user">
                                <span>{details.userName}</span>
                                <span>{moment(details.updatedAt).format('MMM Do YYYY')}</span>
                            </div>
                        </div>
                        <div className="post__body">
                            <h1 className="post__body__title" style={{ marginBottom: '30px' }}>
                                <center>{details.title}</center>
                            </h1>
                            <div className="post__body__details" style={{ marginBottom: '30px' }}>
                                {details.body ? Parse(details.body): ''}
                            </div>
                            <div className="post__body__image">
                                <img src={`/images/${details.image}`} alt={details.title} />
                            </div>
                        </div>
                        {user ? <>
                                <div className="post__comment">
                                    <form onSubmit={addComment}>
                                        <div className="group">
                                            <label>Comment Title</label>
                                            <input type="text" value={comment} onChange={(e)=> setComment(e.target.value)}  className='group__control' placeholder='Write a comment' /> 
                                        </div>
                                        <div className="group">
                                            <input type="submit" value="Submit" className='btn btn-default btn-success' />
                                        </div>
                                    </form>
                                </div>
                                <Comments comments={comments}/>
                            </>
                        : ''}
                    </div>
                </div>
                
                : <Loader />}
            </div>
        </div>
    )
}

export default Details
