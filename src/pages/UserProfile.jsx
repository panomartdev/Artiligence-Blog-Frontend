import React, { useState } from 'react';
import './style/UserProfile.scss';
import Avatar from '../assets/avatar5.jpg';
import {FaEdit, FaCheck} from 'react-icons/fa';
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from 'react-router-dom';

const UserProfile = () => {

  const [avatar, setAvatar] = useState('');
  const [profileData,setProfileData] = useState({
    name:'',
    email: '',
    password: '',
    newpassword: '',
    confpassword: ''
  })
  const inputHandler = (e) => {
    setProfileData(prevState => {
       return { ...prevState, [e.target.name]: e.target.value}
    })
  }
  const [showError, setShowError] = useState(true);
  
  /* Showing Password */
  const [showPassword,setShowPassword] = useState(false);
  const [showNewPassword,setShowNewPassword] = useState(false);
  const [showConfPassword,setShowConfPassword] = useState(false);

  return (
    <section className='profile'>
        <div className='profile-container container'>
             <Link className='mypost-btn' to={`/myposts/Ernest`}>My Posts</Link>

             <div className='profile-details'>

                  {/*Avatar Image Zone*/}
                  <div className='avatar-content'>
                      <div className='avatar-image'>
                           <img src={Avatar} alt="Avatar" />
                      </div>
                      <form className='avatar-button'>
                          <input type='file' 
                                 name='avatar' 
                                 id='avatar' 
                                 onChange={(e) => setAvatar(e.target.files[0])}
                                 accept='png, jpg, jpeg'/>
                          <label className='avatar-upload-btn' htmlFor='avatar'><FaEdit/></label>
                      </form>
                      <button className='avatar-upload-btn check-btn'><FaCheck/></button>
                  </div>

                  {/* Informations and input forms */}
                  <h1 className='profile-name'>Ernest Achiever</h1>

                  {showError &&
                      <div className='error-text'>
                          <p>Error Text Test</p>
                      </div>
                  }

                  <form className='profile-informations-form'>
                      <div className='input-form'>
                            <input type="text" name='name' placeholder='Fullname' value={profileData.name} onChange={inputHandler}/>
                      </div>
                      <div className='input-form'>
                            <input type="email" name='email' placeholder='Email' value={profileData.email} onChange={inputHandler}/>
                      </div>
                      <div className='password-form'>
                            <input className="password-input" name='password' type={showPassword ? "text":"password"} placeholder='Current Password' value={profileData.password} onChange={inputHandler}/>
                            <div className='btn-showpassword' onClick={()=> setShowPassword(!showPassword)}>{showPassword ? <AiOutlineEyeInvisible/>:<AiOutlineEye/>}</div> 
                      </div>
                      <div className='password-form'>
                            <input className="password-input" name='newpassword' type={showNewPassword ? "text":"password"} placeholder='New Password' value={profileData.newpassword} onChange={inputHandler}/>
                            <div className='btn-showpassword' onClick={()=> setShowNewPassword(!showNewPassword)}>{showNewPassword ? <AiOutlineEyeInvisible/>:<AiOutlineEye/>}</div> 
                      </div>
                      <div className='password-form'>
                            <input className="password-input" name='confpassword' type={showConfPassword ? "text":"password"} placeholder='Confirm New Password' value={profileData.confpassword} onChange={inputHandler}/>
                            <div className='btn-showpassword' onClick={()=> setShowConfPassword(!showConfPassword)}>{showConfPassword ? <AiOutlineEyeInvisible/>:<AiOutlineEye/>}</div> 
                      </div>
                  </form>
                  
             </div>

        </div>
    </section>
  )
}

export default UserProfile
