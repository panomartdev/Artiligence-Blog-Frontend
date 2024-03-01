import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2'
import './style/Forms.scss';
import { validateEmail } from '../utils/tools';
import Loader from '../components/Loader';
import { API_URL } from '../utils/urlApi';

const Register = () => {
  document.title = 'Register to Artiligence Blog'
  const [userData,setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confPassword: ''
  })
  const [showError,setShowError] = useState(false);
  const [mainError, setMainError] = useState('');
  
  const navigate = useNavigate();
 
  const inputHandler = (e) => {
      setUserData(prevState => {
         return { ...prevState, [e.target.name]: e.target.value}
      })
  }
  

  const registerUser = async (e) => {
      e.preventDefault();
      if(!userData.name || !userData.email || !userData.password || !userData.confPassword || userData.password != userData.confPassword || (userData.email && !validateEmail(userData.email))){
          setShowError(true);
      } else {
          setShowError(false);
          setMainError('');
          try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, userData)
            const newUser = await response.data;

            if(!newUser){
                setMainError("Couldn't register user. Please try again.")
            } else {
                Swal.fire({
                    title: "Register Completed",
                    text: "Welcome to Artiligence Blog",
                    icon: "success"
                }).then(() => {
                   navigate('/login') 
                });
            }
          } catch (err) {
                Swal.fire({
                    title: err.response.data.message,
                    text: "",
                    icon: "error"
                })
          }
      }
  }

  return (
    <section className='register'>
       <div className="form-container">

           <h2 className='title'>Register to Artiligence Blog</h2>

           {mainError && 
               <div className='error-output'>
                     <p>{mainError}</p>  
               </div>
           } 
            {/* {JSON.stringify(`${import.meta.env.VITE_TEST_ENV}`)}  */}
           <form className='form-content' onSubmit={registerUser}>
               <div className='input-form'>
                  <input className={`${!userData.name && showError ? "error-form":""}`} type="text" placeholder='Username' name='name' value={userData.name} onChange={inputHandler}/>
                  <p className='error-text'>{!userData.name && showError ? 'Please Enter Username':''}</p>
               </div>
               <div className='input-form'>
                  <input className={`${(!userData.email && showError) || ((userData.email && !validateEmail(userData.email)) && showError) ? "error-form":""}`} type="text" placeholder='example@gmail.com' name='email' value={userData.email} onChange={inputHandler}/> 
                  <p className='error-text'>{!userData.email && showError ? 'Please Enter Email': 
                                             (userData.email && !validateEmail(userData.email)) && showError ? "Invalid Email Format": ""}</p>
               </div>
               <div className='input-form'>
                  <input className={`${(!userData.password && showError) || (userData.password !== userData.confPassword && showError) ? "error-form" : ""}`} type="password" placeholder='Password' name='password' value={userData.password} onChange={inputHandler}/> 
                  <p className='error-text'>{!userData.password && showError ? 'Please Enter Password': 
                                              userData.password != userData.confPassword && showError ? "Password do not matched":""}</p>
               </div>
               <div className='input-form'>
                   <input className={`${(!userData.confPassword && showError) || (userData.password !== userData.confPassword && showError) ? "error-form":""}`} type="password" placeholder='Confirm Password' name='confPassword' value={userData.confPassword} onChange={inputHandler}/> 
                   <p className='error-text'>{!userData.confPassword && showError ? 'Please enter Confirm Password': 
                                               userData.password !== userData.confPassword && showError  ? 'Password not match' : ''}</p>
               </div>

               
               
               <button type='submit' className='submit-btn'>Register</button>
               <small>Already have an account? <Link className='login-link' to='/login'>Sign In</Link></small>
           </form>
           
       </div>
       {/* <div className='alert-box'>
            <p className='check-icon'><FaCheckCircle/></p>
            <p className='alert-text'>Register Completed</p>
       </div> */}
    </section>
  )
}

export default Register
