import './style/Home.scss';
import Posts from '../components/Posts';

const Home = () => {
  document.title = 'Artiligence Blog'
  return (
    <div className=''>
       <Posts/>
    </div>
  )
}

export default Home
