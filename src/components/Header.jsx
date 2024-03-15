import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/userContext';
import './style/Header.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

const Header = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [navShow, setNavShow] = useState(false);

  const {currentUser , setCurrentUser} = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
      setCurrentUser(null)
      navigate('/login')
  }
  
  useEffect(() => {
  
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
  
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 200);
      setPrevScrollPos(currentScrollPos);
      setNavShow(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, visible]);

  return (
    <nav className='nav-container'style={{ top: visible ? 0 : '-5em' }}>
      <div className="nav-container-content">
        <Link to="/" className="main-logo">
          Arti<span className="art-text">ligence</span>
        </Link>

        {/* Navigator links */}
        {currentUser?.id ?  
            (  // Login User
            <ul className={`nav-menu ${navShow ? "active" : "" }`}>
              <li><Link to="/profile" onClick={() => setNavShow(false)}>Profiles</Link></li>
              <li><Link to="/authors" onClick={() => setNavShow(false)}>Authors</Link></li>
              <li><Link to={`/dashboard`} onClick={() => setNavShow(false)}>Dashboard</Link></li>  
              <li><Link to="/create" onClick={() => setNavShow(false)}>Write</Link></li>  
              
              <li className='login-out-btn'>
                  <button className="logout-btn" to="/logout" onClick={() => {setNavShow(false); logout()}}>
                    Log Out
                  </button>
              </li>
            </ul>
            ):( // Not Login User
            <ul className={`nav-menu ${navShow ? "active" : "" }`}>
              <li><Link to="/authors" onClick={() => setNavShow(false)}>Authors</Link></li>
              <li className='login-out-btn'><Link className="login-btn-link" to="/login" onClick={() => setNavShow(false)}>Login</Link></li>
            </ul>)
        }

        {/* toggle button */}
        <button className="nav-toggle-btn" onClick={() => setNavShow(!navShow)}>
          {navShow ? <AiOutlineClose/>: <FaBars/>}
        </button>
      </div>
    </nav>
  );
};

export default Header;
