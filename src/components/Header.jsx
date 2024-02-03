import { useState, useEffect } from 'react';
import './style/Header.scss';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

const Header = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [navShow, setNavShow] = useState(false);

  

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
        <ul className={`nav-menu ${navShow ? "active" : "" }`}>
          <li>
            <Link to="/profile/Ernest" onClick={() => setNavShow(false)}>Ernest Achiever</Link>
          </li>
          <li>
            <Link to="/create" onClick={() => setNavShow(false)}>Create Post</Link>
          </li>
          <li>
            <Link to="/authors" onClick={() => setNavShow(false)}>Authors</Link>
          </li>
          <li className='login-btn'>
            <Link className="login-btn-link" to="/logout" onClick={() => setNavShow(false)}>
              Log Out
            </Link>
          </li>
          <li className='login-btn'>
            <Link className="login-btn-link" to="/register" onClick={() => setNavShow(false)}>
              Register
            </Link>
          </li>
        </ul>

        {/* toggle button */}
        <button className="nav-toggle-btn" onClick={() => setNavShow(!navShow)}>
          {navShow ? <AiOutlineClose/>: <FaBars/>}
        </button>
      </div>
    </nav>
  );
};

export default Header;
