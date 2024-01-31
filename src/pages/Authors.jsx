import React, { useState } from 'react'
import errorimg from '../assets/error.webp'
import { authorsList } from '../utils/data'
import './style/Author.scss'
import { Link } from 'react-router-dom'

const Authors = () => {
  document.title = 'Authors'
  
  const [authors, setAuthors] = useState(authorsList);
  return (
    <section className='authors-page container'>
        {authors.length > 0 ? 
            <div className='authors-container'>
                {authors.map((item,index) => (
                   <Link className='author-lists' key={index} to={`/posts/user/${item.id}`}>
                        <div className='author-avatar'>
                             <img src={item.avatar} alt="" />
                        </div>
                        <div className='author-information'>
                             <p className='author-name'>{item.name}</p>
                             <p className='author-post'>{item.posts} posts</p>
                        </div>
                   </Link>
                ))}
            </div>
            : 
            <div className="not-found">
                <h2 className='not-found-text'>No users/ Authors found.</h2>
                <img className='error-image' src={errorimg} alt="error-img"/>
            </div>
        }
    </section>
  )
}

export default Authors