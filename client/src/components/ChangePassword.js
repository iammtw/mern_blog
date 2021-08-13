import React from 'react'
import { Helmet } from "react-helmet"
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Sidebar from './Sidebar';
import { updatePasswordAction } from '../store/asyncMethods/ProfileMethod';
import { RESET_PROFILE_ERRORS } from '../store/types/ProfileTypes';


const ChangePassword = () => {
    const {loading, redirect} = useSelector(state => state.PostReducer)
    const {updateErrors} = useSelector(state => state.UpdateName)
    const {user : {_id}} = useSelector(state => state.AuthReducer)
    const {push} = useHistory();

    const [state, setstate] = useState({
        current: '',
        newPassword: '',
        userId: null
    })

    const dispatch = useDispatch()

    const updatePassword =(e) => {
        e.preventDefault();
        dispatch(updatePasswordAction({
            current: state.current,
            newPassword: state.newPassword,
            userId: _id
        }))
    }

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


    return (
        <div className="container mt-100">
            <Helmet>
                <title> Change Password | Blog </title>
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
            
                <div className="row ml-minus-15 mr-minus-15">
                    <div className="col-3 p-15">
                        <Sidebar />
                    </div>
                    <div className="col-9 p-15">
                        <div className="card">
                            <h3 className='card__h3'> Change Password </h3>
                            <form onSubmit={updatePassword}>
                                <div className="group">
                                    <input type="password" name='' className='group__control' placeholder='Current Password' name={state.current} onChange={(e)=> setstate({ ...state, current: e.target.value }) } />
                                </div>
                                <div className="group">
                                    <input type="password" name='' className='group__control' placeholder='New Password' name={state.newPassword} onChange={(e)=> setstate({ ...state, newPassword: e.target.value }) } />
                                </div>
                                <div className="group">
                                    <input type="submit" value="Change" className='btn btn-block btn-default btn-success' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ChangePassword
