import React, { useState, useEffect, useContext } from 'react'
import { Link ,useNavigate } from 'react-router-dom';
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";
import { UserContext } from '../context/userContext';
import { validateEmail } from '../utils/tools';
import axios from 'axios'
import Swal from 'sweetalert2'
import './style/Forms.scss';


const Login = () => { 

  document.title = 'Welcome to Artiligence'

   const [showError,setShowError] = useState(false);
   const [mainLoginError, setMainLoginError] = useState('');
   const [showPassword,setShowPassword] = useState(false);
   const [userData,setUserData] = useState({
      email: '',
      password: '',
   })

   const navigate = useNavigate();
   const {setCurrentUser} = useContext(UserContext);
   
   const inputHandler = (e) => {
      setUserData(prevState => {
         return { ...prevState, [e.target.name]: e.target.value}
      })
   }

   const loginUser = async (e) => {
      e.preventDefault()
      if(!userData.email || !userData.password || !validateEmail(userData.email)){
         setShowError(true);
      } else {
         setShowError(false);
         setMainLoginError('');

         try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
            const user = await response.data;
            
            setCurrentUser(user)
            navigate('/')
         } catch (error) {
            Swal.fire({
               title: error.response.data.message,
               text: "",
               icon: "error"
            })
         }
      }
   }


  return (
    <section className='register'>
       <div className="form-container">

           <h2 className='title'>Login to Artiligence Blog</h2>

           {mainLoginError && 
               <div className='error-output'>
                     <p>Invalid Email or Password</p>    
               </div>
           } 

           <form className='form-content' onSubmit={loginUser}>
               
               <div className='input-form'>
                  <input className={`${(!userData.email && showError) || (userData.email && !validateEmail(userData.email)) ? "error-form":""}`} type="text" placeholder='example@gmail.com' name='email' value={userData.email} onChange={inputHandler}/>
                  <p className='error-text'>{!userData.email && showError ? 'Please Enter Email': userData.email && !validateEmail(userData.email) ? "Invalid Email Format":""}</p> 
               </div>
               <div className='input-form'>
                  <div className='password-form'>
                        <input className={`password-input ${!userData.password && showError ? "error-form":""}`} type={showPassword ? "text":"password"} placeholder='Password' name='password' value={userData.password} onChange={inputHandler}/>
                        <div className='btn-showpassword' onClick={()=> setShowPassword(!showPassword)}>{showPassword ? <AiOutlineEyeInvisible/>:<AiOutlineEye/>}</div> 
                  </div>
                  <p className='error-text'>{!userData.password && showError ? 'Please Enter Password':''}</p> 
               </div>
        
              
               <button type='submit' className='submit-btn'>Login</button>
      
               
               <small>Don't have an account?  <Link className='login-link' to='/register'>Register Here</Link></small>
           </form>
       </div>
    </section>
  )
}

export default Login
