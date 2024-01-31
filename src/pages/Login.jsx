import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";
import './style/Forms.scss';

const Login = () => { 

  document.title = 'Welcome to Artiligence'

   const [userData,setUserData] = useState({
      email: '',
      password: '',
   })
   const inputHandler = (e) => {
      setUserData(prevState => {
         return { ...prevState, [e.target.name]: e.target.value}
      })
   }

  const [showError,setShowError] = useState(true);
  const [showPassword,setShowPassword] = useState(false);


  return (
    <section className='register'>
       <div className="form-container">

           <h2 className='title'>Login to Artiligence Blog</h2>

           {showError && 
               <div className='error-output'>
                     <p>Invalid Email or Password</p> 
                     <p>Login Failed</p>    
               </div>
           } 

           <form className='form-content' >
               
               <div className='input-form'>
                  <input type="email" placeholder='example@gmail.com' name='email' value={userData.email} onChange={inputHandler}/> 
               </div>
               <div className='password-form'>
                  <input className="password-input" type={showPassword ? "text":"password"} placeholder='Password' name='password' value={userData.password} onChange={inputHandler}/>
                  <div className='btn-showpassword' onClick={()=> setShowPassword(!showPassword)}>{showPassword ? <AiOutlineEyeInvisible/>:<AiOutlineEye/>}</div> 
               </div>
        
               <div className='bottom'>
                  <button className='submit-btn'>Login</button>
               </div>
               
               <small>Don't have an account?  <Link className='login-link' to='/register'>Register Here</Link></small>
           </form>
       </div>
    </section>
  )
}

export default Login
