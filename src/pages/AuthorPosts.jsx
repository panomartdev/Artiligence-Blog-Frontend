import { useState } from "react"
import { Link } from "react-router-dom";
import PostAuthor from "../components/PostAuthor";
import { authorPost } from "../utils/data"

const AuthorPosts = () => {
  const [authorPosts, setAuthorPosts] = useState(authorPost);
  return (
    <section className='author-posts container'>
        {authorPosts.length > 0 ? (
           <div className='posts-content container'>
              {authorPosts.map((item,index)=>(
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
           <h2 className='not-found'>No Author posts Found</h2>)}
          
    </section>
  )
}

export default AuthorPosts
