import { useState, useEffect } from 'react';
import './style/Header.scss';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

const Header = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 200);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
   
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
        <ul className="nav-menu">
          <li>
            <Link to="/profile">Ernest Achiever</Link>
          </li>
          <li>
            <Link to="/create">Create Post</Link>
          </li>
          <li>
            <Link to="/authors">Authors</Link>
          </li>
          <li>
            <Link className="login-btn" to="/logout" >
              Log Out
            </Link>
          </li>
        </ul>

        {/* toggle button */}
        <button className="nav-toggle-btn">
          <AiOutlineClose />
        </button>
      </div>
    </nav>
  );
};

export default Header;
