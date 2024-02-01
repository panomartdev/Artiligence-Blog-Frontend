import React, { useState } from 'react';
import './style/CreatePost.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditPost = () => {
  const [showError,setShowError] = useState(true);

  /*Input Forms*/
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const categoryList = ['Agriculture','Business',
                        'Education','Entertainment','Art',
                        'Investment','Weather']

  const modules = {
      toolbar: [
          [{'header': [1, 2, 3, 4, 5, 6, false]}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
      ]
  }
  const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockqoute',]

  return (
    <section className='create-edit-post'>
        <div className='create-edit-post-container container'>
             <h2 className='create-edit-post-title'>Edit Post</h2>

             {showError && 
                <div className='error-output'>
                    <p>This is Error texts</p>
                </div>
             }

             <form className='create-edit-post-form'>
                  <input className='title-input' type='text' placeholder='Title' name='title' value={title} onChange={(e)=> setTitle(e.target.value)}/>
                  <select className='category-selection' name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                          <option className='category-option-uncate' key={'Uncategorized'}>Uncategorized</option>
                        {categoryList.map((item)=>(
                          <option className='category-option' key={item}>{item}</option>
                        ))}
                  </select>
                  <ReactQuill modules={modules} formats={formats} value={content} onChange={() => setContent()}/>
                  <input className='thumbnail-input' type='file' onChange={(e) => setThumbnail(e.target.files[0])} accept='png, jpg, jpeg'/>
                  <button className='submit-btn' type='button'>Update</button>
             </form>
        </div>
    </section>
  )
}

export default EditPost
