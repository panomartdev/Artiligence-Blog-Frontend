import './style/Loader.scss';
import loader from '../assets/loader.svg';

const Loader = () => {
    return(
        <div className='loader'>
            <img src={loader} alt='loader'/>
        </div>
    )
}

export default Loader