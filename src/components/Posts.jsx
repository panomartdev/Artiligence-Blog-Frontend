import { useState } from 'react'
import './style/Post.scss';
import Thumbnails1 from '../assets/blog1.jpg';
import Thumbnails2 from '../assets/blog2.jpg';
import Thumbnails3 from '../assets/blog3.jpg';
import Avatar from '../assets/avatar1.jpg';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';

const DUMMY_POSTS = [
  {
    id: 1,
    thumbnail: Thumbnails1,
    category: 'education',
    title: 'Title of Blog',
    desc: 'Lorem ipsum, ',
    authorId: 3
  },
  {
    id: 2,
    thumbnail: Thumbnails2,
    category: 'science',
    title: 'Robot arm',
    desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis distinctio nesciunt quasi quis reiciendis ipsam eum ipsum consequuntur temporibus rem nemo, consequatur quidem incidunt officia unde, culpa aperiam labore. Nihil quasi iure consequuntur id est eius voluptatum minus provident asperiores officiis quas cumque ipsam maiores a consequatur qui accusantium voluptatibus, sunt, esse, at assumenda ab. Veniam sunt voluptates corporis, atque aperiam facere ad. Sit voluptatem nemo veniam neque vero! Eaque consequatur magnam ipsam rerum itaque autem architecto, similique suscipit. Molestiae repudiandae explicabo ut voluptatem iusto rem velit sit aut corporis, soluta, necessitatibus accusantium harum vero assumenda, quae eaque in voluptas illum hic placeat itaque repellendus dolores? Iure libero quos corporis dolor, quasi esse corrupti est cupiditate voluptatem, sint, expedita fugiat! Quod voluptas rerum nulla reprehenderit dolores sapiente, obcaecati repellendus eos nisi esse vel quos molestias ex magnam dolor explicabo laboriosam aliquid! Aspernatur quia quam, optio necessitatibus deserunt, quas distinctio ipsa odit reprehenderit vero officia similique aperiam eaque earum ipsum, natus illo inventore? Ducimus aliquid architecto aut aliquam quo tempore non possimus quas quae maxime modi, harum reprehenderit perferendis molestias nulla assumenda eaque accusantium explicabo aspernatur deserunt quibusdam! Itaque rem pariatur, delectus dicta, labore distinctio sunt aliquam facere dolorem doloribus ipsa molestiae, tempora dolores quo recusandae consectetur natus earum accusamus minus aut nulla? Laborum natus, assumenda totam ipsa veritatis molestiae aperiam, libero vero atque repellendus reiciendis architecto consequuntur est delectus obcaecati expedita accusantium. Dolore voluptas, natus adipisci nesciunt repudiandae quidem reprehenderit voluptates nihil numquam est quam veniam id iste maxime saepe eum a voluptate. Aut est consectetur ipsa ipsam, quo assumenda vero doloremque adipisci inventore libero odio eius officia iure praesentium perspiciatis omnis, veniam facere eaque, corporis voluptatum modi excepturi. Odio consequuntur facere repellat! Animi perspiciatis modi facilis eum perferendis sapiente praesentium quas minima voluptatibus, maiores exercitationem in fuga eos placeat?',
    authorId: 1
  },
  {
    id: 3,
    thumbnail: Thumbnails3,
    category: 'weather',
    title: 'Title of Blog Weather',
    desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis distinctio nesciunt quasi quis reiciendis ipsam eum ipsum consequuntur temporibus rem nemo, consequatur quidem incidunt officia unde, culpa aperiam labore. Nihil quasi iure consequuntur id est eius voluptatum minus provident asperiores officiis quas cumque ipsam maiores a consequatur qui accusantium voluptatibus, sunt, esse, at assumenda ab. Veniam sunt voluptates corporis, atque aperiam facere ad. Sit voluptatem nemo veniam neque vero! Eaque consequatur magnam ipsam rerum itaque autem architecto, similique suscipit. Molestiae repudiandae explicabo ut voluptatem iusto rem velit sit aut corporis, soluta, necessitatibus accusantium harum vero assumenda, quae eaque in voluptas illum hic placeat itaque repellendus dolores? Iure libero quos corporis dolor, quasi esse corrupti est cupiditate voluptatem, sint, expedita fugiat! Quod voluptas rerum nulla reprehenderit dolores sapiente, obcaecati repellendus eos nisi esse vel quos molestias ex magnam dolor explicabo laboriosam aliquid! Aspernatur quia quam, optio necessitatibus deserunt, quas distinctio ipsa odit reprehenderit vero officia similique aperiam eaque earum ipsum, natus illo inventore? Ducimus aliquid architecto aut aliquam quo tempore non possimus quas quae maxime modi, harum reprehenderit perferendis molestias nulla assumenda eaque accusantium explicabo aspernatur deserunt quibusdam! Itaque rem pariatur, delectus dicta, labore distinctio sunt aliquam facere dolorem doloribus ipsa molestiae, tempora dolores quo recusandae consectetur natus earum accusamus minus aut nulla? Laborum natus, assumenda totam ipsa veritatis molestiae aperiam, libero vero atque repellendus reiciendis architecto consequuntur est delectus obcaecati expedita accusantium. Dolore voluptas, natus adipisci nesciunt repudiandae quidem reprehenderit voluptates nihil numquam est quam veniam id iste maxime saepe eum a voluptate. Aut est consectetur ipsa ipsam, quo assumenda vero doloremque adipisci inventore libero odio eius officia iure praesentium perspiciatis omnis, veniam facere eaque, corporis voluptatum modi excepturi. Odio consequuntur facere repellat! Animi perspiciatis modi facilis eum perferendis sapiente praesentium quas minima voluptatibus, maiores exercitationem in fuga eos placeat?',
    authorId: 2
  },
  {
     id: 4,
     thumbnail: Thumbnails3,
     category: 'business',
     title: 'Business Development',
     desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis distinctio nesciunt quasi quis reiciendis ipsam eum ipsum consequuntur temporibus rem nemo, consequatur quidem incidunt officia unde, culpa aperiam labore. Nihil quasi iure consequuntur id est eius voluptatum minus provident asperiores officiis quas cumque ipsam maiores a consequatur qui accusantium voluptatibus, sunt, esse, at assumenda ab. Veniam sunt voluptates corporis, atque aperiam facere ad. Sit voluptatem nemo veniam neque vero! Eaque consequatur magnam ipsam rerum itaque autem architecto, similique suscipit. Molestiae repudiandae explicabo ut voluptatem iusto rem velit sit aut corporis, soluta, necessitatibus accusantium harum vero assumenda, quae eaque in voluptas illum hic placeat itaque repellendus dolores? Iure libero quos corporis dolor, quasi esse corrupti est cupiditate voluptatem, sint, expedita fugiat! Quod voluptas rerum nulla reprehenderit dolores sapiente, obcaecati repellendus eos nisi esse vel quos molestias ex magnam dolor explicabo laboriosam aliquid! Aspernatur quia quam, optio necessitatibus deserunt, quas distinctio ipsa odit reprehenderit vero officia similique aperiam eaque earum ipsum, natus illo inventore? Ducimus aliquid architecto aut aliquam quo tempore non possimus quas quae maxime modi, harum reprehenderit perferendis molestias nulla assumenda eaque accusantium explicabo aspernatur deserunt quibusdam! Itaque rem pariatur, delectus dicta, labore distinctio sunt aliquam facere dolorem doloribus ipsa molestiae, tempora dolores quo recusandae consectetur natus earum accusamus minus aut nulla? Laborum natus, assumenda totam ipsa veritatis molestiae aperiam, libero vero atque repellendus reiciendis architecto consequuntur est delectus obcaecati expedita accusantium. Dolore voluptas, natus adipisci nesciunt repudiandae quidem reprehenderit voluptates nihil numquam est quam veniam id iste maxime saepe eum a voluptate. Aut est consectetur ipsa ipsam, quo assumenda vero doloremque adipisci inventore libero odio eius officia iure praesentium perspiciatis omnis, veniam facere eaque, corporis voluptatum modi excepturi. Odio consequuntur facere repellat! Animi perspiciatis modi facilis eum perferendis sapiente praesentium quas minima voluptatibus, maiores exercitationem in fuga eos placeat?',
     authorId: 2
   },
]

const Posts = () => {
  const [posts, setPosts] = useState([]);
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
                          <Link className='post-category' to={`posts/categories/${item.category}`} >
                                {item.category}
                          </Link>
                      </div>
                      </div>

                      
                  </article>
              ))}
           </div>
           ):(
           <h2 className='not-found'>No posts Found</h2>)}
          
    </section>
  )
}

export default Posts