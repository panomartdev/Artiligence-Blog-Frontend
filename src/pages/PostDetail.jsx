import PostAuthor from '../components/PostAuthor'
import './style/PostDetail.scss'
import Thumbnail from '../assets/blog22.jpg'
import { Link, useParams } from 'react-router-dom'

const PostDetail = () => {
  const {id} = useParams()
  return (
    <section className='post-details'>
       <div className='post-details-content'>
           <div className='post-details-header'>
               <PostAuthor/>
               <div className='post-details-buttons'>
                  <Link className='edit-btn' to={`/posts/werwer/edit`}>Edit</Link>
                  <Link className='delete-btn' to={`/posts/werwer/edit`}>Delete</Link>
               </div>
           </div>
           
           <h1 className='post-details-title'>
               Lorem Title 
           </h1>
           <div className='post-details-thumbnail'>
               <img src={Thumbnail} alt="" />
           </div>
           <p className='post-details-text'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Modi expedita sapiente incidunt beatae dolor veniam recusandae 
                quia sequi, unde consequuntur ipsum, esse quos rem numquam.
                Repudiandae, officia! Labore, rem minus?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Totam itaque, aperiam tempore quia fugiat ab dolorum atque
                unde mollitia non, magni alias repudiandae, ipsa ullam.
                Perspiciatis dolores harum accusamus quidem provident ipsum
                sit hic corrupti quisquam? Omnis reprehenderit blanditiis
                eos perspiciatis unde quidem autem esse, sit accusantium
                voluptatum dolorum voluptatem. Labore cum maxime et
                quibusdam doloremque, excepturi voluptatem deleniti
                incidunt quod, molestias nisi qui id ad, eaque similique 
                necessitatibus aliquid soluta nulla? Eum adipisci ut inventore
                eaque delectus voluptatibus porro voluptate fugit 
                laudantium mollitia officia in asperiores ducimus distinctio,
                nisi eligendi consequatur consequuntur vel itaque repellat
                commodi! Doloribus quisquam inventore illum ipsa sint quibusdam
                optio nemo explicabo, commodi, reprehenderit, tempore iusto?
           </p>
           <p className='post-details-text'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Modi expedita sapiente incidunt beatae dolor veniam recusandae 
                quia sequi, unde consequuntur ipsum, esse quos rem numquam.
                Repudiandae, officia! Labore, rem minus?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Totam itaque, aperiam tempore quia fugiat ab dolorum atque
                unde mollitia non, magni alias repudiandae, ipsa ullam.
                Perspiciatis dolores harum accusamus quidem provident ipsum
                sit hic corrupti quisquam? Omnis reprehenderit blanditiis
                eos perspiciatis unde quidem autem esse, sit accusantium
                voluptatum dolorum voluptatem. Labore cum maxime et
                quibusdam doloremque, excepturi voluptatem deleniti
                incidunt quod, molestias nisi qui id ad, eaque similique 
                necessitatibus aliquid soluta nulla? Eum adipisci ut inventore
                eaque delectus voluptatibus porro voluptate fugit 
                laudantium mollitia officia in asperiores ducimus distinctio,
                nisi eligendi consequatur consequuntur vel itaque repellat
                commodi! Doloribus quisquam inventore illum ipsa sint quibusdam
                optio nemo explicabo, commodi, reprehenderit, tempore iusto?
           </p>
       </div>
    </section>
  )
}

export default PostDetail
