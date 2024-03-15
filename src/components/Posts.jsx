import { useState } from 'react'
import './style/Post.scss';
import errorimg from '../assets/error.webp'
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';


const Posts = ({postData}) => {
  const [posts, setPosts] = useState(postData);
  return (
    <section className='posts'>
        {posts.length > 0 ? (
           <div className='posts-content'>
              {posts.map((item,index)=>(
                  <article key={index} className='posts-container'>
                      
                      <div className='post-category'>
                            <Link className='post-category-link' to={`/posts/categories/${item.category}`} >
                                    {item.category.replace(/-/g, ' ')}
                            </Link>
                      </div>
                      <Link to={`/posts/${item._id}`}>
                            <div className='post-thumbnail'>
                                <img src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${item.thumbnail}`} alt={item.title}/>
                            </div>

                            <div className='post-content'>
                                <h2 className='post-content-title'>{item.title.length > 25 ? `${item.title.slice(0, 25)}...` : item.title}</h2>
                                <p dangerouslySetInnerHTML={{__html : item.description}} className='post-content-description'></p>
                            </div>
                      </Link>

                      <div className='post-footer'>
                            <PostAuthor authorId={item.creator} updatedAt={item.updatedAt} />
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