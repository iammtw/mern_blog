import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Helmet } from "react-helmet"
import { postDetails } from './../store/asyncMethods/PostMethod';
import Loader from './Loader';
import moment from 'moment'
import Parse from 'html-react-parser';

const Details = () => {

    const {id} = useParams();
    const {loading,details} = useSelector(state => state.PostReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(postDetails(id))
       
    }, [id])

    return (
        <div className="container mt-100">
            <Helmet>
             (   <title> {`${details.title}`} | Blog </title>)
                <meta name='description' content='Learn HTML,CSS, Javascript, React, Vue, Flutter etc'/>
            </Helmet>
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
                    </div>
                </div>
                
                : <Loader />}
            </div>
        </div>
    )
}

export default Details
