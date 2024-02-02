import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";
import PostAuthor from "../components/PostAuthor";
import { mockupPost } from '../utils/data';

const CategoryPosts = () => {
  const {category} = useParams();
  const [categoryPosts, setCategoryPosts] = useState(mockupPost);
  return (
    <section className='category-posts container'>
        <h1>{category}</h1>
        {categoryPosts.length > 0 ? (
           <div className='posts-content container'>
                {categoryPosts.map((item,index)=>(
                    <article key={index} className='posts-container'>
                        
                        <div className='post-category'>
                            <Link className='post-category-link' to={`/posts/categories/${item.category}`} >
                                    {item.category.replace(/-/g, ' ')}
                            </Link>
                        </div>
                        <div className='post-thumbnail'>
                            <img src={item.thumbnail} alt={item.title}/>
                        </div>

                        <div className='post-content'>
                            <div className='post-content-text'></div>  
                            <Link className='post-content-title' to={`/posts/${item.id}`}>{item.title.length > 25 ? `${item.title.slice(0, 25)}...` : item.title}</Link>
                            <p className='post-content-description'>{item.desc.length > 50 ? `${item.desc.slice(0, 100)}...` : item.desc} </p>
                        </div>

                        <div className='post-footer'>
                            <PostAuthor authorId={item.authorId} />
                        </div>

                        
                    </article>
                ))}
           </div>
           ):(
           <h2 className='not-found'>No Author posts Found</h2>)}
    </section>
  )
}

export default CategoryPosts
