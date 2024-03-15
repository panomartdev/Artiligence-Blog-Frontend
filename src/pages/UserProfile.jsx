import React, { useState, useEffect, useContext } from 'react';
import './style/UserProfile.scss';
import {FaEdit, FaCheck} from 'react-icons/fa';
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import { STATUS } from '../utils/status';

const UserProfile = () => {
  
  document.title = 'Profile';

  const navigate = useNavigate()
  const [loading, setLoading] = useState(STATUS.IDLE);
  const {currentUser} = useContext(UserContext)
  const userId = currentUser?.id;
  const token = currentUser?.token;

  useEffect(()=>{
      if(!token){
        navigate('/login')
      }
  },[token])

  const [avatar, setAvatar] = useState('');
  const [isAvatarTouched, setIsAvatarTouched] = useState(false);
  const changeAvatar = async () =>{
      setIsAvatarTouched(false);
      try {
        const postData = new FormData;
        postData.set('avatar', avatar);
        
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/change-avatar`, postData, 
                               {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
        setAvatar(response?.data.avatar)                       
      } catch (error) {
        Swal.fire({
          title: error.response.data.message,
          text: "",
          icon: "error"
        })
      }
  }

  const getUserProfile = async () => {
      try {
        setLoading(STATUS.LOADING)
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${userId}`,
                               {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
        const {name, email, avatar} = response.data;
        setProfileData({...profileData, name, email})  
        setAvatar(avatar)                    
      } catch (error) {
        setLoading(STATUS.FAILED)
      }
  }
  useEffect(()=>{
      getUserProfile()
  },[])

  const [profileData,setProfileData] = useState({
    name:'',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })
  const inputHandler = (e) => {
    setProfileData(prevState => {
       return { ...prevState, [e.target.name]: e.target.value}
    })
  }
  /* Showing Password */
  const [showPassword,setShowPassword] = useState(false);
  const [showNewPassword,setShowNewPassword] = useState(false);
  const [showConfPassword,setShowConfPassword] = useState(false);
  
  /* Updating Profiles */
  const updateProfileData = async (e) => {
      e.preventDefault()
      const userData = new FormData();
      userData.set('name', profileData.name);
      userData.set('email', profileData.email);
      userData.set('currentPassword', profileData.currentPassword);
      userData.set('newPassword', profileData.newPassword);
      userData.set('confirmNewPassword', profileData.confirmNewPassword);

      try {
        const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/users/edit-user`, userData, 
                             {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
        if(response.status == 200){
          Swal.fire({
            title: 'Your profile has been updated',
            text: "",
            icon: "success"
          })
        } 
      } catch (error) {
        Swal.fire({
          title: error.response.data.message,
          text: "",
          icon: "error"
        })
      }
      

  }

  return (
    <section className='profile'>
        <div className='profile-container container'>
             <Link className='mypost-btn' to={`/dashboard`}>My Posts</Link>

             <div className='profile-details'>

                  {/*Avatar Image Zone*/}
                  <div className='avatar-content'>
                      <div className='avatar-image'>
                           <img src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${avatar}`} alt="Avatar" />
                      </div>
                      <form className='avatar-button'>
                          <input type='file' 
                                 name='avatar' 
                                 id='avatar' 
                                 onChange={(e) => setAvatar(e.target.files[0])}
                                 accept='png, jpg, jpeg'/>
                          <label className='avatar-upload-btn' htmlFor='avatar' onClick={() => setIsAvatarTouched(true)}><FaEdit/></label>
                      </form>
                      {isAvatarTouched && 
                          <button className='avatar-upload-btn check-btn' onClick={changeAvatar}><FaCheck/></button>
                      }
                  </div>

                  {/* Informations and input forms */}
                  <h1 className='profile-name'>{currentUser.name}</h1>

                  <form className='profile-informations-form' onSubmit={updateProfileData}>
                      <div className='input-form'>
                            <input type="text" name='name' placeholder='Fullname' value={profileData.name} onChange={inputHandler}/>
                      </div>
                      <div className='input-form'>
                            <input type="email" name='email' placeholder='Email' value={profileData.email} onChange={inputHandler}/>
                      </div>
                      <div className='password-form'>
                            <input className="password-input" name='currentPassword' type={showPassword ? "text":"password"} placeholder='Current Password' value={profileData.currentPassword} onChange={inputHandler}/>
                            <div className='btn-showpassword' onClick={()=> setShowPassword(!showPassword)}>{showPassword ? <AiOutlineEyeInvisible/>:<AiOutlineEye/>}</div> 
                      </div>
                      <div className='password-form'>
                            <input className="password-input" name='newPassword' type={showNewPassword ? "text":"password"} placeholder='New Password' value={profileData.newPassword} onChange={inputHandler}/>
                            <div className='btn-showpassword' onClick={()=> setShowNewPassword(!showNewPassword)}>{showNewPassword ? <AiOutlineEyeInvisible/>:<AiOutlineEye/>}</div> 
                      </div>
                      <div className='password-form'>
                            <input className="password-input" name='confirmNewPassword' type={showConfPassword ? "text":"password"} placeholder='Confirm New Password' value={profileData.confirmNewPassword} onChange={inputHandler}/>
                            <div className='btn-showpassword' onClick={()=> setShowConfPassword(!showConfPassword)}>{showConfPassword ? <AiOutlineEyeInvisible/>:<AiOutlineEye/>}</div> 
                      </div>
                      <button className='update-btn'>Update Profile</button>
                  </form>
                  
             </div>

        </div>
    </section>
  )
}

export default UserProfile
