import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './style/Forms.scss';

const Register = () => {
  document.title = 'Register to Artiligence Blog'
  const [userData,setUserData] = useState({
    userName: '',
    email: '',
    password: '',
    confPassword: ''
  })
  const [showError,setShowError] = useState(false);
  const inputHandler = (e) => {
      setUserData(prevState => {
         return { ...prevState, [e.target.name]: e.target.value}
      })
  }

  return (
    <section className='register'>
       <div className="form-container">

           <h2 className='title'>Register to Artiligence Blog</h2>

           <form className='form-content' >
               <div className='input-form'>
                  <input type="text" placeholder='Username' name='userName' value={userData.userName} onChange={inputHandler}/>
                  <p className='error-text'>{!userData.userName && showError ? 'Please Enter Username':''}</p>
               </div>
               <div className='input-form'>
                  <input type="email" placeholder='example@gmail.com' name='email' value={userData.email} onChange={inputHandler}/> 
                  <p className='error-text'>{!userData.email && showError ? 'Please Enter Email':''}</p>
               </div>
               <div className='input-form'>
                  <input type="password" placeholder='Password' name='password' value={userData.password} onChange={inputHandler}/> 
                  <p className='error-text'>{!userData.password && showError ? 'Please Enter Password':''}</p>
               </div>
               <div className='input-form'>
                   <input type="password" placeholder='Confirm Password' name='confPassword' value={userData.confPassword} onChange={inputHandler}/> 
                   <p className='error-text'>{!userData.confPassword && showError ? 'Please enter Confirm Password': userData.password !== userData.confPassword && showError  ? 'Password not match' : ''}</p>
               </div>
               
               <button className='submit-btn'>Register</button>
               <small>Already have an account? <Link className='login-link' to='/login'>Sign In</Link></small>
           </form>
       </div>
    </section>
  )
}

export default Register
