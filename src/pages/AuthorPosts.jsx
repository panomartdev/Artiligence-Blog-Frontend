import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import PostAuthor from "../components/PostAuthor";
import Posts from "../components/Posts";
import { STATUS } from "../utils/status";
import axios from "axios";

const AuthorPosts = () => {
  
  const [authorPosts, setAuthorPosts] = useState("");
  const {id} = useParams()
  const [loading, setLoading] = useState(STATUS.IDLE);

  const getPostsByAuthor = async () =>{
      setLoading(STATUS.LOADING)
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/user/${id}`)
        const data = await response?.data
        
        setAuthorPosts(data);
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
      getPostsByAuthor()
  },[])

  document.title = `Artiligence`

  return (
    <section className='author-posts container'>
        {loading == STATUS.LOADING ? (
          <div className="post-loading container">
              <Loader/>
          </div>
          ):(
          <div className="container">
              <Posts postData={authorPosts}/>
          </div>
          )
        }
    </section>
  )
}

export default AuthorPosts
