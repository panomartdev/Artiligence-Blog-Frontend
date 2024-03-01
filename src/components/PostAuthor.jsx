import './style/PostAuthor.scss'
import { Link } from 'react-router-dom'
import Avatar1 from '../assets/avatar1.jpg';
import { STATUS } from '../utils/status';
import { authorsList } from '../utils/data';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import US from 'javascript-time-ago/locale/es-US.json'
import en from 'javascript-time-ago/locale/en.json';
import Loader from './Loader';
TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(US)


const PostAuthor = ({authorId, updatedAt}) => {
  
  const [author, setAuthor] = useState([])
  const [loading, setLoading] = useState(STATUS.IDLE);

  const getAuthor = async () => {
    setLoading(STATUS.LOADING)
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${authorId}`)
        const data = await response?.data;
        setAuthor(data);
        setLoading(STATUS.SUCCEEDED)
        
    } catch (error) {
        setLoading(STATUS.FAILED)
        Swal.fire({
          title: error.response.data.message,
          text: "",
          icon: "error"
       })
    }
  }
  useEffect(()=>{
     getAuthor()
  },[])

  return (
  
    ( author &&
      <Link className='post-author' to={`/posts/user/${authorId}`} >
          <div className='post-author-avatar'>
              <img src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${author?.avatar}`}/>
          </div>
          <div className='post-author-details'>
              <h5>{`By : ${author.name}`}</h5>
              <small><ReactTimeAgo date={new Date(updatedAt)} locale='en-US'/></small>
          </div>
      </Link>
    )
  )
}

export default PostAuthor
