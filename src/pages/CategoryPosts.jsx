import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from "react-router-dom";
import { STATUS } from '../utils/status';
import Loader from '../components/Loader';
import errorimg from '../assets/error.webp'
import { mockupPost } from '../utils/data';
import axios from 'axios';
import Posts from '../components/Posts';
import Swal from 'sweetalert2';

const CategoryPosts = () => {
  const {category} = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(STATUS.IDLE);
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [categoryError, setCategoryError] = useState('');

  const getPostByCategory = async () => {
        setLoading(STATUS.LOADING)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/categories/${category}`);
            const data = await response?.data
            setCategoryPosts(data)
            setLoading(STATUS.SUCCEEDED)
        } catch (error) {
            setCategoryError(error.response.data.message)
            setLoading(STATUS.FAILED)
            
        }
  }
  useEffect(()=>{
    getPostByCategory()
  },[category])
  console.log(categoryPosts)

  //  Browser Title
  const categoryTitle = category
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

  document.title = `${categoryTitle} Category`

  return (
    <section className='category-posts container'>
        {
            loading == STATUS.LOADING ? (
                <div className='homepage-loader container'>
                     <Loader/>
                </div>
            ) : loading == STATUS.FAILED ? (
                    <h2 className='not-found'>
                        <img className='error-image' src={errorimg} alt="error-img"/>
                        <p className='category-post-error'>{categoryError}</p>
                    </h2>
            ) : (
                <div>
                     <Posts postData={categoryPosts}/>
                </div>
            )
        }
    </section>
  )
}

export default CategoryPosts
