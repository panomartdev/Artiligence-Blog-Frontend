import React, { useState, useContext, useEffect } from 'react'
import './style/Dashboard.scss';
import { STATUS } from '../utils/status';
import Loader from '../components/Loader';
import errorimg from '../assets/error.webp'
import { UserContext } from '../context/userContext';
import { mockupPost } from '../utils/data'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const Dashboard = () => {

  document.title = 'Dashboard'
  
  
  const navigate = useNavigate()

  const {currentUser} = useContext(UserContext)
  const userId = currentUser?.id;
  const token = currentUser?.token;

  useEffect(()=>{
      if(!token){
        navigate('/login')
      }
      // if(user !== writer){
      //   navigate('/')
      // }
  },[token])

  const [myPost, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(STATUS.IDLE);

  const getUserPosts = async (id) => {
      setLoading(STATUS.LOADING)
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/user/${id}`,
                         {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
        const data = response?.data;
        setMyPosts(data);
        setLoading(STATUS.SUCCEEDED)
      } catch (error) {
        setLoading(STATUS.FAILED);
      }
  }
  const deleteSinglePost = async (id) =>{
    try {
      setLoading(STATUS.LOADING)
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/delete-post/${id}`,
                            {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      setLoading(STATUS.SUCCEEDED)  
      Swal.fire({
        title: 'Deleted Sucessful',
        text: "",
        icon: "success"
      }).then(() => {
        window.location.reload();
      });

    } catch (error) {
      setLoading(STATUS.FAILED)
      Swal.fire({
        title: error.response.data.message,
        text: "",
        icon: "error"
      })
    }
  }
  const deletePostButton = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            deleteSinglePost(id)
        } else {
          setLoading(STATUS.IDLE);
        }
      });
  } 
  useEffect(()=>{
      getUserPosts(userId);
  },[userId])

  return (
    <section className='dashboard'>
        {
            loading == STATUS.LOADING ? (
                  <div className='homepage-loader container'>
                    <Loader/>
                   </div>
            ): myPost.length > 0 ? (

                  myPost && 
                  <div className='dashboard-container container'>
                      <h2 className='all-posts-title'>All of your Posts</h2>
                      {myPost.map((item,index) => (
                          <article className='dashboard-post' key={index}>
                                <div className='dashboard-thumbnail'>
                                        <img src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${item.thumbnail}`}/>
                                </div>


                                <div className='dashboard-content'>
                                    <h5 className='dashboard-title'>{item.title}</h5>
                                    <div className='dashboard-actions'>
                                        <Link className='view-btn' to={`/posts/${item._id}`}>View</Link>
                                        <Link className='edit-btn' to={`/posts/${item._id}/edit`}>Edit</Link>
                                        <button className='delete-btn' onClick={()=> deletePostButton(item._id)}>Delete</button>
                                    </div>
                                </div>
                          </article>
                      ))}
                  </div>
            ):(
                  <div className="not-found">
                      <h2 className='not-found-text'>You haven't post anything in The Artiligence Blog</h2>
                      <img className='error-image' src={errorimg} alt="error-img"/>
                  </div>
            ) 
        }
    </section>
  )
}

export default Dashboard
