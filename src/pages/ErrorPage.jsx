import { useEffect } from 'react';
import errorImg from '../assets/error.webp'
import { Link, useNavigate } from 'react-router-dom';
import './style/ErrorPage.scss';

const ErrorPage = () => {
    const navigate = useNavigate();
  // useEffect(() => {
  //   // Redirect to the homepage after 3 seconds
  //   const redirectTimeout = setTimeout(() => {
  //      navigate('/') 
  //   }, 3000);

  //   // Clear the timeout if the component is unmounted
  //   return () => clearTimeout(redirectTimeout);
  // }, []);

  return (
    <section className='error-page'>  
      <div className='error-page-content'>
        <img src={errorImg}/>
        <h2>Page Not Found </h2>
        <p>Redirecting back ...</p>
        <Link to='/' className='btn-primary'>Go Back Home</Link>
      </div>
    </section>
  );
};

export default ErrorPage;