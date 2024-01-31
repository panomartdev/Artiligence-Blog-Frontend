import React, { useState } from 'react'
import './style/Dashboard.scss';
import errorimg from '../assets/error.webp'
import { mockupPost } from '../utils/data'
import { Link } from 'react-router-dom';

const Dashboard = () => {

  document.title = 'Dashboard'
  
  const [myPost, setMyPosts] = useState(mockupPost);
  return (
    <section className='dashboard'>
        {
          myPost.length > 0 ? 
            (
              <div className='dashboard-container container'>
                  <h2 className='all-posts-title'>All of your Posts</h2>
                  {myPost.map((item,index) => (
                      <article className='dashboard-post' key={index}>

                           <div className='dashboard-thumbnail'>
                                <img src={item.thumbnail}/>
                           </div>
                           <h5 className='dashboard-title'>{item.title}</h5>

                           <div className='dashboard-actions'>
                                <Link className='view-btn' to={`/posts/${item.id}`}>View</Link>
                                <Link className='edit-btn' to={`/posts/${item.id}/edit`}>Edit</Link>
                                <Link className='delete-btn' to={`/posts/${item.id}`}>Delete</Link>
                           </div>
                      </article>
                  ))}
              </div>
            ):(
              <div className="not-found">
                  <h2 className='not-found-text'>You haven't post anything in The Artiligence Blog</h2>
                  <img className='error-image' src={errorimg} alt="error-img"/>
              </div>
            ) 
        }
    </section>
  )
}

export default Dashboard
