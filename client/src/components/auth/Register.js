import { useState, useEffect } from "react"
import toast, { Toaster } from 'react-hot-toast';
import BgImage from "../BgImage"
import { Helmet } from "react-helmet"
import { useDispatch, useSelector } from "react-redux"
import { PostRegister } from './../../store/asyncMethods/AuthMethod';

const Register = (props) => {

   const [state, setstate] = useState({
      name: '',
      email : '',
      password: ''
   })
   const dispatch = useDispatch()

   const handleInputs = e => {
      setstate({
         ...state, 
         [e.target.name]:e.target.value
      })
   }

   const {loading, registerErrors} = useSelector(state => state.AuthReducer)

   const userRegister =  async (e) => {
      e.preventDefault()
      dispatch(PostRegister(state))
   };

   useEffect(()=> {
      if(registerErrors.length > 0){
         registerErrors.map((error)=> {
          return toast.error(error.msg)
         })
      }
   },[registerErrors])

    return (
       <>
            <Helmet>
                <title> Register | Blog </title>
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
                       <form onSubmit={userRegister}>
                            <div className="group">
                               <h3 className="form-heading">Register</h3>
                            </div>
                            <div className="group">
                               <input type="text" name='name' value={state.name} onChange={handleInputs} className='group__control' placeholder='Enter Name' />
                            </div>
                            <div className="group">
                               <input type="email" name='email' value={state.email} onChange={handleInputs} className='group__control' placeholder='Enter Email' />
                            </div>
                            <div className="group">
                               <input type="password" name='password' value={state.password} onChange={handleInputs} className='group__control' placeholder='Create Password' />
                            </div>
                            <div className="group">
                               <input type="submit" className='btn btn-default btn-block' value={ loading ? '...' : 'Register' } />
                            </div>
                       </form>
                   </div>
               </div>
           </div>
       </div>
       </>
    )
}

export default Register
