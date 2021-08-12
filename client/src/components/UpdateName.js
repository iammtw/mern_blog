import React from 'react'
import { Helmet } from "react-helmet"
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const UpdateName = () => {
    const [userName, setUserName] = useState('')

    const {user : {name}} = useSelector(state => state.AuthReducer)

    useEffect(() => {
        setUserName(name)
    }, [])


    return (
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
                            <form onSubmit={()=>{}}>
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
        </div>
    )
}

export default UpdateName
