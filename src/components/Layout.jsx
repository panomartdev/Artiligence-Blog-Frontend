import {Outlet, useLocation} from 'react-router-dom';
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return !isAuthPage ? (
    <div>
         <Header/>
              <Outlet/> 
         <Footer/>
    </div>

  ):(
    <div>
        <Outlet/>
    </div>
  )
}

export default Layout
