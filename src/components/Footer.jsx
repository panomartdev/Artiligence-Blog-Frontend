import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style/Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [blogCat,setBlogCat] = useState([
    {catName : 'uncategorized', text: "Uncategorized"},
    {catName : 'automation', text: "Automation"},
    {catName : 'business', text: "Business"},
    {catName : 'data-science', text: "Data Science"},
    {catName : 'blockchain', text: "Blockchain"},
    {catName : 'cyber-security', text: "Cyber Security"},
    {catName : 'financial', text: "Financial"},
    {catName : 'electric-vehicle', text: "Electric Vehicle"},
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
