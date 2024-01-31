import './style/PostAuthor.scss'
import { Link } from 'react-router-dom'
import { authorsList } from '../utils/data';

const PostAuthor = ({authorId}) => {
  
  const author = authorsList.find((author)=> author.id === authorId);

  return (
    <Link className='post-author' to={`/posts/user/${authorId}`} >
        <div className='post-author-avatar'>
            <img src={author.avatar}/>
        </div>
        <div className='post-author-details'>
            <h5>{`By : ${author.name}`}</h5>
            <small>{`Just now ID: ${authorId}`}</small>
        </div>
    </Link>
  )
}

export default PostAuthor
