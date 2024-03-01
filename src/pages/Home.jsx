import './style/Home.scss';
import Posts from '../components/Posts';
import { mockupPost } from '../utils/data';
import { useState, useEffect } from 'react';
import { STATUS } from '../utils/status';
import axios from 'axios';
import Loader from '../components/Loader';

const Home = () => {
  document.title = 'Artiligence'

  const [homePosts, setHomePosts] = useState([]);
  const [loading, setLoading] = useState(STATUS.IDLE);

  const fetchPosts = async () => {
    setLoading(STATUS.LOADING)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/`)
      const data = await response?.data;
      setHomePosts(data)
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

  useEffect(() => {
    fetchPosts()
  },[])
  console.log(homePosts);

  return (
    <div className=''>
        {loading == STATUS.LOADING ? (
          <div className='homepage-loader container'>
            <Loader/>
          </div>
          ):(
            <div className='container'>
              {/* {JSON.stringify(homePosts)} */}
              <Posts postData={homePosts}/>
            </div>
          )
        } 
      
    </div>
  )
}

export default Home
