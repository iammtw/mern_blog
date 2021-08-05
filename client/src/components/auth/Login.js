import BgImage from "../BgImage"
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from "react-helmet"
import { useState } from 'react';
import { PostLogin } from "../../store/asyncMethods/AuthMethod";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';



const Login = () => {

    const dispatch = useDispatch()

    const [state, setState] = useState({
        email : '',
        password: ''
    })

    const handleInputs = (e)=> {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const userLogin =(e) => {
        e.preventDefault()
        dispatch(PostLogin(state))
    }

    const {loading,loginErrors} = useSelector(state => state.AuthReducer)

    useEffect(() => {
       
        if(loginErrors.length > 0){
            loginErrors.map(error=> {
                return toast.error(error.msg)
            })
        }

    }, [loginErrors])


    return (
       <>
            <Helmet>
                <title> Login | Blog </title>
                <meta name='description' content='Learn HTML,CSS, Javascript, React, Vue, Flutter etc'/>
            </Helmet>
            <div className="row mt-80">
                <div className="col-8">
                    <BgImage />
                    <Toaster  
                        position="top-right"
                        reverseOrder={false}
                        toastOptions={{
                            style: {
                                fontSize: '14px'
                            },
                            }}
                    />
                </div>
                <div className="col-4">
                    <div className="account">
                        <div className="account__selection">
                            <form onSubmit={userLogin}>
                                <div className="group">
                                    <h3 className="form-heading">Login</h3>
                                </div>
                                    <div className="group">
                                    <input type="email" name='email' value={state.email} onChange={handleInputs} className='group__control' placeholder='Email' />
                                    </div>
                                    <div className="group">
                                    <input type="password" id='password' name='password' value={state.password} onChange={handleInputs} className='group__control' placeholder='Password' />
                                    
                                    </div>
                                    <div className="group">
                                    <input type="submit" className='btn btn-default btn-block' value={ loading ? '...' : 'Login' } />
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
       </>
    )
}

export default Login
