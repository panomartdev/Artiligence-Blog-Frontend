import React, { useEffect, useState } from 'react'
import errorimg from '../assets/error.webp'
import { authorsList } from '../utils/data'
import './style/Author.scss'
import { Link } from 'react-router-dom'
import { STATUS } from '../utils/status'
import axios from 'axios'

const Authors = () => {
  document.title = 'Authors'
  
  const [loading, setLoading] = useState(STATUS.IDLE);
  const [authors, setAuthors] = useState([]);

  const getAuthors = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/`)
      const data = await response?.data;
      setAuthors(data);
      setLoading(STATUS.SUCCEEDED)
    } catch (error) {
      setLoading(STATUS.FAILED)
    }
  } 
  useEffect(()=>{
      getAuthors()
  },[])
  console.log(authors)

  return (
    <section className='authors-page container'>
        {loading == STATUS.LOADING ? (
            <div className='homepage-loader container'>
                <Loader/>
            </div>
        ): loading == STATUS.FAILED ? (
            <div className="not-found">
                <h2 className='not-found-text'>No users / Authors found.</h2>
                <img className='error-image' src={errorimg} alt="error-img"/>
            </div>
        ):(
            <div className='authors-container'>
                  {authors.map((item,index) => (
                    <Link className='author-lists' key={index} to={`/posts/user/${item._id}`}>
                          <div className='author-avatar'>
                              <img src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${item.avatar}`} alt="" />
                          </div>
                          <div className='author-information'>
                              <p className='author-name'>{item.name}</p>
                              <p className='author-post'>{item.posts} posts</p>
                          </div>
                    </Link>
                  ))}
            </div>
        )}
    </section>
  )
}

export default Authors