import { useState } from 'react'
import './style/Post.scss';
import errorimg from '../assets/error.webp'
import Thumbnails1 from '../assets/blog1.jpg';
import Thumbnails2 from '../assets/blog2.jpg';
import Thumbnails3 from '../assets/blog3.jpg';
import Avatar from '../assets/avatar1.jpg';
import { Link } from 'react-router-dom';
import { mockupPost } from '../utils/data';
import PostAuthor from './PostAuthor';


const Posts = () => {
  const [posts, setPosts] = useState(mockupPost);
  return (
    <section className='posts container'>
        {posts.length > 0 ? (
           <div className='posts-content container'>
              {posts.map((item,index)=>(
                  <article key={index} className='posts-container'>
                      
                      <div className='post-category'>
                            <Link className='post-category-link' to={`/posts/categories/${item.category}`} >
                                    {item.category.replace(/-/g, ' ')}
                            </Link>
                      </div>
                      <Link to={`/posts/${item.id}`}>
                            <div className='post-thumbnail'>
                                <img src={item.thumbnail} alt={item.title}/>
                            </div>

                            <div className='post-content'>
                                <h2 className='post-content-title'>{item.title.length > 25 ? `${item.title.slice(0, 25)}...` : item.title}</h2>
                                <p className='post-content-description'>{item.desc.length > 50 ? `${item.desc.slice(0, 120)}...` : item.desc} </p>
                            </div>
                      </Link>

                      <div className='post-footer'>
                            <PostAuthor authorId={item.authorId} />
                      </div>

                      
                  </article>
              ))}
           </div>
           ):(
            <div className="not-found">
                <h2 className='not-found-text'>No posts found.</h2>
                <img className='error-image' src={errorimg} alt="error-img"/>
            </div>
           )
        }
    </section>
  )
}

export default Posts