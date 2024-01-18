import './style/PostAuthor.scss'
import { Link } from 'react-router-dom'
import Avatar from '../assets/avatar1.jpg';

const PostAuthor = ({authorId}) => {
  return (
    <Link className='post-author' to={`posts/user/${authorId}`} >
        <div className='post-author-avatar'>
            <img src={Avatar}/>
        </div>
        <div className='post-author-details'>
            <h5>By: Ernest Achiever</h5>
            <small>Just Now</small>
        </div>
    </Link>
  )
}

export default PostAuthor
