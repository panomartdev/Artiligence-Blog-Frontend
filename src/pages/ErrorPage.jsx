import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style/ErrorPage.scss';

const ErrorPage = () => {
  // useEffect(() => {
  //   // Redirect to the homepage after 3 seconds
  //   const redirectTimeout = setTimeout(() => {
  //     window.location.href = '/';
  //   }, 3000);

  //   // Clear the timeout if the component is unmounted
  //   return () => clearTimeout(redirectTimeout);
  // }, []);

  return (
    <section className='error-page'>  
      <div className='error-page-content'>
        <h2>Page Not Found</h2>
        <p>Redirecting back ...</p>
        <Link to='/' className='btn-primary'>Go back Home</Link>
      </div>
    </section>
  );
};

export default ErrorPage;