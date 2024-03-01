import React, { useContext, useEffect, useRef, useState } from 'react';
import './style/CreatePost.scss';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';
import { STATUS } from '../utils/status';
import axios from 'axios';



const CreatePost = () => {

  document.title = 'Create a Blog'

  const [showError, setShowError] = useState(true);
  const [loading, setLoading] = useState(STATUS.IDLE);
  const navigate = useNavigate()

  /*Input Forms*/
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('uncategorized');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  /*Category List handler*/
  const categoryList = [
    {catName : 'uncategorized', text: "Uncategorized"},
    {catName : 'automation', text: "Automation"},
    {catName : 'business', text: "Business"},
    {catName : 'data-science', text: "Data Science"},
    {catName : 'blockchain', text: "Blockchain"},
    {catName : 'cyber-security', text: "Cyber Security"},
    {catName : 'financial', text: "Financial"},
    {catName : 'electric-vehicle', text: "Electric Vehicle"},
  ]
  const [categoryOpen, setCategoryOpen] = useState(false);
  const categoryRef = useRef()
  useEffect(()=>{
    let handler = (e) =>{
      if(!categoryRef.current.contains(e.target)){
        setCategoryOpen(false);
      }
    }
      document.addEventListener("mousedown", handler);
        return() =>{
      document.removeEventListener("mousedown", handler);
    }
  },[]);

  // React-Quill
  const modules = {
      toolbar: [
          [{'header': [1,2, 3, 4, 5, 6]},],
          [{size: []}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image', 'video'],
          ['clean']
      ]
  }
  const formats = ['header','size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'video']

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;
  useEffect(()=>{
      if(!token){
        navigate('/login')
      }
  },[token])

  //Main function to create post
  const createPost = async (e) => {
      e.preventDefault();
      const postData = new FormData();
      postData.set('title', title);
      postData.set('category', category);
      postData.set('description', description);
      postData.set('thumbnail', thumbnail);

      try {
        setLoading(STATUS.LOADING)
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/posts/create-post`, postData,
                         {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
        if(response.status == 201){

            setLoading(STATUS.SUCCEEDED)
            Swal.fire({
                title: 'Your post has been created',
                text: '',
                icon: 'success' 
            }).then(() => {
                navigate('/');
            })
            
        }
      } catch (error) {

        setLoading(STATUS.FAILED)
        Swal.fire({
            title: error.response.data.message,
            text: "",
            icon: "error"
        })

      }
  }

  return (
    <section className='create-edit-post'>
        <div className='create-edit-post-container container'>
             <form className='create-edit-post-form' onSubmit={createPost}>
                  <h2 className='create-edit-post-title'>Create Post</h2>
                  <input className='title-input' type='text' placeholder='Title' name='title' value={title} onChange={(e)=> setTitle(e.target.value)}/>
                  <div className='category-selection' ref={categoryRef}>
                      <div className='category-selected' onClick={() => setCategoryOpen(!categoryOpen)}>
                          {category.replace("-", " ")}
                          <div className={`arrow ${categoryOpen ? 'open':''}`}></div>
                      </div>
                      <div className='categories'>
                          <ul className={`category-name ${categoryOpen ? "open":''}`}>
                              {categoryList.map((item,index)=>(
                                <li className={`category-lists ${category == item.catName ? "select":""}`} key={index} onClick={() => {setCategory(item.catName), setCategoryOpen(false)}}>{item.catName.replace("-"," ")}</li>
                              ))}
                          </ul>
                      </div>  
                  </div>
                  <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} placeholder='Write content here ...'/>
                  <input className='thumbnail-input' type='file' onChange={(e) => setThumbnail(e.target.files[0])} accept='png, jpg, jpeg'/>
                  <button className='submit-btn' type='submit'>Create</button>
             </form>
        </div>
    </section>
  )
}

export default CreatePost
