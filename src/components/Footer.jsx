import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style/Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [blogCat,setBlogCat] = useState([
    {catName : 'agriculture', text: "Agriculture"},
    {catName : 'business', text: "Business"},
    {catName : 'education', text: "Education"},
    {catName : 'entertainment', text: "Entertainment"},
    {catName : 'art', text: "Art"},
    {catName : 'investment', text: "Investment"},
    {catName : 'uncategorized', text: "Uncategorized"},
    {catName : 'weather', text: "Weather"},
  ]);
  return (
    <footer>
        <ul className='footer-categories'>
            {
              blogCat.map((item,index)=>(
                <li key={index}>
                     <Link to={`posts/categories/${item.catName}`}>{item.text}</Link>
                </li>
              ))
            }
        </ul>
        <div className='footer-copyright'>
            <p className='copyright-text'>&copy; {currentYear} Artiligence, All Right Reserved</p>
        </div>
    </footer>
  )
}

export default Footer
