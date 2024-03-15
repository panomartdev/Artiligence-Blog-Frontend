import React, { useState, useEffect, useRef, useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import './style/CreatePost.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';
import { STATUS } from '../utils/status';
import axios from 'axios';


const EditPost = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const {currentUser} = useContext(UserContext)
  const [writer, setWriter] = useState('');
  const token = currentUser?.token;
  const user = currentUser?.id;
  useEffect(()=>{    
      if(!token){
        navigate('/login')
      }
      
      //navigate to homepage , if user isn't the owner of this blog
      if(writer && user !== writer){
        navigate('/')
      }
  },[token, writer])


  const [loading, setLoading] = useState(STATUS.IDLE);


  /*Input Forms*/
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('uncategorized');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  /*Category List Handler*/
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

  /*React-Quill*/
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

  /*Get Post from ID */
  const getPostById = async (id) => {
      try {
        setLoading(STATUS.LOADING)
        
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`);
        const data = response?.data;

        setTitle(data.title);
        setCategory(data.category);
        setDescription(data.description);
        setWriter(data.creator);

        setLoading(STATUS.SUCCEEDED);

      } catch (error) {
        setLoading(STATUS.FAILED)
        Swal.fire({
          title: error.response.data.message,
          text: "",
          icon: "error"
        })
      }
  }
  useEffect(()=>{
      getPostById(id)
  },[])

  /*Update the Post */
  const updatePost = async (e) => {
      e.preventDefault();
      const postData = new FormData();
      postData.set('title', title);
      postData.set('category', category);
      postData.set('description', description);
      postData.set('thumbnail', thumbnail);
      
      try {
        setLoading(STATUS.LOADING)
        const updatePost = axios.patch(`${import.meta.env.VITE_BASE_URL}/posts/edit-post/${id}`, postData,
                           {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
       
        if(updatePost.status == 200){
            Swal.fire({
              title: 'status right',
              text: '',
              icon: 'success'
            })
        } else {
            Swal.fire({
              title: 'Update Successful',
              text: '',
              icon: 'success'
            }).then(()=>{
              setLoading(STATUS.SUCCEEDED)
              navigate(`/posts/${id}`)
            })
        }
            // Swal.fire({
            //   title: updatePost.status,
            //   text: '',
            //   icon: 'success' 
            // }).then(() => {
            //   navigate(`/posts/${id}`);
            // })
        
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
            {loading == STATUS.LOADING ? (
                <div className='homepage-loader container'>
                      <Loader/>
                </div>
                ):(
                  <form className='create-edit-post-form' onSubmit={updatePost}>
                      <h2 className='create-edit-post-title'>Edit Post</h2>
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
                        <button className='submit-btn' type='submit'>Update</button>
                  </form>
                )
            }
             
        </div>
    </section>
  )
}

export default EditPost
