import PostAuthor from '../components/PostAuthor'
import './style/PostDetail.scss'
import Thumbnail from '../assets/blog22.jpg'
import { AiOutlineSetting } from "react-icons/ai";
import Swal from 'sweetalert2';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import { STATUS } from '../utils/status';
import axios from 'axios';
import Loader from '../components/Loader';
import { UserContext } from '../context/userContext';

const PostDetail = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [singlePost, setSinglePost] = useState(null);
  const [loading, setLoading] = useState(STATUS.IDLE);
  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;

  const getSinglePost = async () => {
      setLoading(STATUS.LOADING);
      try {

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`);
        const data = await response?.data;
        setSinglePost(data);
        setLoading(STATUS.SUCCEEDED);

      } catch (error) {
        
        setLoading(STATUS.FAILED);
        Swal.fire({
          title: error.response.data.message,
          text: "",
          icon: "error"
        })
        
      }
  }
  const deleteSinglePost = async () =>{
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
          navigate('/') 
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

  const deletePostButton = () => {
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
          deleteSinglePost()
          setLoading(STATUS.SUCCEEDED)
      } else {
        setLoading(STATUS.IDLE);
      }
    });
  }

  useEffect(()=>{
      getSinglePost()
  },[])

  document.title = `${singlePost?.title}`


  return (
    <section className='post-details'>
      {loading == STATUS.LOADING ? (
            <div className='post-details-loading container'>
                <Loader/>
            </div>
          ):(
            singlePost && (
                <div className='post-details-content'>
                    <div className='post-details-header'>
                        <PostAuthor authorId={singlePost.creator} updatedAt={singlePost.updatedAt}/>

                        {
                           (currentUser?.id == singlePost.creator && token) && <div className='post-details-buttons'>
                                <Link className='edit-btn' to={`/posts/${singlePost._id}/edit`}>Edit</Link>
                                <button className='delete-btn' onClick={deletePostButton}>Delete</button>
                            </div>
                        }
                    </div>
                    
                    <h1 className='post-details-title'>
                        {singlePost.title}
                    </h1>
                    <div className='post-details-thumbnail'>
                        <img src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${singlePost.thumbnail}`} alt="" />
                    </div>
                    <p dangerouslySetInnerHTML={{__html : singlePost.description}} className='post-details-text'>
                   
                    </p>
                 
                </div>
            )
          )
      } 
    </section>
  )
}

export default PostDetail
