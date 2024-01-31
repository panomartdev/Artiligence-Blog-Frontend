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

                      <div className='post-thumbnail'>
                          <img src={item.thumbnail} alt={item.title}/>
                      </div>

                      <div className='post-content'>
                          <Link className='post-content-title' to={`/posts/${item.id}`}>{item.title.length > 25 ? `${item.title.slice(0, 25)}...` : item.title}</Link>
                          <p className='post-content-description'>{item.desc.length > 50 ? `${item.desc.slice(0, 120)}...` : item.desc} </p>

                          <div className='post-footer'>
                          {/* <Link className='post-author' to={`posts/user/${item.authorId}`} >
                                <div className='post-author-avatar'>
                                    <img src={Avatar}/>
                                </div>
                                <div className='post-author-details'>
                                    <h5>By: Ernest Achiever</h5>
                                    <small>Just Now</small>
                                </div>
                          </Link> */}
                          <PostAuthor authorId={item.authorId} />
                          <Link className='post-category' to={`/posts/categories/${item.category}`} >
                                {item.category}
                          </Link>
                      </div>
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