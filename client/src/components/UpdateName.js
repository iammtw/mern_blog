import React from 'react'
import { Helmet } from "react-helmet"
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateNameAction } from '../store/asyncMethods/ProfileMethod';
import { RESET_PROFILE_ERRORS } from '../store/types/ProfileTypes';
import Loader from './Loader';


const UpdateName = () => {
    const dispatch = useDispatch()
    const [userName, setUserName] = useState('')
    const {user : {name, _id}} = useSelector(state => state.AuthReducer)
    const {loading, redirect} = useSelector(state => state.PostReducer)
    const {updateErrors} = useSelector(state => state.UpdateName)
    const {push} = useHistory();

    const updateNameMethod =(e) => {
        e.preventDefault();
        dispatch(updateNameAction({name: userName, id:_id}))
    }

    useEffect(() => {
        setUserName(name)
    }, [])  

    useEffect(()=> {
        if(updateErrors.length > 0){
            updateErrors.map(error=>  toast.error(error.msg))
            dispatch({ type: RESET_PROFILE_ERRORS })
        }
    },[updateErrors])

    useEffect(()=>{
        if(redirect){
            push('/dashboard');
        }
    },[redirect])


    return ( !loading ?
        <div className="mt-100">
            <Helmet>
                <title> Edit User Name | Blog </title>
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
            <div className="container mt-100">
                <div className="row ml-minus-15 mr-minus-15">
                    <div className="col-3 p-15">
                        <Sidebar />
                    </div>
                    <div className="col-9 p-15">
                        <div className="card">
                            <h3 className='card__h3'> Update Name </h3>
                            <form onSubmit={updateNameMethod}>
                                <div className="group">
                                    <input type="text" 
                                    name='name'
                                    value={userName} 
                                    className='group__control' 
                                    placeholder='Name...'
                                    onChange={ (e) => setUserName(e.target.value)  } />
                                </div>
                                <div className="group">
                                    <input type="submit" value="Update Name" className='btn btn-block btn-default btn-success' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div> : <Loader />
    )
}

export default UpdateName
